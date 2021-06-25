
import {TeamPlayerScores} from './team-player-scores';

export interface TeamRoundScores {
    roundNumber?: number;
    roundId?: number;
    status?: string;
    totalGross?: number;
    totalNet?: number;
    prevRoundPosition?: any;
    currentPosition?: any;
    toPar?: number;
    toParNet?: number;
    topNTotalGross?: number;
    topNTotalNet?: number;
    topNToPar?: number;
    topNToParNet?: number;
    playerScores?: TeamPlayerScores[];
}