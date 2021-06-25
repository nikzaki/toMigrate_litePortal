import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {createAction} from '../create-action';
import {CustomizationActions} from '../customizer/customization-actions';
import {MenuItem} from 'primeng/primeng';
/**
 * Created by ashok on 29/04/17.
 */



@Injectable()
export class AppMenuActions {
    static CLEAR_MENU_ITEMS = "CLEAR_MENU_ITEMS";
    static INSERT_MENU = "INSERT_MENU";
    static ADD_MENU = "ADD_MENU";
    static ADD_MENU_AT_BEGINING = "ADD_MENU_BEGINNING";

    constructor(private store: Store<AppState>) {
    }

    clearMenuItems(){
        this.store.dispatch(createAction(AppMenuActions.CLEAR_MENU_ITEMS));
    }

    resetMenuItems() {
        this.clearMenuItems();
        this.addCustomizerMenu();
        this.addThemesMenu();
    }
    initialMenu() {
        this.resetMenuItems();
        this.addMenuBeginning({
            label: 'Player Registration', icon: 'person_add',
            routerLink: ['/register-player']
        });
    }
    /**
     * Adds the theme menus
     */
    addThemesMenu() {
        let themeMenu = {
            label: 'Themes', icon: 'palette',
            items: [
            {
                label: 'Indigo - Pink', icon: 'brush', command: (event) => {
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'indigo'));
            }
            },
            {
                label: 'Brown - Green', icon: 'brush', command: (event) => {
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'brown'));
                // changeTheme('brown');
            }
            },
            {
                label: 'Blue - Amber', icon: 'brush', command: (event) => {
                // changeTheme('blue');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'blue'));
            }
            },
            {
                label: 'Blue Grey - Green', icon: 'brush', command: (event) => {
                // changeTheme('blue-grey');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'blue-grey'));
            }
            },
            {
                label: 'Dark - Blue', icon: 'brush', command: (event) => {
                // changeTheme('dark-blue');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'dark-blue'));
            }
            },
            {
                label: 'Dark - Green', icon: 'brush', command: (event) => {
                // changeTheme('dark-green');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'dark-green'));
            }
            },
            {
                label: 'Green - Yellow', icon: 'brush', command: (event) => {
                // changeTheme('green');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'green'));
            }
            },
            {
                label: 'Purple - Cyan', icon: 'brush', command: (event) => {
                // changeTheme('purple-cyan');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'purple-cyan'));
            }
            },
            {
                label: 'Purple - Amber', icon: 'brush', command: (event) => {
                // changeTheme('purple-amber');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'purple-amber'));
            }
            },
            {
                label: 'Teal - Lime', icon: 'brush', command: (event) => {
                // changeTheme('teal');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'teal'));
            }
            },
            {
                label: 'Cyan - Amber', icon: 'brush', command: (event) => {
                // changeTheme('cyan');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'cyan'));
            }
            },
            {
                label: 'Grey - Deep Orange', icon: 'brush', command: (event) => {
                // this.changeTheme('grey');
                this.store.dispatch(createAction(CustomizationActions.SET_THEME, 'grey'));
            }
            }
        ]
        }
        this.addMenu(themeMenu);
    }

    addCustomizerMenu(){
        let customizerMenu =
            {
                label: 'Customization', icon: 'settings_application',
                items: [
                    {label: 'Compact Size', icon: 'fiber_manual_record',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_TEXT_SIZE,'compact'))},
                    {label: 'Material Size', icon: 'fiber_smart_record',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_TEXT_SIZE,'material'))},
                    {label: 'Static Menu', icon: 'menu',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_MENU_LAYOUT,'static'))},
                    {label: 'Slim Menu', icon: 'more_vert',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_MENU_LAYOUT,'slim'))},
                    {label: 'Overlay Menu', icon: 'exit_to_app',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_MENU_LAYOUT,'overlay'))},
                    {label: 'Horizontal Menu', icon: 'border_horizontal',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_MENU_LAYOUT,'horizontal'))},
                    {label: 'Light Menu', icon: 'label_outline',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_MENU_COLOR,'light'))},
                    {label: 'Dark Menu', icon: 'label',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_MENU_COLOR,'dark'))},
                    {label: 'Inline Profile', icon: 'contacts',
                        command: () => this.store.dispatch(createAction(CustomizationActions.SET_PROFILE_TYPE,'inline'))},
                    {label: 'Top Profile', icon: 'person_pin',
                        command: () =>this.store.dispatch(createAction(CustomizationActions.SET_PROFILE_TYPE,'top'))},
                ]
            };
        this.addMenu(customizerMenu);
    }
    addMenu(menu: MenuItem) {
        this.store.dispatch(createAction(AppMenuActions.ADD_MENU, menu));
    }
    addMenuBeginning(menu: MenuItem) {
        this.store.dispatch(createAction(AppMenuActions.ADD_MENU_AT_BEGINING, menu));
    }
    insertMenu(menu: MenuItem, index: number) {
        this.store.dispatch(createAction(AppMenuActions.INSERT_MENU, {
            menu: menu,
            index: index
        }));
    }
}