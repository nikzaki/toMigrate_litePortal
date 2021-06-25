
import {TeamRoundScores} from './team-round-scores';
import {TeamPlayerOverallTotals} from './team-player-overall-totals';

export interface TeamScores {
    teamId?: number;
    teamName?: string;
    status?: string;
    teamLogo?: string;
    totalGross?: number;
    totalNet?: number;
    toPar?: number;
    toParNet?: number;
    position?: number;
    topNTotalGross?: number;
    topNTotalNet?: number;
    topNToPar?: number;
    topNToParNet?: number;
    ocb?: string;
    ocbNet?: string;
    roundScores?: TeamRoundScores[];
    playerOveralTotals?: TeamPlayerOverallTotals[];
}