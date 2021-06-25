import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdIconRegistry} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbAlertModule, NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {compose} from '@ngrx/core/compose';
import {EffectsModule} from '@ngrx/effects';
import {combineReducers, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {localStorageSync} from 'ngrx-store-localstorage';
import {ConfirmationService} from 'primeng/primeng';
import 'rxjs/add/operator/toPromise';
import {AdminModule} from './admin-module/admin.module';
import {AppComponent} from './app.component';
import {AppFooter} from './app.footer.component';
import {AppMenuComponent, AppSubMenu} from './app.menu.component';
import {InlineProfileComponent} from './app.profile.component';
import {AppRoutes} from './app.routes';
import {AppTopBar} from './app.topbar.component';
import {MygolfCommonModule} from './common-module/common.module';
import {ComponentModule} from './component-module/component.module';
import {LeaderboardModule} from './leaderboard-module/leaderboard.module';
import {AboutUsComponent} from './main/main-portal/about-us/about-us.component';
import {ContactUsComponent} from './main/main-portal/contact-us/contact-us.component';
import {DashboardComponent} from './main/main-portal/dashboard/dashboard.component';
import {FaqComponent} from './main/main-portal/faq/faq.component';
import {TournamentDetailsComponent} from './main/main-portal/tournaments/tournament-details/tournament-details.component';
import {TournamentListComponent} from './main/main-portal/tournaments/tournament-list/tournament-list.component';
import {MainComponent} from './main/main.component';
import {FooterComponent} from './main/shared/footer/footer.component';
import {HeaderComponent} from './main/shared/header/header.component';
import {SidebarComponent} from './main/shared/sidebar/sidebar.component';
import {MDModules} from './md-module-imports';
import {AppSync} from './models/appstate';
import {PRIMENG_MODULES} from './primeng.imports';
import {CustomizationEffects} from './redux/customizer/customizer-effects';
import {NotificationEffects} from './redux/notifications/notification-effects';
import {ReduxServices} from './redux/redux-services';
import {rootReducer} from './redux/root-reducer';
import {SessionEffects} from './redux/session/session-effects';
import {StoreActionProviders} from './redux/store-action-providers';
import {ScoringModule} from './scoring-module/scoring.module';
import {AppServiceProviders} from './services/app-service.providers';
import {ConfigurationService} from './services/configuration.service';
import {HomeModule} from './home-module/home.module';
import {HomeRoutes} from './home-module/home.routes';
import {LeaderboardRoutes} from './leaderboard-module/leaderboard.routes';

export const prodReducer = compose(localStorageSync({
        keys: AppSync,
        rehydrate: false
    }),
    combineReducers)(rootReducer);

export function appReducer(state: any = {}, action: any){
    return prodReducer(state, action);
}
export function loadConfig(configService: ConfigurationService) {
    return () => {
        return configService.load();
    };
}
export class CustomOption extends ToastOptions {
    animate = 'fade'; // you can override any options available
    newestOnTop = false;
    showCloseButton = true;
    positionClass: 'toast-bottom-right';
}
export let stompConfigFactory = (configService: ConfigurationService)=> {
    //replace http: with ws
    let serverRoot = configService.config.serverRoot;
    let wsProtocol = configService.config.webSocketProtocol;
    let wsPort = configService.config.webSocketPort;
    let httpPort = configService.config.serverPort;
    console.log("pre serverRoot", serverRoot)
    if(serverRoot) {
        if(serverRoot.includes('http:')) {
            serverRoot = serverRoot.replace('http:', wsProtocol +":");
        } else if (serverRoot.includes('https:')) {
            serverRoot = serverRoot.replace('https:', wsProtocol + ":");
        }
        if(httpPort) {
            serverRoot = serverRoot + ':' + wsPort
        }
        console.log("post serverRoot", serverRoot)
        
    }
    const stompConfig: StompConfig = {
        // Which server?
        url: serverRoot + '/mygolf2u-ws',

        // Headers
        // Typical keys: login, passcode, host
        headers: {
        },

        // How often to heartbeat?
        // Interval in milliseconds, set to 0 to disable
        heartbeat_in: 0, // Typical value 0 - disabled
        heartbeat_out: 20000, // Typical value 20000 - every 20 seconds

        // Wait in milliseconds before attempting auto reconnect
        // Set to 0 to disable
        // Typical value 5000 (5 seconds)
        reconnect_delay: 5000,

        // Will log diagnostics on console
        debug: configService.config.webSocketDebug
    };
    return stompConfig;
};

export function setLocaleId() {
    // return configService.setLocaleId();
    if (window.navigator && window.navigator.language) {
        console.log('Browser language ' + window.navigator.language);
        return window.navigator.language;
    } else {
        console.error('Browser language can\'t be detected. Setting to default en-GB');
        return 'en-GB';
    }
}


@NgModule({
    imports     : [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        StoreModule.provideStore(appReducer),
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5
        }),
        EffectsModule.runAfterBootstrap(CustomizationEffects),
        EffectsModule.runAfterBootstrap(SessionEffects),
        EffectsModule.runAfterBootstrap(NotificationEffects),
        ...PRIMENG_MODULES,
        ...MDModules,
        MygolfCommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgbModule,
        ComponentModule,
        HomeModule,
        // PlayerModule,
        AdminModule,
        LeaderboardModule,
        ScoringModule,
        AppRoutes,
        HomeRoutes,
        LeaderboardRoutes

        // MainRoutingModule
    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppSubMenu,
        AppTopBar,
        AppFooter,
        InlineProfileComponent,
        MainComponent,
        HeaderComponent,
        FooterComponent,
        DashboardComponent,
        AboutUsComponent,
        ContactUsComponent,
        FaqComponent,
        TournamentListComponent,
        TournamentDetailsComponent,
        SidebarComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers   : [
        ...AppServiceProviders,
        ...ReduxServices,
        ...StoreActionProviders,
        ConfirmationService,
        {
            provide   : APP_INITIALIZER,
            useFactory: loadConfig,
            deps      : [ConfigurationService],
            multi     : true
        },
        {
            provide   : LOCALE_ID,
            useFactory: setLocaleId
        },
        StompService,
        {
            provide: StompConfig,
            useFactory: stompConfigFactory,
            deps: [ConfigurationService]
        },
        {provide: ToastOptions, useClass: CustomOption}
    ],
    exports: [BrowserModule,
              FormsModule,
              HttpModule,
              BrowserAnimationsModule],
    bootstrap   : [MainComponent]
})
export class AppModule {
    constructor(iconRegistry: MdIconRegistry){
        iconRegistry.setDefaultFontSetClass('material-design-icons')
    }
}
