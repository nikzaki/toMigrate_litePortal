import {
    AfterViewInit, Component, ElementRef, OnDestroy, Renderer, Renderer2, ViewChild, LOCALE_ID,
    Inject, OnInit, ViewContainerRef, HostListener
} from '@angular/core';
import {AppMenuService} from './redux/appmenu/appmenu-service';
import {Observable} from 'rxjs/Observable';
import {AppState} from './models/appstate';
import {MenuItem, Message, TooltipModule} from 'primeng/primeng';
import {Store} from '@ngrx/store';
import {AppMenuActions} from './redux/appmenu/appmenu-actions';
import {CustomizationService} from './redux/customizer/customization-service';
import {SessionService} from './redux/session/session.service';
import {AdminMenuItems} from './admin-module/admin.routes';
import {NotificationService} from './redux/notifications/notification-service';
import {ScoringNotification} from './models/session/user-notifications';
import {SystemMessageService} from './redux/messages/system-message-service';
import {Subscription} from 'rxjs/Subscription';
import {SystemMessageActions} from './redux/messages/system-message-actions';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute } from '@angular/router';
// import {SidebarModule} from 'primeng/primeng';
enum MenuOrientation {
    STATIC,
    OVERLAY,
    SLIM,
    HORIZONTAL
}
declare var jQuery: any;

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    layoutCompact: boolean = false;

    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    darkMenu: boolean = false;

    profileMode: string = 'inline';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    rightPanelActive: boolean;

    rightPanelClick: boolean;

    layoutContainer: HTMLDivElement;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    documentClickListener: Function;

    resetMenu: boolean;

    menuHoverActive: boolean;

    // scoringNotifications: Observable<ScoringNotification[]>;

    @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    appMenu: Observable<MenuItem[]>;
    loggedIn: Observable<boolean>;


    constructor(public renderer: Renderer2,
        @Inject(LOCALE_ID) private _locale: string,
        private appMenuService: AppMenuService,
        private store: Store<AppState>,
        private customizationService: CustomizationService,
        private sessionService: SessionService,
        private notfService: NotificationService,
        private messageService: SystemMessageService,
        public messageAction: SystemMessageActions,
        private toastManager: ToastsManager,
        private vcr: ViewContainerRef,
        private appMenuActions: AppMenuActions,
        private activeRoute: ActivatedRoute,) {
        console.log("Locale ID=" + _locale);
        this.toastManager.setRootViewContainerRef(vcr);
        this.appMenu = this.appMenuService.getCurrentValue();
        this.loggedIn = this.sessionService.isLoggedIn();
        this.appMenuActions.initialMenu();

        this.sessionService.getSession()
            .map(session=>session.userInfo)
            .filter(Boolean)
            // .map(userInfo=>userInfo.userType)
            .distinctUntilChanged()
            .subscribe((userInfo:any) =>{
                switch(userInfo.userType){
                    case 'Admin':
                        this.appMenuActions.clearMenuItems();
                        AdminMenuItems.forEach(mi=>this.appMenuActions.addMenu(mi));
                        this.appMenuActions.addCustomizerMenu();
                        this.appMenuActions.addThemesMenu();
                }
            });


    }
    @HostListener("document:webkitfullscreenchange", []) fullScreen(val) {
        console.log("Fullscreen " + JSON.stringify(val));
    }
    ngOnInit() {
        this.store.select(appState=>appState.customization.menuLayout).subscribe((layout=>{
            switch (layout){
                case 'overlay': this.changeToOverlayMenu(); break;
                case 'horizontal': this.changeToHorizontalMenu(); break;
                case 'slim': this.changeToSlimMenu(); break;
                default: this.changeToStaticMenu();
            }
        }));
        this.customizationService.getMenuColor().subscribe(color=>{
            switch(color) {
                case 'dark': this.darkMenu = true; break;
                default: this.darkMenu = false;
            }
        });
        this.customizationService.getTextSize().subscribe(textSize=>{
            switch(textSize) {
                case 'compact': this.layoutCompact = true; break;
                default: this.layoutCompact = false;
            }
        });
        this.customizationService.getTheme().subscribe(theme=>{
            this.changeTheme(theme);
        });
        this.customizationService.getProfile().subscribe(profile=>{
            this.profileMode = profile;
        });

        this.activeRoute.queryParams
        .subscribe(params => {
            if(params.embedded === 'true') {
                this.embedded = true;
            }
        });
    }
    embedded: boolean = false;
    ngAfterViewInit() {

        this.layoutContainer    = <HTMLDivElement> this.layourContainerViewChild.nativeElement;
        this.layoutMenuScroller = <HTMLDivElement> this.layoutMenuScrollerViewChild.nativeElement;

        // hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.menuClick && this.isHorizontal()) {
                this.resetMenu = true;
            }

            this.topbarItemClick = false;
            this.menuClick       = false;
        });

        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({flash: true});
        }, 10);
    }
    onGrowlMessageClose(msg: Message) {
        // this.messageAction.setGrowlMessages(this.growlMessages);
    }
    onMessageClose(msg: Message) {
        // this.messageAction.removeMessage(msg);
    }
    onLayoutClick() {
        if(!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if(!this.menuClick) {
            if(this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }

            if(this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        if(!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
        event.stopPropagation();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => {
                jQuery(this.layoutMenuScroller).nanoScroller();
            }, 500);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick  = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
        event.stopPropagation();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        // this.activeTopbarItem = this.activeTopbarItem === item ? null : item;
        if(this.activeTopbarItem === item)
            this.activeTopbarItem = null;
        else
            this.activeTopbarItem = item;

        event.preventDefault();
        event.stopPropagation();
    }
    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
        event.stopPropagation();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }
    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }
    isSlim() {
        return this.layoutMode === MenuOrientation.SLIM;
    }
    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }
    changeToSlimMenu() {
        this.layoutMode = MenuOrientation.SLIM;
    }
    changeTheme(theme) {
        const themeLink: HTMLLinkElement  = <HTMLLinkElement> document.getElementById('theme-css');
        // const layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');
        // themeLink.href                    = 'assets/theme/theme-' + theme + '.css';
        // layoutLink.href                   = 'assets/layout/css/layout-' + theme + '.css';
        themeLink.href = 'assets/mygolf/sass/mygolf-' + theme + '.css';
    }
    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }

        jQuery(this.layoutMenuScroller).nanoScroller({flash: true});
    }
}
