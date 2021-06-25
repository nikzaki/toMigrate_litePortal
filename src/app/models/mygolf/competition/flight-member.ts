/**
 * Member of a competition flight
 * Created by ashok on 02/05/17.
 */
export interface FlightMember {
    playerId: number;
    playerName: string;
    photoUrl?: string;
    handicap?: number;
    buggy?: string;
    status?: string;
    scorer?: boolean;
    playerCount?:number;
    scoringPlayerId?:number;
    scoringPlayerName?: string;
}