import {HoleScore} from './hole-score';

export interface WhichNine {
    nine?: number;
    courseName?: string;
    grossTotal?: number;
    netTotal?: number;
    
    scores?: Array<HoleScore>;
}