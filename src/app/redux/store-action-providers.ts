import {AppMenuActions} from './appmenu/appmenu-actions';
import {SessionActions} from './session/session-actions';
import {CustomizationActions} from './customizer/customization-actions';
import {CustomizationService} from './customizer/customization-service';
import {SystemMessageActions} from './messages/system-message-actions';
import {NotificationActions} from './notifications/notification-actions';
/**
 * Created by ashok on 29/04/17.
 */

export const StoreActionProviders = [
    AppMenuActions,
    SessionActions,
    CustomizationActions,
    CustomizationService,
    SystemMessageActions,
    NotificationActions
];