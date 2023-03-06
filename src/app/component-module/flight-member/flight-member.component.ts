import {Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter} from '@angular/core';
import { CompetitionFlightStatus } from 'app/models/mygolf/competition';
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
    @Input() flightStatus: Array<CompetitionFlightStatus>;
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

    getPlayerDetails(player,attribute: string) {
        if(!player) return;
        if(!this.flightStatus) return;
        let _scores;
        this.flightStatus.filter((fs:CompetitionFlightStatus)=>{
            return fs.playerId === player.playerId
        }).map((fs)=>{
            _scores = fs;
        })
        switch(attribute) {
            case 'gross':
                return _scores.grossScore;
            case 'net':
                return _scores.netScore;
            case 'thru':
                return _scores.holesPlayed;
        }

    }

}
