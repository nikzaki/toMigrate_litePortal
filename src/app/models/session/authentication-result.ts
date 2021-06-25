import {User} from './user';
/**
 * The result returned from the authentication
 * Created by ashok on 28/04/17.
 */
export class AuthenticationResult{
    success: boolean;

    user?: User;

    authToken?: string;

    exception?: string;
}
