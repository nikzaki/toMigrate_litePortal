import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {MenuItem} from 'primeng/primeng';
/**
 * Created by ashok on 29/04/17.
 */
@Injectable()
export class AppMenuService {
    constructor(private store: Store<AppState>) {
    }

    /**
     * Gets the current value of app menu
     * @returns {Observable<T>}
     */
    getCurrentValue(): Observable<MenuItem[]> {
        return this.store.select((appState)=>{
            return appState.appMenu.currentItems;
        });

    }
}