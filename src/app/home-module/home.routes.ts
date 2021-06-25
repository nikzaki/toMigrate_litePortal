import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PlayerRegistrationComponent} from './player-registration/player-registration.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {CompetitionLeaderboardComponent} from '../component-module/competition-leaderboard/competition-leaderboard.component';
import {TeamLeaderboardComponent} from '../component-module/team-leaderboard/team-leaderboard.component';
/**
 * Created by ashok on 29/04/17.
 */

export const routes: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'about', component: AboutComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    // {
    //     path: 'leaderboard/:competitionId',
    //     component: CompetitionLeaderboardComponent
    // },
    // {
    //     path: 'teamleaderboard/:competitionId',
    //     component: TeamLeaderboardComponent
    // },
    {
        path: 'register-player', component: PlayerRegistrationComponent
    },
    {
        path: 'access-denied', component: AccessDeniedComponent
    }
];

export const HomeRoutes: ModuleWithProviders = RouterModule.forChild(routes);