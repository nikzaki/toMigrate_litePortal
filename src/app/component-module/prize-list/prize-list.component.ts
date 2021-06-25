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
    prizeNodes: TreeNode[] = [];
    constructor() {
    }
    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.prizeList){
            this._groupPrizes();
        }
    }

    private _groupPrizes() {
        if(this.prizeList && this.prizeList.length){
            this.prizeNodes = Util.getTreeNodes(this.prizeList, this.groupBy);
        }
    }
}
