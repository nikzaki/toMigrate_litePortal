import {Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output} from '@angular/core';
import {Competition} from '../../models/mygolf/competition/competition';

import {Action} from '../../models/action';

@Component({
    selector   : 'competition-display',
    templateUrl: './competition-display.component.html',
    styleUrls  : ['./competition-display.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompetitionDisplayComponent implements OnInit {
    @Input() competition: Competition;
    @Input() showClubInfo: boolean;
    @Input() showStatus: boolean = true;
    @Input() singleLineDisplay: boolean = false;
    @Input() actions: Action[] = [];
    @Output() onCompetitionAction: EventEmitter<any> = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }
    onAction(event) {
        this.onCompetitionAction.emit(event);
    }
}
