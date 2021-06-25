import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {HomeRoutes} from './home.routes';
import {PRIMENG_MODULES} from '../primeng.imports';
import { LoginComponent } from './login/login.component';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import {MDModules} from '../md-module-imports';
import {MygolfCommonModule} from '../common-module/common.module';
import { AppRoutes } from 'app/app.routes';
import { LeaderboardRoutes } from '../leaderboard-module/leaderboard.routes';
import { MainComponent } from 'app/main/main.component';
/**
 * HomeModule definition
 * Created by ashok on 29/04/17.
 */

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MygolfCommonModule,
        ...PRIMENG_MODULES,
        ...MDModules,
        HomeRoutes,
        AppRoutes,
        LeaderboardRoutes
    ],
    declarations: [HomeComponent, AboutComponent, LoginComponent, PlayerRegistrationComponent, AccessDeniedComponent],
    // bootstrap: [MainComponent]
})
export class HomeModule{
}
