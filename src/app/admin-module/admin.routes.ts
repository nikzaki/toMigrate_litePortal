import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {MenuItem} from 'primeng/primeng';
import {AdminGuard} from './admin-guard';
import {CompetitionDetailsComponent} from '../component-module/competition-details/competition-details.component';
import {ManualScoringComponent} from '../component-module/manual-scoring/manual-scoring.component';
import {MonitorScoringComponent} from '../component-module/monitor-scoring/monitor-scoring.component';
import {PlayerMergeComponent} from './player-merge/player-merge.component';
import {CompetitionLeaderboardComponent} from '../component-module/competition-leaderboard/competition-leaderboard.component';
import {AdvertiseManagementComponent} from '../component-module/advertise-management/advertise-management.component';
import {ImportPlayersComponent} from './import-players/import-players.component';

import {DeviceManagementComponent} from '../component-module/device-management/device-management.component';
import {IndividualLeaderboardComponent} from '../leaderboard-module/individual-leaderboard/individual-leaderboard.component';
import {TeamLeaderboardComponent} from '../leaderboard-module/team-leaderboard/team-leaderboard.component';
import {ScorecardLeaderboardComponent} from '../leaderboard-module/scorecard-leaderboard/scorecard-leaderboard.component';
import { CompetitionListComponent } from '../component-module/competition-list/competition-list.component';

/**
 * Created by ashok on 13/06/17.
 */

export const routes: Routes = [
    {
        path       : 'admin',
        canActivate: [AdminGuard],
        children   : [
            {
                path: '', component: AdminHomeComponent
            },
            {
                path: 'playermerge', component: PlayerMergeComponent
            },
            {
                path: 'importplayers', component: ImportPlayersComponent
            },
            {
               path: 'devicemanagement', component: DeviceManagementComponent
            },

            {
                path    : 'competition',
                children: [{
                    path: 'details/:competitionId', 
                    // loadChildren: './leaderboard-module/leaderboard.module#CompetitionDetailsComponent'
                    component: CompetitionDetailsComponent
                }, {
                    path: 'manualscoring/:competitionId', 
                    // loadChildren: './leaderboard-module/leaderboard.module#ManualScoringComponent'
                    component: ManualScoringComponent
                }, {
                    path: 'monitorscoring/:competitionId', 
                    // loadChildren: './leaderboard-module/leaderboard.module#MonitorScoringComponent'
                    component: MonitorScoringComponent
                }, {
                    path: 'leaderboard/:competitionId', 
                    // loadChildren: './leaderboard-module/leaderboard.module#IndividualLeaderboardComponent'
                    component: IndividualLeaderboardComponent
                    // component: CompetitionLeaderboardComponent
                }, {
                    path: 'leaderboardTest/:competitionId', 
                    // loadChildren: './leaderboard-module/leaderboard.module#ScorecardLeaderboardComponent'
                    component: ScorecardLeaderboardComponent
                    // component: CompetitionLeaderboardComponent
                }, {
                    path: 'teamleaderboard/:competitionId', 
                    // loadChildren: './leaderboard-module/leaderboard.module#TeamLeaderboardComponent'
                    component: TeamLeaderboardComponent
                }, {
                    path: 'competitionlist', component: CompetitionListComponent
                 }]
            },
            {
                path: 'advertisements', component: AdvertiseManagementComponent
            }
        ]
    }
];
export const AdminRoutes: ModuleWithProviders = RouterModule.forChild(routes);
export const AdminMenuItems: MenuItem [] = [
    {label: 'Admin Home', icon: 'home', routerLink: ['/admin']},
    {label: 'Advertisements', icon: 'movie', routerLink: ['/admin/advertisements']},
    {label: 'Device Management', icon: 'important_devices', routerLink: ['/admin/devicemanagement']},
    {label: 'Merge Players', icon: 'merge_type', routerLink: ['/admin/playermerge']},
    {label: 'Import Players', icon: 'import_contacts', routerLink: ['/admin/importplayers']}
]
