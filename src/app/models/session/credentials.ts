/**
 * The credential used for an authentication
 * Created by ashok on 03/05/17.
 */

export interface Credentials {
    username: string;
    password: string;
    returnUrl?: string;
}