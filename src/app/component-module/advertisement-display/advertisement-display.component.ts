import {
    Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnChanges,
    SimpleChanges
} from '@angular/core';

import * as moment from 'moment';
import {Advertisement} from '../../models/mygolf/advertisement';
import {Action} from '../../models/action';

@Component({
    selector     : 'advertisement-display',
    templateUrl  : './advertisement-display.component.html',
    styleUrls    : ['./advertisement-display.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdvertisementDisplayComponent implements OnInit, OnChanges {

    @Input() advertisement: Advertisement;
    @Input() displayMode: string = 'single'; // single, compact, detail
    @Input() clickable : boolean = false;
    @Input() actions: Action[] = [];

    @Input() selectable: boolean = false;
    @Input() draggable: boolean = false;
    @Input() dragId: string;
    @Output() onClick: EventEmitter<any>;
    @Output() onSelectionChange: EventEmitter<any>;
    @Output() onAction: EventEmitter<any>;
    @Output() onDrag: EventEmitter<any>;
    @Output() onDragEnd: EventEmitter<any>;
    selected: boolean = false;
    useInValues: string[] = [];
    constructor() {
        this.onClick = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onAction = new EventEmitter();
        this.onDrag = new EventEmitter();
        this.onDragEnd = new EventEmitter();
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.advertisement){
            this.deriveUseInChips();
        }
    }
    isExpired(): boolean {
        if(this.advertisement)
            return moment().startOf('day')
                       .isAfter(moment(this.advertisement.endDate));
        else return false;
    }
    onAdAction(event) {
        this.onAction.emit(event);
    }
    onAdClick($event) {
        if(this.clickable)
            this.onClick.emit({
                advertisement: this.advertisement,
                event: $event
            });
    }
    onAdSelectionChange(checked) {
        this.onSelectionChange.emit({
            advertisement: this.advertisement,
            selected: this.selected
        });
    }
    onDragStart(event) {
        if(this.draggable)
            this.onDrag.emit({
                advertisement: this.advertisement,
                event: event
            });
    }
    dragEnd($event) {
        if(this.draggable)
            this.onDragEnd.emit($event);
    }
    deriveUseLabel(txt: string){
        switch(txt) {
            case 'PG':
                return 'Portal';
            case 'PC':
                return 'Portal (Competition)';
            case 'AG':
                return 'APP';
            case 'AC':
                return 'APP (Competition)';
            default:
                return 'Unknown';
        }
    }
    deriveUseInChips() {
        this.useInValues = [];
        if(this.advertisement && this.advertisement.useIn)
            this.advertisement.useIn.forEach(v=>{
                this.useInValues.push(this.deriveUseLabel(v));
            });
    }
}
