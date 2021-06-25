/**
 * Created by ashok on 02/05/17.
 */
export interface Competition {
    competitionId: number;
    competitionName?: string;
    clubTag?: string;
    scoringFormat?: string;
    fee?: number;
    totalPrize?: number;
    totalHoles?: number;
    description?: string;
    rules?: string;
    allowGps?: boolean;
    showLeaderBoard?: boolean;
    allowChangeScorer?: boolean;
    startDate?: Date;
    endDate?: Date;
    publishDate?: Date;
    openDate?: Date;
    closeDate?: Date;
    closedForRegistration?: boolean;
    status?: string;
    totalRounds?: number;
    imageUrl?: string;
    thumbnail?: string,
    type?: string;
    registered?: boolean;
    maxPlayers?: number;
    totalRegistered?: number;
    clubName?: string;
    clubId?: number;
    organizerId?:number;
    organizerName?: string;
    teamEvent?: boolean;
    private?: boolean;
    considerTopN?: number;
    considerScoreType?: string;
};