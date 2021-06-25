import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompetitionLeaderboardComponent} from './component-module/competition-leaderboard/competition-leaderboard.component';
import {TeamLeaderboardComponent} from './component-module/team-leaderboard/team-leaderboard.component';
import {TeamwiseScorecardComponent} from './leaderboard-module/teamwise-scorecard/teamwise-scorecard.component';
import {AboutUsComponent} from './main/main-portal/about-us/about-us.component';
import {ContactUsComponent} from './main/main-portal/contact-us/contact-us.component';
import {DashboardComponent} from './main/main-portal/dashboard/dashboard.component';
import {FaqComponent} from './main/main-portal/faq/faq.component';
import {CompetitionListComponent} from './component-module/competition-list/competition-list.component';
import {TournamentDetailsComponent} from './main/main-portal/tournaments/tournament-details/tournament-details.component';
import {MygolfHandicapComponent} from './component-module/mygolf-handicap/mygolf-handicap.component';
import {IndividualLeaderboardComponent} from './leaderboard-module/individual-leaderboard/individual-leaderboard.component';
import {CompetitionHome} from './component-module/competition-home/competition-home.component';

// import {TournamentListComponent} from './main/main-portal/tournaments/tournament-list/tournament-list.component';

export const routes: Routes = [
    // {path: '', redirectTo: '/main', pathMatch: 'full'},
    // {path: 'demo', loadChildren: 'app/demo/demo.module#DemoModule'},
    // {path: 'player', loadChildren:'app/player-module/player.module#PlayerModule'},
    // {path: 'leader-board', loadChildren:'app/leaderboard-module/leaderboard.module#LeaderboardModule'}
    {
        path    : ''
        //  component: DashboardComponent
        ,redirectTo: 'dashboard', pathMatch: 'full',
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'about-us', component: AboutUsComponent
    },
    {
        path: 'contact-us', component: ContactUsComponent
    },
    {
        path: 'faq', component: FaqComponent
    },
    {
        path: 'leader-board/:competitionId', component: CompetitionLeaderboardComponent
    },
    {
        path: 'team-leader-board/:competitionId', component: TeamLeaderboardComponent
    },
    {
        path: 'competition',
        children: [
            {
                path: 'details/:competitionId', component: TournamentDetailsComponent
            },
            {
                path: 'list', component: CompetitionHome
            }
        ]
    },
    {
        path: 'mg2u-handicap', component: MygolfHandicapComponent
    },
    {
        path: 'leaderboard/:competitionId', component: IndividualLeaderboardComponent
    },
    {
        path: 'teamleaderboard/:competitionId', component: TeamwiseScorecardComponent
    }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
