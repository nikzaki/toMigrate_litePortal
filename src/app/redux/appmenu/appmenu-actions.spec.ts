import {Action, combineReducers, Store, StoreModule} from '@ngrx/store';
import {inject, TestBed} from '@angular/core/testing';
import {AppState} from '../../models/appstate';
import {AppMenuActions} from './appmenu-actions';
import {compose} from '@ngrx/core/compose';
import {rootReducer} from '../root-reducer';
import {MenuItem} from 'primeng/primeng';
/**
 * Created by ashok on 04/05/17.
 */

const testReducer = compose(combineReducers)(rootReducer);
export function appReducer(state: any = {}, action: any) {
    return testReducer(state, action);
}
describe('AppMenu Actions', () => {
    const mockMenu: MenuItem     = {
        label: 'Test Menu', icon: 'brush', routerLink: '[/test]'
    };
    const expectedAction: Action = {
        type   : AppMenuActions.ADD_MENU,
        payload: mockMenu
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports  : [
                StoreModule.provideStore(appReducer)
            ],
            providers: [
                AppMenuActions
            ]
        });
    });
    it('ADD_MENU action dispatched', inject([Store, AppMenuActions],
        (store: Store<AppState>, actions: AppMenuActions) => {
            expect(store);
            expect(actions);
            const spy = spyOn(store, 'dispatch');
            actions.addMenu(mockMenu);
            let args = spy.calls.mostRecent().args;
            expect(args).toBeTruthy();
            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
            expect(args.length).toBe(1);
            expect(args[0].type).toBe(AppMenuActions.ADD_MENU);
            //Test Themes Menu
            actions.addThemesMenu();
            args = spy.calls.mostRecent().args;
            expect(args).toBeTruthy();
            expect(args.length).toBe(1);
            expect(args[0].type).toBe(AppMenuActions.ADD_MENU);
            expect(args[0].payload).toBeTruthy();
        }));
    it('Theme Menu Add Dispatched', inject([Store, AppMenuActions], (store: Store<AppState>, actions: AppMenuActions) => {
        expect(store).toBeTruthy();
        expect(actions).toBeTruthy();
        const spy = spyOn(store, 'dispatch');
        actions.addThemesMenu();
        expect(spy).toBeTruthy();
        expect(spy.calls.mostRecent()).toBeTruthy();
        const args = spy.calls.mostRecent().args;
        expect(args).toBeTruthy();
        expect(args.length).toBe(1);
        expect(args[0].type).toBe(AppMenuActions.ADD_MENU);
        const menu = args[0].payload;
        expect(menu).toBeTruthy();
        expect(menu.label).toBe('Themes');
    }));
    it('INSERT_MENU dispatched', inject([Store, AppMenuActions],
        (store: Store<AppState>, actions: AppMenuActions) => {
            expect(store).toBeTruthy();
            expect(actions).toBeTruthy();
            spyOn(store, 'dispatch');
            actions.insertMenu(mockMenu, 1);
            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(store.dispatch).toHaveBeenCalledWith({
                type   : AppMenuActions.INSERT_MENU,
                payload: {
                    menu : mockMenu,
                    index: 1
                }
            });
        }));

    it('ADD_MENU_AT_BEGINNING Dispatched',
        inject([Store, AppMenuActions], (store: Store<AppState>, actions: AppMenuActions) => {
        expect(store).toBeTruthy();
        expect(actions).toBeTruthy();
        spyOn(store, 'dispatch');
        actions.addMenuBeginning(mockMenu);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith({
            type   : AppMenuActions.ADD_MENU_AT_BEGINING,
            payload: mockMenu
        });
    }));
});
