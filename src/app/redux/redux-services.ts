import {SessionService} from './session/session.service';
import {AppMenuService} from './appmenu/appmenu-service';
import {CustomizationService} from './customizer/customization-service';
import {SystemMessageService} from './messages/system-message-service';
import {NotificationService} from './notifications/notification-service';
/**
 * Created by ashok on 02/05/17.
 */

export const ReduxServices = [
    SessionService, AppMenuService, CustomizationService, SystemMessageService,
    NotificationService
]