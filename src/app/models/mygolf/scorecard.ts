/**
 * Created by ashok on 29/06/17.
 */
import {ClubCourse} from './club/club-course';
import {ServerResult} from '../server-result';
/**
 * This contains the classes related to scorecard for a game round
 * Created by Ashok on 03-05-2016.
 */
export interface PlayerScore {
    whichNine: number;
    holeNumber: number;

    //Database IDs
    scorecardId?: number; //The ID of the gs_scorecard
    gameCourseId?: number; //fk_game_course
    courseHoleId?: number; //fk_course_hole
    courseId?: number;

    holeIndex?: number;
    courseName: string;
    parScore: number;
    actualScore?: number;
    netScore?: number;
    adjustedScore?: number;
}
export interface NineToatls {
    whichNine: number;
    grossTotal: number;
    netTotal: number;
}
export interface PlayerRoundScores {
    playerRoundId?: number;

    playerId: number;
    scoringPlayerId?: number;
    scorerName?: string,
    playerName: string;
    nickName: string;
    teamName?: string;
    gender: string;
    playerHandicap: number;
    photoUrl: string;
    thumbnail?: string;
    startTime?: Date;
    actualStartTime?: Date;
    frontNineTotal: number;
    backNineTotal: number;
    totalScore: number;
    diffGrossToPar?: number;
    frontNineNetTotal: number;
    backNineNetTotal: number;
    totalNetScore: number;
    diffNetToPar?: number;
    status?: string; //Status values P-Pending I- In Progress C - Completed W - Withdrawn
    scores: Array<PlayerScore>;
    totals: Array<NineToatls>;
}
export interface PlainScorecard extends ServerResult {
    clientId?: string;
    competition: boolean;
    competitionId?: number;
    competitionName?: string;
    competitionRound?: string;
    scoringFormat?: string;
    gameRoundId?: number;
    roundNumber?: number;

    startTime?: string;

    finished: boolean;
    scoringFinished?: boolean;
    fullInfo?: boolean;
    clubId?: number;
    clubName?: string;
    playedOn?: Date;
    // finishTime?: Date;
    flightNumber?: string;
    participants?: string;
    courseNames?: string;
    frontNineTotal?: number;
    backNineTotal?: number;
    totalScore?: number;
    playerTotals?: string;
    courses: Array<ClubCourse>;

    currentHole?: number;
    startingHole?: number;
    dirty?: boolean;
    playerRoundScores: Array<PlayerRoundScores>;
    allScores?: boolean;
    flightChanged?: boolean;
}
/**
 * Creates an instance of PlainScorecard
 * @param competition
 * @returns {{success: boolean, clientId: any, competition: boolean, playerRoundScores: any[]<PlayerRoundScores>, courses: any[]<CourseInfo>, finished: boolean}}
 */
export function createScorecard(competition: boolean) {
    return {
        success          : true,
        clientId         : '',
        competition      : competition,
        playerRoundScores: new Array<PlayerRoundScores>(),
        courses          : new Array<ClubCourse>(),
        finished         : false
    };
}
