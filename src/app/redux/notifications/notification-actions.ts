import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../models/appstate';
import {CompetitionService} from '../../services/competition.service';
import {SessionService} from '../session/session.service';
import {Competition} from '../../models/mygolf/competition/competition';
import {createAction} from '../create-action';
import {ScoringNotification} from '../../models/session/user-notifications';

@Injectable()
export class NotificationActions {
    static FETCH_ACTIVE_COMPETITIONS = 'FETCH_ACTIVE_COMPETITIONS';
    static ACTIVE_COMPETITIONS = 'ACTIVE_COMPETITIONS';
    static NEW_SCORING_NOTIFICATION = 'NEW_SCORING_NOTIFICATION';
    static REMOVE_SCORING_NOTIFICATION = 'REMOVE_SCORING_NOTIFICATION';

    constructor(private store: Store<AppState>,
        private compService: CompetitionService,
        private sessionService: SessionService){
    }

    setActiveCompetitions(comps: Competition[]) {
        this.store.dispatch(createAction(NotificationActions.ACTIVE_COMPETITIONS, comps));
    }
    addScoringNotification(notf: ScoringNotification){
        this.store.dispatch(createAction(NotificationActions.NEW_SCORING_NOTIFICATION, notf));
    }
    removeScoringNotification(notf: ScoringNotification) {
        this.store.dispatch(createAction(NotificationActions.REMOVE_SCORING_NOTIFICATION, notf));
    }
}