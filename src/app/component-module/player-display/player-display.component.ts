import {Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {Player} from '../../models/mygolf/player/player';
import {Action} from '../../models/action';

@Component({
    selector   : 'app-player-display',
    templateUrl: './player-display.component.html',
    styleUrls  : ['./player-display.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlayerDisplayComponent implements OnInit {
    @Input() player: Player;
    /**
     * How do we display a player. Possible options
     *
     * <ul>
     *     <li>single - Single line. Photo and player names only</li>
     *     <li>compact - Photo, player name, email, status
     *     <li>detail - Detailed display. Include handicap
     *     <li>full - Full player display. Normally not used in grids.
     * </ul>
     * @type {string}
     */
    @Input() displayMode: string = 'compact';
    @Input() playerActions: Action[] = [];

    @Output() onPlayerAction: EventEmitter<any>
    constructor() {
        this.onPlayerAction = new EventEmitter();
    }

    ngOnInit() {
    }

    onAction(event) {
        this.onPlayerAction.emit(event);
    }
}
