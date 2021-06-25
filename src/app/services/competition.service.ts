/**
 * Created by ashok on 26/06/17.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestMethod, Response} from '@angular/http';
import {Util} from '../util';
import {HttpService} from './http.service';
import {ConfigurationService} from './configuration.service';
import {Competition} from '../models/mygolf/competition/competition';
import {RestUrl} from '../models/config/rest-api-url';
import {RemoteRequest, ContentType} from './remote-request';
import {CompetitionDetails} from '../models/mygolf/competition/competition-details';
import {Flight} from '../models/mygolf/competition/competition-flight';
import {CompetitionFlightStatus} from '../models/mygolf/competition/competition-flight-status';
import {CompetitionList} from '../models/mygolf/competition/competition-list';
import {LeaderBoard} from '../models/mygolf/competition/leaderboard';
import {CompetitionGameRound} from '../models/mygolf/competition/competition-game-round';
import {CompetitionTeams} from '../models/mygolf/competition';
import {TeamScores} from '../models/mygolf/competition/team-scores';

/**
 * The service class for competitions in myGolf2u
 * Created by ashok on 28/02/17.
 */
@Injectable()
export class CompetitionService {
    constructor(private remoteHttp: HttpService,
        private configService: ConfigurationService) {
    }

    /**
     * Returns the information about a competition
     * @param compId The ID of the competition
     * @returns {Observable<R>}
     */
    public getCompetitionInfo(compId: number): Observable<Competition> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getInfo);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let compInfo: Competition = resp.json();
                       this.configService.deriveFulImageURL(compInfo, ['thumbnail', 'imageUrl']);
                       return compInfo;
                   }).catch(Util.handleError);
    }

    /**
     * Get the details of competition
     * @param compId The ID of the competition
     * @returns {Observable<R>}
     */
    public getCompetitionDetails(compId: number): Observable<CompetitionDetails> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getDetails);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let compDetails: CompetitionDetails = resp.json();
                       if(compDetails.players){
                           compDetails.players.forEach(player=>{
                               this.configService.deriveFulImageURL(player, ['photoUrl']);
                               ConfigurationService.deriveDates(player,['registeredOn']);
                           })
                       }
                       if(compDetails.sponsors) {
                           compDetails.sponsors.forEach(sponsor=>{
                               this.configService.deriveFulImageURL(sponsor, ['imageUrl']);
                               ConfigurationService.deriveDates(sponsor,['sponsorDate']);
                           });
                       }
                       return compDetails;
                   }).catch(Util.handleError);
    }

    public getCompetitionTeams(competitionId: number): Observable<CompetitionTeams> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getCompetitionTeamList);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId
        });
        return this.remoteHttp.execute(req)
            .map((resp: Response)=>{
                let compTeams: CompetitionTeams = resp.json();
                compTeams.competitionTeams.forEach(team=>{
                    this.configService.deriveFulImageURL(team, ['teamLogo']);
                    //For each players their images
                    team.teamPlayers.forEach(p=>{
                        this.configService.deriveFulImageURL(p, ['imageURL', 'thumbnailURL']);
                    });
                });
                return compTeams;
            })

    }
    /**
     * Get the scoring round for the given competition
     * @param compId The ID of the competition
     * @returns {Observable<R>}
     */
    public getScoringRound(compId: number): Observable<number> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getScoringRound);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let round: number = resp.json();
                       return round;
                   }).catch(Util.handleError);
    }

    /**
     * Gets the flights for a given competition round
     * @param compId The ID of the competition
     * @param round The competition round
     * @returns {Observable<R>}
     */
    public getCompetitionFlights(compId: number, round: number): Observable<Flight[]> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getFlights);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId,
            roundNo      : round
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let flights: Array<Flight> = resp.json();
                       flights.forEach(flight => {
                           flight.flightMembers.forEach(fm => {
                               this.configService.deriveFulImageURL(fm, ['photoUrl']);
                           });
                           ConfigurationService.deriveTime(flight, ['startTime']);
                       });
                       return flights;
                   }).catch(Util.handleError);
    }

    public getFlightStatus(competitionId: number, roundNo: number): Observable<CompetitionFlightStatus[]> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getFlightStatus);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            roundNo      : roundNo
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let flightStatusList: CompetitionFlightStatus[] = resp.json();
                       return flightStatusList;
                   });
    }

    /**
     * Gets the active competitions today
     * @param searchString
     * @returns {Observable<R>}
     */
    public getActiveCompetitions(searchString: string): Observable<Competition[]> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getActiveCompetitions);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            searchString: searchString
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let comps: Competition[] = resp.json();
                       comps.forEach(comp => {
                           this.configService.deriveFulImageURL(comp, ['thumbnail', 'imageUrl']);
                       });
                       return comps;
                   });
    }

    /**
     * Search the upcoming competitions
     * @param {string} searchString
     * @param {number} pageNo
     * @param {number} pageSize
     * @returns {Observable<CompetitionList>}
     */
    public searchUpcomingCompetitions(searchString: string, pageNo: number,
        pageSize: number=30): Observable<CompetitionList> {
        let criteria: any = {
            searchText: searchString,
            searchType: 'Upcoming',
            pageNumber: pageNo,
            pageSize: pageSize
        };
        return this._searchCompetitions(criteria);
        // let url = this.configService.getRestApiUrl(RestUrl.competitionService.search);
        // let request = new RemoteRequest(url, RequestMethod.Get,
        //     ContentType.URL_ENCODED_FORM_DATA, criteria);
        // return this.remoteHttp.execute(request)
        //            .map((resp: Response)=>{
        //                let compList: CompetitionList = resp.json();
        //                if(compList && compList.competitions)
        //                    compList.competitions.forEach((compInfo: Competition)=>{
        //                        this.configService.deriveFulImageURL(compInfo, ['thumbnail', 'imageUrl']);
        //                    });
        //                return compList;
        //            });
    }
    public searchAllCompetitions(searchString: string, pageNo: number,
        pageSize: number=30): Observable<CompetitionList> {
        let criteria: any = {
            searchText: searchString,
            searchType: 'All',
            pageNumber: pageNo,
            pageSize: pageSize
        };
        return this._searchCompetitions(criteria);
    }
    private _searchCompetitions(criteria: any): Observable<CompetitionList>{
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.search);
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, criteria);
        return this.remoteHttp.execute(request)
                   .map((resp: Response)=>{
                       let compList: CompetitionList = resp.json();
                       if(compList && compList.competitions)
                           compList.competitions.forEach((compInfo: Competition)=>{
                               this.configService.deriveFulImageURL(compInfo, ['thumbnail', 'imageUrl']);
                           });
                       return compList;
                   });
    }
    public getLeaderboard(competitionId: number, roundNo: number,
        category: number,
        orderBy: number,
        teamEvent: boolean): Observable<LeaderBoard> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getLeaderboard);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            roundNo: roundNo,
            orderBy: orderBy,
            categoryId: category,
            isTeamEvent: teamEvent
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let leaderBorad: LeaderBoard = resp.json();
                       if(leaderBorad && leaderBorad.players){
                           leaderBorad.players.forEach(player=>{
                               this.configService.deriveFulImageURL(player, ['imageURL']);
                           });
                       }
                       return leaderBorad;
                   })
    }
    public getTeamEventScores(competitionId: number,
        grossOrNet?: string): Observable<TeamScores[]> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getTeamScores);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            grossOrNet: grossOrNet
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let teamScoresList: TeamScores[] = resp.json();
                       teamScoresList.forEach(teamScore=>{
                           this.configService.deriveFulImageURL(teamScore, ['teamLogo']);
                           teamScore.playerOveralTotals.forEach(ot=>{
                               this.configService.deriveFulImageURL(ot, ['playerImage', 'thumbnail']);
                           });
                           teamScore.roundScores.forEach(round=>{
                               round.playerScores.forEach(ps=>{
                                   this.configService.deriveFulImageURL(ps, ['playerImage', 'thumbnail']);
                               });
                           })
                       });
                       return teamScoresList;
                   })
    }
    public getAllScoresForPlayer(competitionId: number, playerId: number) {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.getPlayerScores);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            playerId: playerId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let gameRoundScores: CompetitionGameRound[] = resp.json();
                       return gameRoundScores;
                   })
    }

    public getSearchCompetitions(): Observable<Array<Competition>> {
        let url = this.configService.getRestApiUrl(RestUrl.competitionService.searchCompetitions);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA);
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       console.log("get comp list", resp.json)
                       const compInfo: Competition = resp.json();
                    //    this.configService.deriveFulImageURL(compInfo, ['thumbnail', 'imageUrl']);
                       return compInfo;
                   }).catch(Util.handleError);
    }


}