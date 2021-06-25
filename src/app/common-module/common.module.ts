
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PRIMENG_MODULES} from '../primeng.imports';
import {MDModules} from '../md-module-imports';
import {NgModule} from '@angular/core';
import {SearchComponent} from './search/search.component';
import {ActionPanelComponent} from './action-panel/action-panel.component';
import { AnimatedNotificationComponent } from './animated-notification/animated-notification.component';
import { ToparPipe } from './topar.pipe';
import {CommonModule} from '@angular/common';
import { FeedComponent } from './feed/feed.component';

@NgModule({
    imports: [
        // BrowserModule,
        // BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...PRIMENG_MODULES,
        ...MDModules
    ],
    declarations: [
        SearchComponent, ActionPanelComponent, AnimatedNotificationComponent, ToparPipe, FeedComponent
    ],
    exports: [
        SearchComponent, ActionPanelComponent, AnimatedNotificationComponent, ToparPipe, FeedComponent
    ]
})
export class MygolfCommonModule {

}