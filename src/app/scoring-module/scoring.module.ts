import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClubManualScoringGuard} from './club-manual-scoring-guard';
import {OrganizerManualScoringGuard} from './organizer-manual-scoring-guard';

import { ScoringRoutingModule } from './scoring-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ScoringRoutingModule
  ],
    declarations: [],
    providers:[OrganizerManualScoringGuard, ClubManualScoringGuard]
})
export class ScoringModule { }
