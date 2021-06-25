/**
 * Created by ashok on 26/06/17.
 */
export interface CompetitionFlightStatus {
    playerRoundId?: number;
    playerId?: number;
    playerName?: string;
    flightNumber?: string;
    startingHole?: number;
    buggyNumber?: string;
    scorerId?: number;
    scorerName?: string;

    holesPlayed?: number;
    netScore?: number;
    grossScore?: number;
    submitted?: boolean;
    withdrawn?: boolean;
    lastHoleScored?: number;
    currentHole?: number;
    scores?: any [];
}