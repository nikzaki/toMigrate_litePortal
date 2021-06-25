import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {createAction} from '../create-action';
import {create} from 'domain';
/**
 * Actions on Customization
 * Created by ashok on 29/04/17.
 */
@Injectable()
export class CustomizationActions {
    static RESET_DEFAULT    = "CUSTOMIZATIONS_DEFAULT";
    static SET_THEME        = "CUSTOMIZATIONS_SET_THEME";
    static SET_MENU_LAYOUT  = "CUSTOMIZATIONS_SET_MENU_LAYOUT";
    static SET_MENU_COLOR   = "CUSTOMIZATIONS_SET_MENU_COLOR";
    static SET_TEXT_SIZE    = "CUSTOMIZATIONS_SET_TEXT_SIZE";
    static SET_PROFILE_TYPE = "CUSTOMIZATIONS_SET_PROFILE_TYPE"

    constructor(private store: Store<AppState>) {
    }

    public reset() {
        this.store.dispatch(createAction(CustomizationActions.RESET_DEFAULT));
    }

    public setTheme(theme: string) {
        this.store.dispatch(createAction(CustomizationActions.SET_THEME, theme));
    }

    public setMenuLayout(layout: string) {
        this.store.dispatch(createAction(CustomizationActions.SET_MENU_LAYOUT, layout));
    }

    public setMenuColor(color: string) {
        this.store.dispatch(createAction(CustomizationActions.SET_MENU_COLOR, color));
    }
    public setTextSize(size: string) {
        this.store.dispatch(createAction(CustomizationActions.SET_TEXT_SIZE, size));
    }
    public setProfileType(type: string) {
        this.store.dispatch(createAction(CustomizationActions.SET_PROFILE_TYPE, type));
    }
}