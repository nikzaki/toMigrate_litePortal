import {Component, forwardRef, Inject, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
// import {AppComponent} from "../../../app.component";
import {MainComponent} from "../../main.component";
import {SessionActions, SessionService} from '../../../redux/session';
import {userInfo} from 'os';
import {Observable} from 'rxjs/Observable';

// import { TranslateService } from '@ngx-translate/core';
@Component({
    selector   : 'app-main-header',
    templateUrl: './header.component.html',
    styleUrls  : ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    userType: Observable<string>;
    loggedIn: Observable<boolean>;
    constructor(@Inject(forwardRef(() => MainComponent)) public app: MainComponent,
        public router: Router,
        private sessionService: SessionService,
        private sessionActions: SessionActions) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 1900 && this.isToggled()) {
                this.toggleSidebar();
            }
            this.userType = sessionService.getUser()
                .map(userInfo =>{
                    return userInfo.userType;
                });
            this.loggedIn =  sessionService.isLoggedIn();
        });
    }

    ngOnInit() {
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }
    logout() {
        this.sessionActions.logout();
        this.router.navigateByUrl('/');
    }
    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    // changeLang(language: string) {
    //     this.translate.use(language);
    // }
    shownCollapse() {
        console.log("COLLAPSE!!!!");
    }
}
