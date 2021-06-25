import {Component, OnInit} from '@angular/core';
import {SessionActions} from '../../redux/session/session-actions';
import {SystemMessageActions} from '../../redux/messages/system-message-actions';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    userid: string;
    password: string;
    returnUrl: string = '';
    constructor(private sessionActions: SessionActions,
        private router: Router,
        private route: ActivatedRoute,
        private messageActions: SystemMessageActions) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params=>{
            this.returnUrl = params['returnUrl']||'';
        })
    }

    signIn() {
        //Validate the userid and password
        if (!this.userid || !this.password) {
            if (!this.userid) {
                this.messageActions
                    .error("You have to enter a valid user id/email for signing in.");
            }
            if (!this.password) {
                this.messageActions
                    .error("You have to enter non-empty password for signing in");
            }
            return;
        }
        //Both user id and password are specified. Go ahead with signing in
        this.sessionActions.login({
            username: this.userid,
            password: this.password,
            returnUrl: this.returnUrl
        });
    }
}
