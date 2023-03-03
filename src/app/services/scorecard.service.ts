import { LeanScorecard } from './../models/mygolf.data';
/**
 * Created by ashok on 29/06/17.
 */

import {Injectable} from "@angular/core";
import {ConfigurationService} from "./configuration.service";
import {HttpService} from "./http.service";
import {RestUrl} from "../models/config/rest-api-url";
import {Util} from "../util";
import {Response} from "@angular/http";
import {PlainScorecard, PlayerRoundScores} from "../models/mygolf/scorecard";
import {ClubCourse} from "../models/mygolf/club/club-course";
import {ServerResult} from "../models/server-result";
import {Observable} from "rxjs";
import {CourseHole} from '../models/mygolf/club/course-hole';
import {RemoteRequest} from './remote-request';

@Injectable()
export class ScorecardService {

    constructor(private configService: ConfigurationService,
        private remoteHttp: HttpService) {
    }

    /**
     * Get the scorecard for a given player
     * @param competitionId The ID of the competition
     * @param roundNo The round number
     * @param playerId The ID of the player
     */
    public getPlayerScorecard(competitionId: number, roundNo: number, playerId: number): Observable<PlainScorecard> {
        let url = this.configService.getRestApiUrl(RestUrl.scorecardService.getPlayerScorecard);
        let req = RemoteRequest.createGetRemoteRequest(url, {
            competitionId: competitionId,
            roundNo      : roundNo,
            playerId     : playerId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let scorecard: PlainScorecard = resp.json();
                       this.transform(scorecard);
                       return scorecard;
                   }).catch(Util.handleError);
    }

    /**
     * Save the manual scoring
     * @param competitionId
     * @param roundNo
     * @param playerId
     * @param scorecard
     * @returns {Observable<R>}
     */
    public saveManualScoring(competitionId: number, roundNo: number, playerId: number,
        scorecard: PlainScorecard): Observable<ServerResult> {
        scorecard.playerRoundScores.forEach((prs: PlayerRoundScores) => {
            prs.actualStartTime = null;
            prs.startTime       = null;
        });
        let scorecardJson  = JSON.stringify(scorecard);
        let url = this.configService.getRestApiUrl(RestUrl.scorecardService.saveManualScoring);
        let request = RemoteRequest.createPostRequest(url, {
            competitionId: competitionId,
            roundNo      : roundNo,
            playerId     : playerId,
            scorecard: scorecardJson
        });
        return this.remoteHttp.execute(request)
                   .map((resp: Response)=>{
                       let result: ServerResult = resp.json();
                       return result;
                   }).catch(Util.handleError);
    }
    public  transform(sc: PlainScorecard) {
        ConfigurationService.deriveDates(sc, ["playedOn"]);
        if (sc.courses)
            sc.courses.forEach((ci: ClubCourse) => {
                this.configService.deriveFulImageURL(ci, ["photoUrl"]);
                ci.holes.forEach((h: CourseHole) => {
                    this.configService.deriveFulImageURL(h, ["holeImage"]);
                });
            });
        if (sc.playerRoundScores)
            sc.playerRoundScores.forEach((prs: PlayerRoundScores) => {
                this.configService.deriveFulImageURL(prs, ["photoUrl"]);
                this.configService.deriveFulImageURL(prs, ["thumbnail"]);
                ConfigurationService.deriveTime(prs, ["actualStartTime", "startTime"]);
            });
    }


    
    public saveScorecard(competitionId: number, roundNo: number, playerId: number,
        scorecard: LeanScorecard): Observable<ServerResult> {
        // scorecard.playerRoundScores.forEach((prs: PlayerRoundScores) => {
        //     prs.actualStartTime = null;
        //     prs.startTime       = null;
        // });
        let hdrs = {};
        //  = {
        //     'Player-Id': playerId,

        // }
        
        if (playerId) hdrs["Player-Id"] = playerId;
        let scorecardJson  = JSON.stringify(scorecard);
        let url = this.configService.getRestApiUrl(RestUrl.scorecardService.competitionScorecardSync);
        let request = RemoteRequest.createPostRequest(url, {
            competitionId: competitionId,
            roundNo      : roundNo,
            playerId     : playerId,
            scorecard: scorecardJson,
            compressed: true
        }, hdrs);
        return this.remoteHttp.execute(request)
                   .map((resp: Response)=>{
                       let result: ServerResult = resp.json();
                       return result;
                   }).catch(Util.handleError);
    }
}
