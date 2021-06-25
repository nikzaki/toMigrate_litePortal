import {
    Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output, OnChanges,
    SimpleChanges
} from '@angular/core';
import {Advertisement} from '../../models/mygolf/advertisement';
import {Action} from '../../models/action';

@Component({
    selector     : 'advertisement-list',
    templateUrl  : './advertisement-list.component.html',
    styleUrls    : ['./advertisement-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdvertisementListComponent implements OnInit, OnChanges {
    @Input() advertisements: Advertisement[] = [];
    @Input() totalAdvertisements: number     = 0;
    @Input() displayMode: string             = 'single';
    @Input() displayAsList: boolean = false;
    @Input() pageSize: number = 30;
    @Input() lazyLoad: boolean;
    @Input() showPaginator: boolean;
    @Input() paginatorPosition: string         = 'top';
    @Input() selectable: boolean;
    @Input() clickable: boolean;
    @Input() itemActions: Action [] = [];
    @Input() listHeader: string = '';
    @Input() actions: Action[] = [];
    @Input() emptyMessage: string = 'No advertisements';
    @Input() draggable: boolean;
    @Input() dragId: string;
    @Input() droppable: boolean;
    @Input() dropIds: string|string [];
    @Output() onPageRequest: EventEmitter<any> = new EventEmitter();
    @Output() onItemAction: EventEmitter<any> = new EventEmitter();
    @Output() onListAction: EventEmitter<any> = new EventEmitter();
    @Output() onDragItem: EventEmitter<any> = new EventEmitter();
    @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }
    onAdAction(event) {
        this.onItemAction.emit(event);
    }
    onAdListAction(event){
        this.onListAction.emit(event);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if(changes.advertisements){
            console.log("Ad list changed")
        }
    }

    onLazyLoadRequest(event) {
        console.debug('On lazy load ' + event.first + "," + event.rows);
        let pageNo = (event.first) / this.pageSize + 1;
        console.debug("The page requested =" + pageNo);
        this.onPageRequest.emit({
            page          : pageNo,
            firstRowOffset: event.first,
            pageSize      : event.rows,
            originalEvent : event
        });
    }
    onAdDragged(event){
        this.onDragItem.emit(event);
    }
    onAdDragEnd(event) {
        this.onDragEnd.emit(event);
    }
}
