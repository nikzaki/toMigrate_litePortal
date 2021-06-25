import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {SessionService} from '../redux/session/session.service';
/**
 * Created by ashok on 27/06/17.
 */
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.sessionService.getSession()
            .map(session=>session.userInfo)
            .map(userInfo=>{
                let activate = userInfo && ( userInfo.userType === 'Admin' || userInfo.userType === 'Club' || userInfo.userType === 'Britesoft');
                console.log("activate : ", userInfo)
                if(!activate){
                    //Navigate to Error page
                    // this.router.navigate(['/access-denied']);
                    this.router.navigate(['/login'], {
                        queryParams: {
                            returnUrl: state.url
                        }
                    })
                }
                return activate;
            });
    }

}