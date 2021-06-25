import {Session} from './session/session';
import {AppMenu} from './session/appmenu';
import {Customization} from './session/customization';
import {SystemMessages} from './system-messages';
import {UserNotifications} from './session/user-notifications';
/**
 * The Appication Status Object
 * Created by ashok on 27/04/17.
 */
export interface AppState {
    readonly session: Session;
    readonly appMenu: AppMenu;
    readonly customization: Customization;
    readonly systemMessages: SystemMessages;
    readonly userNotifications: UserNotifications;
}
export const AppSync = ['customization', 'session'];
