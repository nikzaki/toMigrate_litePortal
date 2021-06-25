import {CompetitionGameRound} from './';

export interface LeaderBoardPlayer {
    playerId: number;
    position: string;
    playerName: string;
    firstName: string;
    lastName: string;
    imageURL: string;
    handicap: number;
    toPar: number;
    parCap: number;
    outTotalGross: number;
    inTotalGross: number;
    totalGross: number;
    outTotalNet: number;
    inTotalNet: number;
    totalNet: number;
    modifiedTotalNet: number;
    onHole: string;
    thru: string;
    ocb: string;
    // startTime?: Date,
    countryId?: string,
    sportCode?: string,
    flagUrl?: string,
    rounds?: CompetitionGameRound[];
    scores?: any[];
    startTime?: {
        hour: string,
        minute: string,
        second: string,
        nano: string
    }
    round1Gross?: number;
    round2Gross?: number;
    round3Gross?: number;
    round4Gross?: number;
}