import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PRIMENG_MODULES} from '../primeng.imports';
import {CompetitionDisplayComponent} from './competition-display/competition-display.component';
import {CompetitionListComponent} from './competition-list/competition-list.component';
import {ActionComponent} from './action/action.component';
import {ManualScoringComponent} from './manual-scoring/manual-scoring.component';

import {CompetitionDetailsComponent} from './competition-details/competition-details.component';
import {PrizeListComponent} from './prize-list/prize-list.component';
import {SponsorListComponent} from './sponsor-list/sponsor-list.component';
import {CompetitionPlayerListComponent} from './competition-player-list/competition-player-list.component';
import {FlightMemberComponent} from './flight-member/flight-member.component';
import {FlightComponent} from './flight/flight.component';
import {MonitorScoringComponent} from './monitor-scoring/monitor-scoring.component';
import {ScoringDisplayComponent} from './scoring-display/scoring-display.component';
import {DeviceAssignmentComponent} from './device-assignment/device-assignment.component';
import {PlayerDisplayComponent} from './player-display/player-display.component';
import {CompetitionLeaderboardComponent} from './competition-leaderboard/competition-leaderboard.component';
import {PlayerScorecardDisplayComponent} from './player-scorecard-display/player-scorecard-display.component';
import {LegendDisplayComponent} from './legend-display/legend-display.component';
import {AdvertisementDisplayComponent} from './advertisement-display/advertisement-display.component';
import {AdvertisementListComponent} from './advertisement-list/advertisement-list.component';
import {AdvertisementFormComponent} from './advertisement-form/advertisement-form.component';
import {AdvertiseManagementComponent} from './advertise-management/advertise-management.component';
import { TeamLeaderboardComponent } from './team-leaderboard/team-leaderboard.component';
import { TeamScoreDetailsComponent } from './team-score-details/team-score-details.component';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceManagementComponent} from './device-management/device-management.component';
import {MygolfHandicapComponent} from './mygolf-handicap/mygolf-handicap.component';
import {CompetitionHome} from './competition-home/competition-home.component';

import {MDModules} from '../md-module-imports';
import { LeaderboardSettingsComponent } from './leaderboard-settings/leaderboard-settings.component';
import {MygolfCommonModule} from '../common-module/common.module';
import { ScoringNotificationsComponent } from './scoring-notifications/scoring-notifications.component';
import {LeadrboardColumnVisibilityComponent} from './leaderboard-settings/leadrboard-column-visibility-component';
import {CommonModule} from '@angular/common';

/**
 * Created by ashok on 23/06/17.
 */
@NgModule({
    imports     : [
        // BrowserModule,
        // BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MygolfCommonModule,
        ...PRIMENG_MODULES,
        ...MDModules
    ],
    declarations: [CompetitionDisplayComponent, CompetitionListComponent, ActionComponent, ManualScoringComponent,
                   CompetitionDetailsComponent, PrizeListComponent, SponsorListComponent,
                   CompetitionPlayerListComponent, FlightMemberComponent,
                   FlightComponent,
                   MonitorScoringComponent,
                   ScoringDisplayComponent, DeviceAssignmentComponent, PlayerDisplayComponent,
                   CompetitionLeaderboardComponent,
                   PlayerScorecardDisplayComponent,
                   LegendDisplayComponent,
                   AdvertisementDisplayComponent, AdvertisementListComponent,
                   AdvertisementFormComponent, AdvertiseManagementComponent,
                   TeamLeaderboardComponent,
                   TeamScoreDetailsComponent, DeviceListComponent, DeviceManagementComponent,
                   LeaderboardSettingsComponent, LeadrboardColumnVisibilityComponent,
                   ScoringNotificationsComponent, MygolfHandicapComponent, CompetitionHome],
    exports     : [CompetitionDisplayComponent, CompetitionListComponent,
                   ActionComponent, ManualScoringComponent,
                   CompetitionDetailsComponent, PrizeListComponent, SponsorListComponent,
                   CompetitionPlayerListComponent, FlightMemberComponent,
                   FlightComponent,
                   MonitorScoringComponent,
                   ScoringDisplayComponent, DeviceAssignmentComponent, PlayerDisplayComponent,
                   CompetitionLeaderboardComponent, PlayerScorecardDisplayComponent,
                   LegendDisplayComponent,
                   AdvertisementDisplayComponent, AdvertisementListComponent,
                   AdvertisementFormComponent, AdvertiseManagementComponent,LeaderboardSettingsComponent,
                   LeadrboardColumnVisibilityComponent,
                   TeamLeaderboardComponent,TeamScoreDetailsComponent,DeviceListComponent, DeviceManagementComponent,
                   ScoringNotificationsComponent,MygolfHandicapComponent, CompetitionHome
    ]
})
export class ComponentModule {
}