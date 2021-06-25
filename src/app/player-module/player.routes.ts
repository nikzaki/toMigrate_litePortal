import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {PlayerHomeComponent} from './player-home/player-home.component';
/**
 * Created by ashok on 23/06/17.
 */

export const routes: Routes = [
    {
        path: '', component: PlayerHomeComponent,
        children: [
        ]
    }
];
export const PlayerRoutes: ModuleWithProviders = RouterModule.forChild(routes);