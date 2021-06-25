import {forwardRef, Injectable, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {AppComponent} from '../../app.component';
import {Actions} from '@ngrx/effects';
import {SessionActions} from '../session/session-actions';
/**
 * Created by ashok on 30/04/17.
 */

@Injectable()
export class CustomizationEffects {

    constructor(private store: Store<AppState>, private actions$: Actions) {
    }


}