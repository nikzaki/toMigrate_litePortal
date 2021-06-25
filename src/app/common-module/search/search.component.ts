import {Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
@Component({
    selector     : 'search',
    templateUrl  : './search.component.html',
    styleUrls    : ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
    @Input() prompt: string = 'Enter filter text here';
    @Input() showRefersh: boolean = true;
    @Input() debounceTime: number = 300;

    @Output() onRefreshClick: EventEmitter<string> = new EventEmitter();
    @Output() onFilterTextChange: EventEmitter<string> = new EventEmitter();

    filterTextChange: Subject<string> = new Subject();
    @Input() filterText: string = '';
    constructor() {

    }
    ngOnInit() {
        this.filterTextChange
            .debounceTime(this.debounceTime)
            .distinctUntilChanged()
            .subscribe(filterText=>{
                this.onFilterTextChange.emit(filterText);
            });
    }

    onTextChange(filter: string) {
        this.filterTextChange.next(filter);
    }
    onClick(event) {
        this.onRefreshClick.emit(this.filterText);
    }
}
