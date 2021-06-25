import {sessionReducer} from './session/session-reducer';
import {customizationReducer} from './customizer/customization-reducer';
import {appMenuReducer} from './appmenu/appmenu-reducer';
import {systemMessageReducer} from './messages/system-message-reducer';
import {notificationReducer} from './notifications/notification-reducer';
/**
 * Created by ashok on 29/04/17.
 */

export const rootReducer = {
    session: sessionReducer,
    customization: customizationReducer,
    appMenu: appMenuReducer,
    systemMessages: systemMessageReducer,
    userNotifications: notificationReducer
}

