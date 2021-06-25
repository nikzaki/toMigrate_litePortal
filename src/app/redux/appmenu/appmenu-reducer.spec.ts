import {appMenuReducer} from './appmenu-reducer';
import {MenuItem} from 'primeng/primeng';
import {AppMenuActions} from './appmenu-actions';
import {AppMenu} from '../../models/session/appmenu';
import {createAction} from '../create-action';
/**
 * Created by ashok on 04/05/17.
 */
const mockMenu: MenuItem    = {
    label: 'Test Menu', icon: 'brush', routerLink: '[/test]'
};
const anotherMenu: MenuItem = {
    label: 'Another Menu', icon: 'paint', routerLink: '[/another]'
};
let initialState: AppMenu = {currentItems: []};
describe('AppMenu Reducer', () => {
    it('Add Menu And Clear Menu', () => {
        let state: AppMenu = {currentItems: []};
        state              = appMenuReducer(state, {
            type: AppMenuActions.ADD_MENU, payload: mockMenu
        });
        expect(state).toEqual({
            currentItems: [mockMenu]
        });
        state = appMenuReducer(state, {type: AppMenuActions.ADD_MENU, payload: anotherMenu});
        expect(state).toEqual({
            currentItems: [mockMenu, anotherMenu]
        });

        let currState = appMenuReducer(state, {type: AppMenuActions.CLEAR_MENU_ITEMS});
        expect(currState).not.toBe(state);
        expect(currState).toEqual({currentItems: []});
    });
    it('Insert Menu And Clear Menu', ()=> {


        let state1 = appMenuReducer(initialState, {type: AppMenuActions.INSERT_MENU,
            payload:{index:1, menu: mockMenu}});
        expect(state1).not.toBe(initialState);
        expect(state1).not.toEqual(initialState);
        expect(state1).toEqual({currentItems:[mockMenu]});

        let state2 = appMenuReducer(state1, createAction(AppMenuActions.INSERT_MENU, {
            index: 0, menu: anotherMenu
        }));
        expect(state2).not.toBe(state1);
        expect(state2).not.toEqual({
            currentItems: [mockMenu, anotherMenu]
        });
        expect(state2).toEqual({
            currentItems: [anotherMenu,mockMenu]
        });
        let finalState = appMenuReducer(state2, createAction(AppMenuActions.CLEAR_MENU_ITEMS));
        expect(finalState).toBeTruthy();
        expect(finalState).not.toBe(initialState);
        expect(finalState).toEqual(initialState);
    });
    it('Add Menu At Beginning', ()=>{
        let state1 = appMenuReducer(initialState, createAction(AppMenuActions.ADD_MENU_AT_BEGINING, mockMenu));
        expect(state1).toBeTruthy();
        expect(state1).not.toBe(initialState);
        expect(state1).not.toEqual(initialState);
        expect(state1).toEqual({currentItems:[mockMenu]});

        let state2 = appMenuReducer(state1, createAction(AppMenuActions.ADD_MENU_AT_BEGINING, anotherMenu));
        expect(state2).toBeTruthy();
        expect(state2).not.toBe(state1);
        expect(state2).not.toEqual(state1);
        expect(state2).toEqual({currentItems:[anotherMenu, mockMenu]});

        let state3 = appMenuReducer(state2, createAction(AppMenuActions.ADD_MENU_AT_BEGINING));
        expect(state3).toBeTruthy();
        expect(state3).toBe(state2);

        let state4 = appMenuReducer(state3, createAction(AppMenuActions.CLEAR_MENU_ITEMS));
        expect(state4).toBeTruthy();
        expect(state4).not.toBe(initialState);
        expect(state4).toEqual(initialState);
    });
});