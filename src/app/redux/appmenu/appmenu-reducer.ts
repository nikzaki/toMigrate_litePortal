import {AppMenu} from '../../models/session/appmenu';
import {Action} from '@ngrx/store';

import {List} from 'immutable';
import {AppMenuActions} from './appmenu-actions';

/**
 * Created by ashok on 29/04/17.
 */

export function appMenuReducer(state: AppMenu = {currentItems:[]}, action: Action): AppMenu {
    switch(action.type){
        case AppMenuActions.CLEAR_MENU_ITEMS:
            return {currentItems: []};
        case AppMenuActions.ADD_MENU:
            if(action.payload)
                return {
                    currentItems: [...state.currentItems, action.payload]
                };
            else return state;
        case AppMenuActions.ADD_MENU_AT_BEGINING:
            if(action.payload){
                let newMenuItems = List(state.currentItems).insert(0, action.payload).toJS();
                return {currentItems: newMenuItems};
            }
            else return state;

        case AppMenuActions.INSERT_MENU:
            if(action.payload){
                let newItems =  List(state.currentItems).insert(action.payload.index, action.payload.menu).toJS();
                return {currentItems: newItems};
            }
            else return state;

        default:
            return state;
    }
}