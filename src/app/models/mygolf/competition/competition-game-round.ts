import {WhichNine} from './which-nine';

export interface CompetitionGameRound {
    roundNo?: number;
    courseNames?: string;
    outTotal?: number;
    inTotal?: number;
    outTotalNet?: number;
    inTotalNet?: number;
    nines?: Array<WhichNine>;
}