import {Injectable} from '@angular/core';
import {AppState} from '../../models/appstate';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Session} from '../../models/session/session';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import {User} from '../../models/session/user';
/**
 * Created by ashok on 02/05/17.
 */
@Injectable()
export class SessionService {
    constructor(private store: Store<AppState>) {

    }

    /**
     * Returns the session object from the
     * @returns {Observable<R>}
     */
    public getSession(): Observable<Session> {
        return this.store
                   .select(appState => appState.session)
                   .filter(Boolean);
    }
    public getPhoto(): Observable<string> {
        return this.store.select(appState=>appState.session.photo)
            .filter(Boolean);
    }
    /**
     * Gets the session as Promise Object
     * @returns {Promise<T>}
     */
    public getSessionPromise(): Promise<Session> {
        return this.getSession().take(1).toPromise();
    }
    public getStatus (): Observable<string> {
        return this.store.select(appState=>appState.session.status);
    }

    public isLoggedIn(): Observable<boolean> {
        return this.store
                   .select(appState => {
                       if (appState.session && appState.session.status === 'active') {
                           return true;
                       } else {
                           return false;
                       }
                   });
    }
    public getUser(): Observable<User> {
        return this.store
            .select(appState=>{
                return appState.session.userInfo;
            }).filter(Boolean);
    }

    populateSessionHeaders(): Observable<any> {
        return this.getSession()
            .map((session: Session)=> {
                let hdrs: any = {};
                if (session.status === 'active') {
                    hdrs['X-AUTH-TOKEN'] = session.authToken
                }
                if (session.userInfo) {
                    if (session.userInfo.playerId) {
                        hdrs['Player-Id'] = session.userInfo.playerId;
                    }
                    if (session.userInfo.userId) {
                        hdrs['User-Id'] = session.userInfo.userId;
                    }
                    if (session.userInfo.clubId) {
                        hdrs['Club-Id'] = session.userInfo.clubId;
                    }
                    if (session.userInfo.organizerId) {
                        hdrs['Organizer-Id'] = session.userInfo.organizerId;
                    }
                }
                return hdrs;
            });


    }
}