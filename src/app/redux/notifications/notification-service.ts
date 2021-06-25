
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {Observable} from 'rxjs/Observable';
import {ScoringNotification} from '../../models/session/user-notifications';
import {Competition} from '../../models/mygolf/competition/competition';

@Injectable()
export class NotificationService {

    constructor(private store: Store<AppState>){}

    public scoringNotifications(): Observable<ScoringNotification[]>{
        return this.store.select(appState=>appState.userNotifications.scoringNotifications);
    }

    public activeCompetitions(): Observable<Competition[]> {
        return this.store.select(appState=>appState.userNotifications.activeCompetitions);
    }
}