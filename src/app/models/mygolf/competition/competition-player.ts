import {CompetitionPayment} from './competition-payment';
/**
 * The information about the player participating in a given competition
 * Created by ashok on 02/05/17.
 */

export interface CompetitionPlayer {
    playerId: number;
    playerName: string;
    registeredOn?: Date;
    handicap?: number;
    playerStatus?: string;
    memberAccount?: string;
    photoUrl?: string;
    category?: string;
    paymentInfo?: CompetitionPayment;
    scorecard?: any;
    countryId?: string;
    countryName?: string;
    sportCode?: string;
    flagUrl?: string;
}
