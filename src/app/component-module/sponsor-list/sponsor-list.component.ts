import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {CompetitionSponsor} from '../../models/mygolf/competition/competition-sponsor';
@Component({
    selector   : 'sponsor-list',
    templateUrl: './sponsor-list.component.html',
    styleUrls  : ['./sponsor-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SponsorListComponent implements OnInit {
    @Input()
    sponsors: CompetitionSponsor[] = [];

    constructor() {
    }

    ngOnInit() {
    }
}
