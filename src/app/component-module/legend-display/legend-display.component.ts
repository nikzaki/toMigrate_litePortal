import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {LegendItem} from './legend-item';

@Component({
    selector   : 'legend-display',
    templateUrl: './legend-display.component.html',
    styleUrls  : ['./legend-display.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LegendDisplayComponent implements OnInit {
    @Input() displayMode: string = 'horizontal';
    @Input() items: LegendItem[] = [];
    @Input() icon: string;
    constructor() {
    }

    ngOnInit() {
    }
    setClass(item: LegendItem) {
        let classes: any = {};
        if(item.styleClass){
            classes[item.styleClass] = true;
        }
        return classes;
    }
    setStyle(item: LegendItem){
        let styles:any = {};
        if(item.color) {
            if(item.icon || this.icon)
                styles['color'] = item.color;
            else
                styles['backgroundColor'] = item.color;
        }
        return styles;
    }
}
