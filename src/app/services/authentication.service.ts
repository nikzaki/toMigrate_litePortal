import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Session} from '../models/session/session';
import {AuthenticationResult} from '../models/session/authentication-result';
import {RestUrl} from '../models/config/rest-api-url';
import {ConfigurationService} from './configuration.service';
import {SessionService} from '../redux/session/session.service';
/**
 * The service class for authenticating user against the mygolf server
 * Created by ashok on 28/04/17.
 */
@Injectable()
export class AuthenticationService {
    constructor(private http: Http,
        private configService: ConfigurationService,
        private sessionService: SessionService) {
    }

    /**
     * Authenticate the user and return the session info on success
     * @param username The user name (may be email)
     * @param password The password
     * @returns {Observable<R>}
     */
    authenticate(username: string, password: string): Observable<Session> {
        let creds   = "email=" + username + "&" + "password=" + password + "&username=" + username;
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let authUrl = this.configService.getUrl(RestUrl.authentication.loginUrl);
        console.log("Authentication URL = " + authUrl);
        return this.http.post(authUrl, creds, {
            headers: headers
        }).map((res: Response) => {
            let data: AuthenticationResult = res.json();
            let session: Session       = {
                status : 'active',
                authToken: data.authToken,
                userInfo : data.user
            };
            // this.sessionService.populateSessionHeaders();
            return session;
        });
    }

    auth(username: string, password: string): Observable<Session> {
        let creds   = "email=" + username + "&" + "password=" + password + "&username=" + username;
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let authUrl = this.configService.getUrl(RestUrl.authentication.auth); 
        console.log("Authentication URL = " + authUrl);
        return this.http.post(authUrl, creds, {
            headers: headers
        }).map((res: Response) => {
            let data: AuthenticationResult = res.json();
            let session: Session       = {
                status : 'active',
                authToken: data.authToken,
                userInfo : data.user
            };
            return session;
        });
    }

    public populateSessionHeaders(hdrs: any) {

        // let session = this.getCurrentSession();
        // if (isPresent(session)) {
        //     hdrs['X-AUTH-TOKEN'] = session.authToken;
        //     if (isPresent(session.playerId))
        //         hdrs['Player-Id'] = session.playerId;
        //     if (isPresent(session.clubId))
        //         hdrs['Club-Id'] = session.clubId;
        //     if (isPresent(session.organizerId))
        //         hdrs['Organizer-Id'] = session.organizerId;
        //     if (isPresent(session.userId))
        //         hdrs['User-Id'] = session.userId;
        // }
    }
}
