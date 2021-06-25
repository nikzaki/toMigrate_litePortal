import {Component, OnInit, Input, EventEmitter, Output, ViewChild} from '@angular/core';
import {Competition} from '../../models/mygolf/competition/competition';
import {Actions} from '@ngrx/effects';
import {Action} from '../../models/action';
import {DataList} from 'primeng/primeng';
import { CompetitionService } from 'app/services/competition.service';
import {DataGridModule} from 'primeng/primeng';
@Component({
    selector   : 'competition-list',
    templateUrl: './competition-list.component.html',
    styleUrls  : ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {
    @Input() competitions: Competition [];
    @Input() totalCompetitions: number;
    @Input() emptyMessage: string = 'No competitions found.';
    @Input() initialPage: number = 1;
    @Input() pageSize: number;
    @Input() paginator: boolean;
    @Input() paginatorPosition: string;
    @Input() lazyLoad: boolean;
    @Input() singleLineDisplay: boolean;
    @Input() showCompetitionStatus: boolean = true;
    @Input() showClubInfo: boolean;
    @Input() actions: Action [] = [];
    // @Input() selectable: boolean = false;
    // @Input() multiSelect: boolean = false;

    @Output() onCompetitionAction: EventEmitter<any> = new EventEmitter();
    @Output() onPageRequest: EventEmitter<any> = new EventEmitter();

    @ViewChild('compList')
    compList: DataList;
    constructor(private compService: CompetitionService) {
    }

    ngOnInit() {
        console.log("this.competitions", this.competitions)
        // this.refreshCompetition();
    }
    ngAfterViewInit() {
        if(this.initialPage) {
            this.compList.first = ((this.initialPage-1) * this.pageSize);
        }
    }
    onLazyLoad(event) {
        let pageNo = (event.first)/this.pageSize + 1;
        console.debug("The page requested =" + pageNo);
        this.onPageRequest.emit({
            page: pageNo,
            firstRowOffset: event.first,
            pageSize: event.rows,
            originalEvent: event
        });
    }

    onAction(event){
        this.onCompetitionAction.emit(event);
    }

    refreshCompetition() {
        this.compService.searchAllCompetitions('', 1 , 20).subscribe((data: any) => {
            console.log('Refresh competition', data)
            this.compList = data.competitions;
        })
    }
}
