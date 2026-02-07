import {
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {BusyModule} from 'ng-busy';
import {FlexLayoutModule} from '@angular/flex-layout';

export const MDModules = [
    MatCheckboxModule, MatButtonModule, MatRadioModule, MatIconModule, MatCardModule, MatTooltipModule,
    MatTableModule, CdkTableModule, MatTabsModule, MatListModule, MatToolbarModule, MatInputModule,
    MatListModule, MatOptionModule, MatSelectModule, MatProgressSpinnerModule, MatSlideToggleModule,
    BusyModule, FlexLayoutModule
];