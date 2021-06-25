import {Message} from 'primeng/primeng';
/**
 * Created by ashok on 09/06/17.
 */

export interface SystemMessages {
    readonly lastMessage?: Message;
    readonly messages?: Message[];
    readonly growlMessages?: Message[];
}