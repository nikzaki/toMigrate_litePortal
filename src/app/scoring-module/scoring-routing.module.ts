import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManualScoringComponent} from '../component-module/manual-scoring/manual-scoring.component';
import {ClubManualScoringGuard} from './club-manual-scoring-guard';
import {OrganizerManualScoringGuard} from './organizer-manual-scoring-guard';

const routes: Routes = [{
    path    : 'manual-scoring',
    children: [
        {
            path: 'organizer/:competitionId',
            canActivate: [OrganizerManualScoringGuard],
            component: ManualScoringComponent
        },
        {
            path: 'club/:competitionId',
            component: ManualScoringComponent,
            canActivate: [ClubManualScoringGuard]
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScoringRoutingModule {
}
