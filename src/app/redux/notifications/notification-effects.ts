import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {CompetitionService} from '../../services/competition.service';
import {SessionActions} from '../session/session-actions';
import {Action, Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {NotificationActions} from './notification-actions';
import {StompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {ScoringNotification} from '../../models/session/user-notifications';
import {ClubService} from '../../services/club.service';
import {Session} from '../../models/session/session';
import {OrganizerService} from '../../services/organizer.service';

@Injectable()
export class NotificationEffects {
    constructor(private actions$: Actions,
        private notfActions: NotificationActions,
        private store: Store<AppState>,
        private stompService: StompService,
        private clubService: ClubService,
        private organizerService: OrganizerService,
        private competitionService: CompetitionService) {
        this.stompService.subscribe("/topic/competition/scorenotifications", {
            ack: 'client'
        }).subscribe((msg: Message) => {
                msg.ack();
                let scoreNotf: ScoringNotification = JSON.parse(msg.body);
                // console.log(msg.body);
                this.notfActions.addScoringNotification(scoreNotf);
                setTimeout(()=>{
                    this.notfActions.removeScoringNotification(scoreNotf);
                }, 60000);
            });
    }

    @Effect({dispatch: false})
    adminLoggedIn$     = this.actions$.ofType(SessionActions.ADMIN_LOGGED_IN)
                             .do((action: Action) => {
                                 //Read the active competitions for the admin
                                 this.competitionService.getActiveCompetitions(null)
                                     .take(1)
                                     .subscribe(comps => {
                                         this.notfActions.setActiveCompetitions(comps);
                                     });
                             });
    @Effect({dispatch: false})
    clubLoggedIn$      = this.actions$.ofType(SessionActions.CLUB_LOGGED_IN)
                             .do((action: Action) => {
                                 let session: Session = action.payload;
                                 this.clubService.getActiveCompetitions(session.userInfo.clubId)
                                     .take(1)
                                     .subscribe(comps => {
                                         this.notfActions.setActiveCompetitions(comps);
                                     });
                             });
    @Effect({dispatch: false})
    organizerLoggedIn$ = this.actions$.ofType(SessionActions.ORGANIZER_LOGGED_IN)
                             .do((action: Action) => {
                                 let session: Session = action.payload;
                                 this.organizerService.getActiveCompetitions(session.userInfo.organizerId)
                                     .take(1)
                                     .subscribe(comps => {
                                         this.notfActions.setActiveCompetitions(comps);
                                     });
                             })
}