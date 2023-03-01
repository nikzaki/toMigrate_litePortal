import { Competition } from './../../models/mygolf/competition/competition';
import {Injectable} from '@angular/core';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {AuthenticationService} from '../../services/authentication.service';
import {OrganizerService} from '../../services/organizer.service';
import {PlayerService} from '../../services/player.service';
import {Actions, Effect} from '@ngrx/effects';
import {SessionActions} from './session-actions';
import {Credentials} from '../../models/session/credentials';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {Session} from '../../models/session/session';
import {createAction} from '../create-action';
import {Util} from '../../util';
import {Observable} from 'rxjs/Observable';
import {Organizer} from '../../models/mygolf/organizer/organizer';
import {ClubService} from '../../services/club.service';
import {Club} from '../../models/mygolf/club/club';
import {Player} from '../../models/mygolf/player/player';
import {Router} from '@angular/router';
import {AppMenuActions} from '../appmenu/appmenu-actions';
import {AdminMenuItems} from '../../admin-module/admin.routes';
import {SystemMessageActions} from '../messages/system-message-actions';
/**
 * Created by ashok on 30/04/17.
 */
@Injectable()
export class SessionEffects {
    constructor(private actions$: Actions,
        private store: Store<AppState>,
        private router: Router,
        private authService: AuthenticationService,
        private messageActions: SystemMessageActions,
        private appMenuActions: AppMenuActions,
        private clubService: ClubService,
        private organizerService: OrganizerService,
        private playerService: PlayerService) {
    }

    @Effect()
    login$ = this.actions$.ofType(SessionActions.LOGIN)
        .map((action: Action) => <Credentials>action.payload)
        .switchMap((credentials: Credentials) => {
            let url = credentials.returnUrl;
            return this.authService.authenticate(credentials.username, credentials.password)
                .map((session: Session) => {
                    console.log("authenticate : ", session, url)
                    if(url) session.returnUrl = url;
                    return createAction(SessionActions.LOGIN_SUCESS, session);
                }).catch((error: any) => {
                    const msg = Util.getErrorMessage(error, 'Unknown error occured while signing in. Server may be down.');
                    this.messageActions.errorGrowl(msg, 'Sign In Failed');
                     return Observable.of(createAction(SessionActions.LOGIN_FAILED, msg));
                });
        });
    @Effect()
    loggedIn$ = this.actions$.ofType(SessionActions.LOGIN_SUCESS)
        .map((action: Action)=><Session>action.payload)
        .map((session: Session)=>{
            switch(session.userInfo.userType){
                case 'Player':
                    //TODO Check whether the player is logged in
                    return createAction(SessionActions.PLAYER_LOGGED_IN, session);
                case 'Club':
                    return createAction(SessionActions.CLUB_LOGGED_IN, session);
                case 'Organizer':
                    return createAction(SessionActions.ORGANIZER_LOGGED_IN, session);
                case 'Admin':
                    return createAction(SessionActions.ADMIN_LOGGED_IN, session);
                case 'Britesoft':
                    return createAction(SessionActions.ADMIN_LOGGED_IN, session);
                default:
                    return createAction(SessionActions.UNKNOWN_TYPE_LOGGED_IN, session);
            }
        });

    @Effect({dispatch: false})
    adminLoggedIn$ = this.actions$.ofType(SessionActions.ADMIN_LOGGED_IN)
        .do((action: Action)=> {
            let url = (<Credentials>action.payload).returnUrl;
            this.store.dispatch(createAction(SessionActions.ADMIN_INFO_POPULATE, {}));
            //Now navigate to Admin Hole
            if(url)
                this.router.navigate([url]);
            else
                this.router.navigate(["/admin"]);
        });

    @Effect({dispatch: false})
    organizerLoggedIn$ = this.actions$.ofType(SessionActions.ORGANIZER_LOGGED_IN)
        .map((action: Action)=><Session>action.payload)
        .do((session: Session)=> {

            return this.organizerService.getOrganizerInfo(session.userInfo.organizerId)
                       .take(1)
                .subscribe((organizer: Organizer)=> {
                    this.store.dispatch(createAction(SessionActions.ORGANIZER_INFO_POPULATE, organizer));
                    if(session.returnUrl)
                        this.router.navigate([session.returnUrl]);
                    else
                        this.router.navigate(['/dashboard']);
                });
        });
    @Effect({dispatch: false})
    clubLoggedIn$ = this.actions$.ofType(SessionActions.CLUB_LOGGED_IN)
        .map((action: Action)=> action.payload)
        .do((session: Session)=> {
            return this.clubService.getClubInfo(session.userInfo.clubId)
                       .take(1)
                        .subscribe((club: Club)=> {
                            console.debug("club logged in - session : ", session)
                            console.debug("club logged in - club : ", club)
                            let _isScorer;
                            if(session && session.userInfo && session.userInfo.roles)
                                _isScorer = session.userInfo.roles.indexOf('ROLE_SCORER') 
                            this.store.dispatch( createAction(SessionActions.CLUB_INFO_POPULATE, club));
                            if(session.returnUrl)
                                this.router.navigate([session.returnUrl]);
                            else if(_isScorer >= 0 && session.userInfo.organizerId) {
                                let _search = '';
                                this.organizerService.getActiveCompetitions(session.userInfo.organizerId)
                                        .subscribe((activeComps: Competition[]) => {
                                            if(activeComps) {
                                                if(activeComps.length === 1) {
                                                    this.router.navigate(['/admin/competition/manualscoring/'+activeComps[0].competitionId]);
                                                } else {
                                                    this.router.navigate(['/admin']);
                                                }
                                            } else this.router.navigate(['/admin']);
                                        });
                            }
                            else
                                this.router.navigate(['/dashboard']);
                        });
        });
    @Effect({dispatch: false})
    playerLoggedIn$ = this.actions$.ofType(SessionActions.PLAYER_LOGGED_IN)
        .map((action: Action)=>action.payload)
          .do((session: Session)=>{
            this.playerService.getPlayerInfo(session.userInfo.playerId)
                .take(1)
                .subscribe((player: Player)=>{
                    this.store.dispatch(createAction(SessionActions.PLAYER_INFO_POPULATE, player));
                    if(session.returnUrl)
                        this.router.navigate([session.returnUrl]);
                    else
                        this.router.navigate(['/dashboard']);
                });
          });


    @Effect({dispatch: false})
    loggedOut$ = this.actions$.ofType(SessionActions.LOGOUT)
        .do((action: Action)=>{
            this.appMenuActions.initialMenu();

           this.router.navigate(['/home'], {
               skipLocationChange: false,
               replaceUrl: true
           });
        });
}
