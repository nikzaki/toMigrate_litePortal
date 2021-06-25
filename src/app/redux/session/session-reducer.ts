import {Session} from '../../models/session/session';
import {Action} from '@ngrx/store';
import {SessionActions} from './session-actions';
import {Map} from 'immutable';
/**
 * Created by ashok on 29/04/17.
 */
let initSession = {status: 'inactive'};
export function sessionReducer(state: Session = initSession, action: Action): Session {
    switch (action.type) {
        case SessionActions.LOGIN_PENDING:
            return <Session>Map(state)
                .merge({status: 'inprogress', error: ''})
                .toJS();
        case SessionActions.LOGIN_SUCESS:
            if (action.payload) {
                return Map(state)
                    .mergeDeep(action.payload)
                    .toJS();
            } else {
                return state;
            }
        case SessionActions.ADMIN_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: action.payload,
                displayName: 'Administrator',
                photo: 'assets/images/admin.png'
            });

        case SessionActions.PLAYER_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: action.payload,
                displayName: action.payload.playerName,
                photo: action.payload?action.payload.photoUrl:'assets/images/default_user.png'
            });
        case SessionActions.CLUB_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: action.payload,
                displayName: action.payload.clubName,
                photo: action.payload?action.payload.clubImage:'assets/images/default_club.png'
            });

        case SessionActions.ORGANIZER_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: action.payload,
                displayName: action.payload.name,
                photo: action.payload?action.payload.organizerImage:'assets/images/default_user.png'
            });
        case SessionActions.LOGIN_FAILED:
            return Map(state)
                .mergeDeep({status: 'failed',
                    error: action.payload})
                .toJS();

        case SessionActions.LOGOUT:
            return {status: 'inactive'};
        default:
            if(state)
            return state;
            else return {status: 'inactive'};
    }
}