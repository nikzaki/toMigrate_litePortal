import {Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import {FlightMember} from '../../models/mygolf/competition/flight-member';
@Component({
    selector   : 'flight-member',
    templateUrl: './flight-member.component.html',
    styleUrls  : ['./flight-member.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlightMemberComponent implements OnInit {
    @Input() flightMember: FlightMember;
    @Input() displayMode: string = 'medium';//Options are 'compact', 'medium', 'full'
    @Input() clickable: boolean;

    @Output() onClick: EventEmitter<FlightMember>;
    constructor() {
        this.onClick = new EventEmitter();
    }

    ngOnInit() {
    }

    onMemberClick() {
        if(this.clickable)
        this.onClick.emit(this.flightMember);
    }

}
