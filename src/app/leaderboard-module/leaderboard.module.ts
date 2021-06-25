import {NgModule} from '@angular/core';
import {MygolfCommonModule} from '../common-module/common.module';
import {MDModules} from '../md-module-imports';
import {PRIMENG_MODULES} from '../primeng.imports';
import {InvidualComponent} from './invidual/invidual.component';
import {LeaderboardRoutes} from './leaderboard.routes';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {TeamLeaderboardComponent} from './team-leaderboard/team-leaderboard.component';
import {CommonModule} from '@angular/common';
import {ComponentModule} from '../component-module/component.module';
import {IndividualLeaderboardComponent} from './individual-leaderboard/individual-leaderboard.component';
import { IndividualExpandComponent } from './individual-expand/individual-expand.component';
import { TeamExpandComponent } from './team-expand/team-expand.component';
import { TeamwiseScorecardComponent } from './teamwise-scorecard/teamwise-scorecard.component';
import {ScorecardLeaderboardComponent} from './scorecard-leaderboard/scorecard-leaderboard.component';
import { AppRoutes } from 'app/app.routes';
import { HomeRoutes } from '../home-module/home.routes';


/**
 * HomeModule definition
 * Created by ashok on 29/04/17.
 */

@NgModule({
    imports: [
        CommonModule,
        MygolfCommonModule,
        ComponentModule,
        // FormsModule,
        // ReactiveFormsModule,
        // HttpModule,

        ...PRIMENG_MODULES,
        ...MDModules,
        LeaderboardRoutes,
        AppRoutes,
        HomeRoutes
    ],
    declarations: [LeaderboardComponent, InvidualComponent, TeamLeaderboardComponent,
        IndividualLeaderboardComponent,
        IndividualExpandComponent,
        TeamExpandComponent,
        TeamwiseScorecardComponent,
        ScorecardLeaderboardComponent],
    exports: [ TeamLeaderboardComponent,
               IndividualLeaderboardComponent, TeamwiseScorecardComponent,
               ScorecardLeaderboardComponent
            ]
})
export class LeaderboardModule{
}
