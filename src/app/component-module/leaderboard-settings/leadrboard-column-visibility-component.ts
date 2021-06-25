
import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit} from '@angular/core';
import {TableColumnDetails} from './column-visibility';
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: 'leaderboard-column-visibility',
    template: `
        <p-multiSelect [options]="columnOptions"
                (onChange)="selectionChanged()"
                [(ngModel)]="hiddenColumns"></p-multiSelect>
    `
})
export class LeadrboardColumnVisibilityComponent implements OnInit, OnChanges{
    @Input() columnDetails: TableColumnDetails[];
    @Output() columnsHidden: EventEmitter<TableColumnDetails[]> = new EventEmitter();
    hiddenColumns: TableColumnDetails[] = [];
    columnOptions: SelectItem[] = [];
    constructor(){

    }

    ngOnInit(): void {
        this.derive();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.columnDetails){
            this.derive();
        }
    }
    selectionChanged(){
        this.hiddenColumns.forEach(col=>col.hidden = true);
        this.columnDetails.forEach(col => {
            const hcol = this.hiddenColumns.filter(c=>c.id === col.id).pop();
            if(hcol) {
                col.hidden =true;
            } else {
                col.hidden = false;
            }
        });
        // this.columnsHidden.emit(this.columnDetails);
    }
    private derive() {
        if(this.columnDetails){
            this.columnOptions = this.columnDetails
                                     .map(det=>{
                return {
                    label: det.name,
                    value: det
                };
            });
            this.hiddenColumns = this.columnDetails.filter(det=>det.hidden);
        }
    }
}