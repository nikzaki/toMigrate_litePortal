import {
    Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChanges, Output,
    EventEmitter, AfterViewInit, OnDestroy
} from '@angular/core';
import {Action} from '../../models/action';
import {ObservableMedia, MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs/Subscription';


@Component({
    selector     : 'action-panel',
    templateUrl  : './action-panel.component.html',
    styleUrls    : ['./action-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActionPanelComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @Input() data: any;
    @Input() actions:  Action [] = [];
    @Input() justifyContent: string = 'space-between';//
    @Input() itemLayout: string = 'horizontal'; //vertical & custom are others
    @Input() itemsAs: string = 'flat'; // flat, raised, fab, fab-mini
    @Input() styleClass: string;

    @Output() onActionClick: EventEmitter<any> = new EventEmitter();
    visibleActions: Action [] = [];
    smallScreen: boolean;
    private watcher: Subscription;
    constructor(media: ObservableMedia) {
        this.watcher = media.subscribe((change: MediaChange)=>{
            this.smallScreen = (change.mqAlias === 'xs');
        });
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if(changes.data){
        //     this._processActions();
        // }
        if(changes.actions) {
            this._processActions();
        }
    }

    ngOnDestroy(): void {
        if(this.watcher) this.watcher.unsubscribe();
    }

    ngAfterViewInit(): void {
        this._processActions();
    }

    actionClick($event, action: Action) {
        this.onActionClick.emit({
            actionId: action.actionId,
            action: action,
            data: this.data,
            event: $event
        });
        $event.preventDefault();
    }
    private _processActions() {

        this.visibleActions = this.actions.filter(action=>{
            if(!action.isDisplay)
                return true;
            else return action.isDisplay(this.data);
        });

        // this.visibleActions = visible.map((action)=>{
        //     if(action.deriveRouterLink){
        //         action['routerLink'] = action.deriveRouterLink(this.data);
        //     }
        //     return action;
        // })
    }
}
