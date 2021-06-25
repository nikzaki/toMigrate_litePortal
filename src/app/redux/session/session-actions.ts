import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {createAction} from '../create-action';
import {AuthenticationService} from '../../services/authentication.service';
import {Session} from '../../models/session/session';
import {Credentials} from '../../models/session/credentials';
/**
 * The actions on Session object
 * Created by ashok on 28/04/17.
 */
@Injectable()
export class SessionActions {
    static LOGIN_PENDING           = 'LOGIN_PENDING';
    static LOGIN                   = 'LOGIN';
    static LOGIN_SUCESS            = 'LOGIN_SUCCESS';
    static ADMIN_LOGGED_IN         = 'ADMIN_LOGGED_IN';
    static ADMIN_INFO_POPULATE     = 'ADMIN_INFO_POPULATE';
    static PLAYER_LOGGED_IN        = 'PLAYER_LOGGED_IN';
    static PLAYER_INFO_POPULATE    = 'PLAYER_INFO_POPULATE';
    static CLUB_LOGGED_IN          = 'CLUB_LOGGED_IN';
    static CLUB_INFO_POPULATE      = 'CLUB_INFO_POPULATE';
    static ORGANIZER_LOGGED_IN     = 'ORGANIZER_LOGGED_IN';
    static ORGANIZER_INFO_POPULATE = 'ORGANIZER_INFO_POPULATE';
    static UNKNOWN_TYPE_LOGGED_IN  = 'UNKNOWN_TYPE_LOGGED_IN';
    static LOGIN_FAILED            = 'LOGIN_FAILED';
    static LOGOUT                  = 'LOGGED_OUT';

    constructor(private store: Store<AppState>, private authService: AuthenticationService) {
    }

    public login(credentials: Credentials) {
        this.store.dispatch(createAction(SessionActions.LOGIN, credentials));
    }

    public logout() {
        this.store.dispatch(createAction(SessionActions.LOGOUT));
    }
}
