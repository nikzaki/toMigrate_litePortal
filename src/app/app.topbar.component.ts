import {Component, forwardRef, Inject, ElementRef, ViewChild, ViewEncapsulation} from "@angular/core";
import {AppComponent} from "./app.component";
import {Router} from '@angular/router';
import {SessionService} from './redux/session/session.service';
import {Observable} from 'rxjs/Observable';
import {SystemMessageActions} from './redux/messages/system-message-actions';
import {SessionActions} from './redux/session/session-actions';
import {User} from './models/session/user';
import {Session} from './models/session/session';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppTopBar {
    loggedIn: Observable<boolean>;
    session: Observable<Session>;
    photo: Observable<string>;
    userid: string = '';
    password: string = '';

    @ViewChild('profileImage')
    profileImageDiv: ElementRef;

    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
        public router: Router,
        public messageActions: SystemMessageActions,
        public sessionActions: SessionActions,
        private sessionService: SessionService) {
        this.loggedIn = this.sessionService.isLoggedIn();
        this.session = this.sessionService.getSession();
        this.photo = this.sessionService.getPhoto();
    }
    ngAfterViewInit() {
        this.session
            .map(session=>session.photo)
            .filter(Boolean)
            .distinctUntilChanged()
            .subscribe((photo: string)=>{
                if(this.profileImageDiv){
                    this.profileImageDiv.nativeElement.style.background = "none";
                    // this.profileImageDiv.nativeElement.style.backgroundSize = '36px 36px';
                }
            });
    }
    goHome(){
        this.router.navigateByUrl("");
    }
    signIn() {
        //Validate the userid and password
        if(!this.userid || !this.password){
            if(!this.userid) this.messageActions
                                 .error("You have to enter a valid user id/email for signing in.");
            if(!this.password) this.messageActions
                .error("You have to enter non-empty password for signing in");
            return;
        }
        //Both user id and password are specified. Go ahead with signing in
        this.sessionActions.login({
            username: this.userid,
            password: this.password
        });
    }
    logout(event) {
        this.sessionActions.logout();
        if(event && event.preventDefault)
            event.preventDefault();
    }
}