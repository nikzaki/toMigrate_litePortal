import { CompetitionService } from './../../services/competition.service';
import { PlayerService } from './../../services/player.service';
import { CompetitionDetails, Country } from './../../models/mygolf.data';
import { Competition } from './../../models/mygolf/competition/competition';
import {
    Component, OnInit, Input, OnChanges, SimpleChanges, KeyValueDiffers, DoCheck,
    ViewEncapsulation
} from '@angular/core';
import {CompetitionPrize} from '../../models/mygolf/competition/competition-prize';
import {TreeNode} from 'primeng/primeng';
import {Util} from '../../util';
@Component({
    selector   : 'prize-list',
    templateUrl: './prize-list.component.html',
    styleUrls  : ['./prize-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PrizeListComponent implements OnInit, OnChanges {
    @Input() prizeList: CompetitionPrize[];
    @Input() groupBy: string[]= ['categoryName', 'roundNumber', 'scoreType'];
    @Input() showHeader: boolean = true;
    @Input() header: string = 'Competition Prizes';
    @Input() nameColumnHeader: string = 'Category -> Round';
    @Input() competition: Competition;
    @Input() details: CompetitionDetails;
    prizeNodes: TreeNode[] = [];
    countryList: Array<Country> = [];
    constructor(
        private playerService: PlayerService,
        private compService: CompetitionService) {
    }
    ngOnInit() {
        this.refreshCountryList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.prizeList){
            this._groupPrizes();
        }
    }

    private _groupPrizes() {
        if(this.prizeList && this.prizeList.length){
            this.prizeNodes = Util.getTreeNodes(this.prizeList, this.groupBy);
            console.debug("prizes [node] : ", this.prizeNodes)
            console.debug("prizes [list] : ", this.prizeNodes)
            console.debug("prizes [group] : ", this.groupBy)
        }
    }

    
    refreshCountryList() {
        this.playerService.getCountryList()
            .subscribe((countryList: any) => {
                this.countryList = countryList;
                console.log('country list ', countryList)

            }, (error) => {
            })
    }

    getCurrency() {
        let _country: Country;
        if(!this.countryList) return;
        if(!this.competition.countryId) return;
        _country = this.countryList.find(country => country.id === this.competition.countryId);
        if(!_country) return;
        return _country.currencySymbol
    }
    
    public numberWithCommas(x: any) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getScoreTypeName(type?: string) {
        if(Number(type) > 0) {
            let _number = Number(type);
            return 'Round '+_number;
        }
        if(type === 'G') return 'Gross';
        else if(type === 'N') return 'Net';
        else if(type === 'X') return 'Novelty'
        else return type;
    }

}
