import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Flight} from '../../models/mygolf/competition/competition-flight';
import {FlightMember} from '../../models/mygolf/competition/flight-member';

import * as moment from 'moment';
@Component({
    selector     : 'flight',
    templateUrl  : './flight.component.html',
    styleUrls    : ['./flight.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlightComponent implements OnInit {
    @Input() flight: Flight;
    @Input() memberDisplayMode: string = 'medium';
    @Input() compact: boolean = false;
    @Input() memberClickable: boolean;

    @Output() onMemberClick: EventEmitter<FlightMember>;
    constructor() {
        this.onMemberClick = new EventEmitter();
    }
    ngOnInit() {
    }

    memberClicked(member: FlightMember) {
        this.onMemberClick.emit(member);
    }

    parseTime(time: string)  {
        console.debug("parse time : ", time);
        console.debug("parse time [2] : ", this.flight);
        return moment(time,'HH:mm:ss').format('hh:mm A') 
    }
}
