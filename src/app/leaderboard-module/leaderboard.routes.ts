import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {TeamLeaderboardComponent} from './team-leaderboard/team-leaderboard.component';
import {IndividualLeaderboardComponent} from './individual-leaderboard/individual-leaderboard.component';
import {TeamwiseScorecardComponent} from './teamwise-scorecard/teamwise-scorecard.component';
import {ScorecardLeaderboardComponent} from './scorecard-leaderboard/scorecard-leaderboard.component';
/**
 * Created by ashok on 29/04/17.
 */

export const routes: Routes = [
    {
        path: 'leaderboard/:competitionId', component: IndividualLeaderboardComponent,
        children: []
    },
    {
        path: 'leaderboardTest/:competitionId', component: ScorecardLeaderboardComponent,
        children: []
    },
    {
        path: 'teamleaderboard/:competitionId', component: TeamwiseScorecardComponent,
    },
    {
        path: 'old-teamleaderboard/:competitionId', component: TeamLeaderboardComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeaderboardRoutes{}
// export const LeaderboardRoutes: ModuleWithProviders = RouterModule.forChild(routes);