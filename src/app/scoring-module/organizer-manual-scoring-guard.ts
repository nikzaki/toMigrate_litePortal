import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SessionService} from '../redux/session/session.service';
@Injectable()
export class OrganizerManualScoringGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.sessionService.getSession()
                   .map(session => session.userInfo)
                   .map(userInfo => {
                       // let activate = userInfo && (userInfo.userType === 'Admin' || (userInfo.userType === 'Organizer' && userInfo.admin)
                       //  ||(userInfo.userType === 'Club' && userInfo.admin)) ;
                       let activate = userInfo && (userInfo.userType === 'Admin' || (userInfo.organizerId && userInfo.admin)) ;
                       if (!activate) {
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