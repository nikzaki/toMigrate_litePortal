import {animate, Component, state, style, transition, trigger, ElementRef, ViewChild} from "@angular/core";
import {SessionActions} from './redux/session/session-actions';
import {SessionService} from './redux/session/session.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import {Session} from './models/session/session';

@Component({
    selector: 'inline-profile',
    template: `
        <div class = "profile" [ngClass] = "{'profile-expanded':active}">
            <a href = "#" (click) = "onClick($event)">
                <img [src]="(photo|async)" class = "profile-image" onerror="this.src = 'assets/images/default_user.png'"
                        style="height:60px; width: 60px">
                <span class = "profile-name">{{(session|async)?.displayName}}</span>
                <i class = "material-icons">keyboard_arrow_down</i>
            </a>
        </div>
        <ul class = "ultima-menu profile-menu" [@menu] = "active ? 'visible' : 'hidden'">
            <li role = "menuitem">
                <a href = "#" class = "ripplelink" [attr.tabindex] = "!active ? '-1' : null">
                    <i class = "material-icons">person</i>
                    <span>Profile</span>
                </a>
            </li>
            <li role = "menuitem">
                <a href = "#" class = "ripplelink" [attr.tabindex] = "!active ? '-1' : null">
                    <i class = "material-icons">security</i>
                    <span>Privacy</span>
                </a>
            </li>
            <li role = "menuitem">
                <a href = "#" class = "ripplelink" [attr.tabindex] = "!active ? '-1' : null">
                    <i class = "material-icons">settings_application</i>
                    <span>Settings</span>
                </a>
            </li>
            <li role = "menuitem">
                <a (click)="onLogout($event)" class = "ripplelink" [attr.tabindex] = "!active ? '-1' : null">
                    <i class = "material-icons">power_settings_new</i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class InlineProfileComponent {

    @ViewChild('profileImage')
    profileImageDiv: ElementRef;

    session: Observable<Session>;
    photo: Observable<string>;
    active: boolean;
    constructor(private sessionActions: SessionActions,
        private sessionService: SessionService){
        this.session = sessionService.getSession();
        this.photo = sessionService.getPhoto();


    }
    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
    ngAfterViewInit() {
        this.session
            .map(session=>session.photo)
            .filter(Boolean)
            .distinctUntilChanged()
            .subscribe((photo: string)=>{
                // this.profileImageDiv.nativeElement.style.background = 'none'
                    // "url('" + photo + "')  top left no-repeat";
                // this.profileImageDiv.nativeElement.style.backgroundSize = '60px 60px';
            });
    }
    onLogout(event) {
        this.sessionActions.logout();
        event.preventDefault();
    }
}