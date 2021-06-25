import {Organizer} from '../mygolf/organizer/organizer';
import {User} from './user';
import {Club} from '../mygolf/club/club';
import {Player} from '../mygolf/player/player';
import {Admin} from '../mygolf/admin';
/**
 * The information about the current session
 * Created by ashok on 28/04/17.
 */
export interface Session {
    readonly status: string; //Values are 'inactive', 'active', 'failed', 'inprogress'
    readonly error?: any;
    readonly authToken?: string;
    readonly userInfo?: User;
    readonly userData?: Organizer|Club|Player|Admin;
    displayName?: string;
    photo?: string;
    returnUrl?: string;
}
