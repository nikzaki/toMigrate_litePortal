import {Injectable} from '@angular/core';
import {Http, Request, Response, RequestOptions, Headers} from '@angular/http';
import {RemoteRequest} from './remote-request';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import {SessionService} from '../redux/session/session.service';
import {Session} from '../models/session/session';
import {AuthenticationService} from './authentication.service';

/**
 * Created by ashok on 02/05/17.
 */
@Injectable()
export class HttpService {
    constructor(private http: Http,
        private authService: AuthenticationService,
        private sessionService: SessionService) {
    }

    public execute(request: RemoteRequest): Observable<Response> {
        return this.sessionService.getSession()
                   .first()
                   .mergeMap((session: Session) => {
                       let hdrs: any = {};
                       console.log("x auth token session", session)
                       if (session.authToken) hdrs['X-AUTH-TOKEN'] = session.authToken;
                       if (session.userInfo) {
                           if (session.userInfo.playerId) {
                               hdrs['Player-Id'] = session.userInfo.playerId;
                           }
                           if (session.userInfo.userId) {
                               hdrs['User-Id'] = session.userInfo.userId;
                           }
                           if (session.userInfo.organizerId) {
                               hdrs['Organizer-Id'] = session.userInfo.organizerId;
                           }
                           if (session.userInfo.clubId) {
                               hdrs['Club-Id'] = session.userInfo.clubId;
                           }
                       }
                       let req: Request = request.buildAjax(hdrs);
                       return this.http.request(req);
                   });
    }

    /**
     * Http Post method
     * @param {string} url The URL at which the post method is exceuted
     * @param data The data submitted. Can be FormData instance
     * @param {Headers} headers Option headers to send
     * @returns {Observable<Response>} Returns observable on response object
     */
    public post(url: string, data: any, headers?: Headers): Observable<Response> {
        return this.sessionService.getSession()
                   .first()
                   .switchMap((session: Session) => {
                       let hdrs = new Headers();
                       this.setSessionHeaders(session, hdrs);
                       // if(session.authToken) hdrs['X-AUTH-TOKEN'] = session.authToken;
                       // if(session.userInfo){
                       //     if(session.userInfo.playerId)
                       //         hdrs['Player-Id'] = session.userInfo.playerId;
                       //     if(session.userInfo.userId)
                       //         hdrs['User-Id'] = session.userInfo.userId;
                       //     if(session.userInfo.organizerId)
                       //         hdrs['Organizer-Id'] = session.userInfo.organizerId;
                       //     if(session.userInfo.clubId)
                       //         hdrs['Club-Id'] = session.userInfo.clubId;
                       // }
                       let options = new RequestOptions({headers: hdrs});
                       return this.http.post(url, data, options);
                   });
    }

    private setSessionHeaders(session: Session, hdrs: Headers) {
        if (session.authToken) hdrs.set('X-AUTH-TOKEN', session.authToken);
        if (session.userInfo) {
            if (session.userInfo.playerId) {
                hdrs.set('Player-Id', session.userInfo.playerId + "");
            }
            if (session.userInfo.userId) {
                hdrs.set('User-Id', session.userInfo.userId + "");
            }
            if (session.userInfo.organizerId) {
                hdrs.set('Organizer-Id', session.userInfo.organizerId + "");
            }
            if (session.userInfo.clubId) {
                hdrs.set('Club-Id', session.userInfo.clubId + "");
            }
        }
    }
}