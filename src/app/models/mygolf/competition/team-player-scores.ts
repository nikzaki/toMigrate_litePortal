
import {HoleScore} from './hole-score';

export interface TeamPlayerScores {
    playerId?: number;
    playerName?: string;
    playerImage?: string;
    thumbnail?: string;
    handicap?: number;
    totalGross?: number;
    totalNet?: number;
    inTotalGross?: number;
    outTotalGross?: number;
    inTotalNet?: number;
    outTotalNet?: number;
    toPar?: number;
    toParNet?: number;
    qualified?: boolean;
    scores?: HoleScore[];
}