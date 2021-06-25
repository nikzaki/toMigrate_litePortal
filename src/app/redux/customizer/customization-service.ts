import {Injectable, Inject, forwardRef} from '@angular/core';
import {AppState} from '../../models/appstate';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {AppComponent} from '../../app.component';
/**
 * Created by ashok on 29/04/17.
 */

@Injectable()
export class CustomizationService {
    constructor(private store: Store<AppState>) {}

    getMenuLayout(): Observable<string> {
        return this.store.select(appState=>appState.customization.menuLayout)
            .filter(Boolean);
    }
    getMenuColor(): Observable<string> {
        return this.store.select(appState=>appState.customization.menuColor)
                   .filter(Boolean);
    }
    getTheme(): Observable<string> {
        return this.store.select(appState=>appState.customization.currentTheme)
                   .filter(Boolean);
    }
    getProfile(): Observable<string> {
        return this.store.select(appState=>appState.customization.profileType)
                   .filter(Boolean);
    }
    getTextSize(): Observable<string> {
        return this.store.select(appState=>appState.customization.textSize)
                   .filter(Boolean);
    }
}