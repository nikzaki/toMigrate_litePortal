import {Component, OnInit, Input} from '@angular/core';
import {Notification} from '../../models/notification';

@Component({
    selector   : 'animated-notification',
    templateUrl: './animated-notification.component.html',
    styleUrls  : ['./animated-notification.component.scss']
})
export class AnimatedNotificationComponent implements OnInit {
    @Input() animation: string;
    @Input() duration: number;
    @Input() notifications: Notification[];

    constructor() {
    }

    ngOnInit() {
    }
}
