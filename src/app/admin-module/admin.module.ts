import {NgModule} from '@angular/core';
import {PRIMENG_MODULES} from '../primeng.imports';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import {AdminRoutes} from './admin.routes';
import {ComponentModule} from '../component-module/component.module';
import {AdminGuard} from './admin-guard';
import { PlayerMergeComponent } from './player-merge/player-merge.component';
import { ImportPlayersComponent } from './import-players/import-players.component';
import {MDModules} from '../md-module-imports';
import {MygolfCommonModule} from '../common-module/common.module';
import {LeaderboardModule} from '../leaderboard-module/leaderboard.module';
/**
 * Created by ashok on 13/06/17.
 */

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MygolfCommonModule,
        ComponentModule,
        ...PRIMENG_MODULES,
        ...MDModules,
        LeaderboardModule,
        AdminRoutes
    ],
    providers: [AdminGuard],
    declarations: [AdminHomeComponent, PlayerMergeComponent, ImportPlayersComponent]
})
export class AdminModule{}