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
            if ((action as any).payload) {
                return Map(state)
                    .mergeDeep((action as any).payload)
                    .toJS();
            } else {
                return state;
            }
        case SessionActions.ADMIN_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: (action as any).payload,
                displayName: 'Administrator',
                photo: 'assets/images/admin.png'
            });

        case SessionActions.PLAYER_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: (action as any).payload,
                displayName: (action as any).payload.playerName,
                photo: (action as any).payload?(action as any).payload.photoUrl:'assets/images/default_user.png'
            });
        case SessionActions.CLUB_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: (action as any).payload,
                displayName: (action as any).payload.clubName,
                photo: (action as any).payload?(action as any).payload.clubImage:'assets/images/default_club.png'
            });

        case SessionActions.ORGANIZER_INFO_POPULATE:
            return Object.assign({}, state, {
                userData: (action as any).payload,
                displayName: (action as any).payload.name,
                photo: (action as any).payload?(action as any).payload.organizerImage:'assets/images/default_user.png'
            });
        case SessionActions.LOGIN_FAILED:
            return Map(state)
                .mergeDeep({status: 'failed',
                    error: (action as any).payload})
                .toJS();

        case SessionActions.LOGOUT:
            return {status: 'inactive'};
        default:
            if(state)
            return state;
            else return {status: 'inactive'};
    }
}