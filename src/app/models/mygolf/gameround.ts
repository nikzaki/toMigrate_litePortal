/**
 * Information about a game round. This game round represents
 * both competition game round and normal game round
 * Created by ashok on 02/05/17.
 */

export interface GameRound {
    id?: number;
    roundNo?: number;
    roundDate?: Date;
    status?: string;
    inProgress?: boolean;
    nextRound?: boolean;
    courseNames?: Array<string>;
    //Requesting player's scores for the given round
    netTotal?: number;
    grossTotal?: number;
    netPosition?: number;
    grossPosition?: number;
}