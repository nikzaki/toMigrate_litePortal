import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {ScoringNotification} from '../../models/session/user-notifications';

@Component({
    selector   : 'scoring-notifications',
    templateUrl: './scoring-notifications.component.html',
    styleUrls  : ['./scoring-notifications.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScoringNotificationsComponent implements OnInit {
    @Input() notifications: ScoringNotification[] = [];
    @Input() duration: number;
    constructor() {
    }

    ngOnInit() {
    }
    onClick(event) {

    }
}
