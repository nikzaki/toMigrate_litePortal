
import {Competition} from '../mygolf/competition/competition';

export interface UserNotifications {
    readonly activeCompetitions: Competition[];
    readonly scoringNotifications: ScoringNotification[];
}

export type ScoringNotification = {
    competitionId?: number;
    competitionName?: string;
    scoreType: string;
    hole?:number;
    player?: string;
    hide?: boolean;
}