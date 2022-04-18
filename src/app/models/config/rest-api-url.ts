/**
 * Created by ashok on 27/04/17.
 */
const AdBase = '/advertisement';
export const RestUrl: any = {
    restBase: '/rest',
    authentication: {
        loginUrl: '/api/login',
        auth: '/authenticate',
    },
    playerService: {
        isEmailUsed: '/emailused',
        registerPlayer: '/register/player',
        registerFriend: '/register/friend',
        playerInfo: '/player/get',
        searchPlayers: '/players/search',
        searchPlayersOpen: '/players/search/open',
        movePlayerData: '/player/move',
        importPlayersAnalyze: '/player/import-players/analyze',
        importPlayers: '/player/import-players/import',
        updateClubMembership: '/player/clubmembership/update',
        getCourseHandicap: '/handicap/player-course-handicap',
        getCountryList: '/countries',
        getClubMembership: '/player/clubmemberships',
        getClubMembershipOpen: '/player/clubmemberships/open',
        getTeeBox: '/tee-boxes',
        updatePlayerProfile: '/update/player/profile',
        getPlayerById : "/players/get-by-id", //?playerId
        getPlayerByEmail : "/player/getbyemail", //?email*
        getCourseSlopeRating: "​/club/course-slope-rating",
        getPlayerCourseHandicapDetails: "/handicap/player-course-handicap-details",

    },
    clubOrgService: {
        getClubInfo: '/club/get',
        clubCompetitionList: '/club/competitions/search',
        clubActiveCompetitions: '/club/competitions/active',
        clubList: '/clubs/search',
        clubListOpen: '/clubs/search/open',
        getOrganizerInfo: '/organizer/get',
        organizerCompetitionList: '/organizer/competitions/search',
        organizerActiveCompetitions: '/organizer/competitions/active',
        organizerList: '/organizer/list',
        courseList: '/club/courses',
        updateClubMemberStatus: '/club/members', //{clubId}/approve/{playerId}
    },
    competitionService: {
        search: '/competition/search',
        getInfo: '/competition/info',
        getDetails: '/competition/details',
        getScoringRound: '/competition/roundforscoring',
        getFlights: '/competition/flights/list',
        getFlightStatus: '/competition/playerscores',
        getActiveCompetitions: '/competition/active/list/all',
        getLeaderboard: '/competition/leaderboard',
        getPlayerScores: '/competition/playerallscores',
        getCompetitionTeamList: '/competition/teams/list',
        getTeamScores: '/competition/teamscores',
        searchCompetitions: '/competition/search',
    },
    scorecardService : {
        getPlayerScorecard: '/manualscoring/getscorecard',
        saveManualScoring: '/manualscoring/savescorecard'
    },
    deviceService : {
        searchDevices: '/device/search',
        selectScorer: '/device/selectscorer',
        updateDevice: '/device/update',
        getDevice: '/device/getinfo',
        updateFavorites: '/device/favorites/update',
        addToFavorites: '/device/favorites/add',
        removeFromFavorites: '/device/favorites/remove',
        listFavorites: '/device/favorites/list',
        identify: '/device/identify',
        startDevices: '/device/startdevices',
        compLocks: '/device/competitionlocks',
        deviceAssignments: '/device/assignments',
        assignDevices: '/device/assign',
        removeAssignment: '/device/removeassignment',
        logout: '/device/logout'
    },
    advertisement: {
        searchAds: AdBase +'/search',
        createAd: AdBase + '/create',
        updateAd: AdBase + '/update',
        deleteAd: AdBase + '/delete',
        searchOrganizerAds: AdBase + '/organizer/search',
        addOrganizerAd: AdBase+'/organizer/add',
        deleteOrganizerAd: AdBase + '/organizer/delete',
        searchCompetitionAds: AdBase + '/competition/search',
        addCompetitionAd: AdBase+'/competition/add',
        deleteCompetitionAd: AdBase + '/competition/delete'
    },
    handicapService: {
        getPlayerHcpList       : '/handicap/player-handicap-calculations',
        getClubHandicap        : '/handicap/get-club-handicaps',
        getHandicapSystemList   : "/handicap/handicap-systems",
        getPlayerHcpIdx : "/handicap/player-handicap-index", //{playerId}?handicapSystem=id
        syncHandicapIndex: "/handicap/sync-handicap-index", //{playerId}?handicapSystem*=id&playerId*
        getLatestCourseHandicap: "/handicap/course-handicap/player/", //{playerId**}/{teeBoxName}**?firstNine**&secondNine=
        getPlayerClubHcp       : "/handicap/get-club-handicaps",
        getPlayerDefHandicapSystem : "/handicap/player-handicap-system", //{playerId*}
    
    }
};
