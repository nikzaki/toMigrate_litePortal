import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Action} from '../../models/action';
import {isEmpty} from 'rxjs/operator/isEmpty';
@Component({
    selector   : 'action',
    templateUrl: './action.component.html',
    styleUrls  : ['./action.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActionComponent implements OnInit {
    @Input() action: Action;
    @Input() data: any;
    @Output() onAction: EventEmitter<any>;

    constructor() {
        this.onAction = new EventEmitter();
    }
    ngOnInit() {
    }

    onClick(event) {
        this.onAction.emit({
            actionId: this.action.actionId,
            data: this.data,
            event: event
        });
    }
    iconOnlyWithTooltip(): boolean {
        return !!this.action.actionLabel && !!this.action.icon && !!this.action.description
    }
}
