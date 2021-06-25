import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PRIMENG_MODULES} from '../primeng.imports';
import {PlayerRoutes} from './player.routes';
import {PlayerHomeComponent} from './player-home/player-home.component';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
/**
 * Created by ashok on 23/06/17.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ...PRIMENG_MODULES,
        PlayerRoutes
    ],
    declarations: [PlayerHomeComponent]
})
export class PlayerModule {
}