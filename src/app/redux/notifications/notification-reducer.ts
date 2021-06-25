
import {UserNotifications} from '../../models/session/user-notifications';
import {Action} from '@ngrx/store';
import {NotificationActions} from './notification-actions';

let InitUserNotifications: UserNotifications = {
    activeCompetitions: [],
    scoringNotifications: []
};

export function notificationReducer(state: UserNotifications = InitUserNotifications, action:Action) {
    switch(action.type) {
        case NotificationActions.ACTIVE_COMPETITIONS:
            return Object.assign({}, state, {
                activeCompetitions: action.payload
            });
        case NotificationActions.NEW_SCORING_NOTIFICATION:
            return Object.assign({}, state, {
                scoringNotifications: [...state.scoringNotifications, action.payload]
            });
        case NotificationActions.REMOVE_SCORING_NOTIFICATION:
            let remaining = state.scoringNotifications.filter(n=>n!==action.payload);
            return Object.assign({}, state, {
                scoringNotifications: remaining
            });
        default:
            return state;
    }
}