/**
 * Leaderboard settings
 */
export class LeaderboardSettings {
    autoScroll?: boolean;
    scrollFrequency?: number;
    scrollSize?: number;
    scrollRounds?: boolean;
    scrollCategories?: boolean;
    scrollScoreTypes?: boolean;
    byCategory?: boolean;
    selectedCategory?: number;
    selectedRound?: number;
    colorSet?: string;
    scoreType?: string;
    hideNetColumns?: boolean;
    hideGrossColumns?: boolean;
    teamsByGrossOrNet?: string;
    showSponsor?: boolean;
    hideExpanderColumns?: boolean;
    showNonPlaying?: boolean;
}

export const DefaultLeaderboardSettings: LeaderboardSettings = {
    autoScroll       : true,
    scrollSize       : 50,
    scrollFrequency  : 13,
    scrollRounds     : false,
    scrollCategories : false,
    scrollScoreTypes : false,
    byCategory       : false,
    selectedCategory : null,
    colorSet         : 'amateur',
    scoreType        : 'gross',
    hideNetColumns   : true,
    hideGrossColumns : true,
    teamsByGrossOrNet: 'gross',
    showSponsor      : true,
    hideExpanderColumns : false,
    showNonPlaying   : false
}