import {Customization} from '../../models/session/customization';
import {Action} from '@ngrx/store';
import {CustomizationActions} from './customization-actions';
import {Map} from 'immutable';
/**
 * Created by ashok on 29/04/17.
 */

const DefaultCustomization = {
    currentTheme: 'green',
    textSize    : 'material',
    menuLayout  : 'static', // static, overlay, horizontal
    menuColor   : 'light', // light or dark
    profileType : 'inline'
}
export function customizationReducer(state: Customization = DefaultCustomization,
    action: Action): Customization {
    switch (action.type) {
        case CustomizationActions.RESET_DEFAULT:
            return DefaultCustomization;
        case CustomizationActions.SET_THEME:
            return Map(state).set('currentTheme', action.payload).toJS();
        case CustomizationActions.SET_TEXT_SIZE:
            return Map(state).set('textSize', action.payload).toJS();
        case CustomizationActions.SET_MENU_LAYOUT:
            return Map(state).set('menuLayout', action.payload).toJS();
        case CustomizationActions.SET_MENU_COLOR:
            return Map(state).set('menuColor', action.payload).toJS();
        case CustomizationActions.SET_PROFILE_TYPE:
            return Map(state).set('profileType', action.payload).toJS();
        default:
            return state;
    }
}