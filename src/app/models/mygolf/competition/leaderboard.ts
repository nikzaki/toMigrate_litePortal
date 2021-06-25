import {LeaderBoardPlayer} from './leaderboard-player';

export interface LeaderBoard {
    competionName?: string;
    firstNineCourseName?: string;
    secondNoneCourseName?: string;
    totalPages?: number;
    currentPage?: number;
    totalInPage?: number;
    success: boolean;
    errorMessage?: string;
    players?: Array<LeaderBoardPlayer>;
}