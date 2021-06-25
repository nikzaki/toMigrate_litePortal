import {Injectable} from '@angular/core';
import {ConfigurationService} from './configuration.service';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {RestUrl} from '../models/config/rest-api-url';
import {RequestMethod, Response} from '@angular/http';
import {ContentType, RemoteRequest} from './remote-request';
import {Player} from '../models/mygolf/player/player';
import {Util} from '../util';
import {PlayerList} from '../models/mygolf/player/player-list';
import {ServerResult} from '../models/server-result';
// import {HandicapCalculation, ClubHandicap} from '../models/mygolf/handicap-history';
import { HandicapSystem, HandicapCalculation, ClubHandicap } from 'app/models/mygolf.data';
/**
 * Created by ashok on 02/05/17.
 */
@Injectable()
export class HandicapService {
    constructor(private remoteHttp: HttpService,
        private configService: ConfigurationService) {
    }

    /**
     * Checks whether the email is already used by the myGolf
     * @param email
     * @returns {Observable<R>}
     */
    public isEmailUsed(email: string): Observable<boolean> {
        let url     = this.configService.getRestApiUrl(RestUrl.playerService.isEmailUsed);
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, {
                email: email
            });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let result: boolean = resp.json();
                       return result;
                   });
    }

    /**
     * Registers a player with myGolf2u
     * @param playerInfo The info of the given player.
     */
    public registerPlayer(playerInfo: any): Observable<Player> {
        let url          = this.configService.getRestApiUrl(RestUrl.playerService.registerPlayer);
        let token        = this.configService.getConfig()['registrationToken'] || 'portal';
        playerInfo.token = token;
        let request      = new RemoteRequest(url, RequestMethod.Post,
            ContentType.URL_ENCODED_FORM_DATA, playerInfo);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let playerInfo: Player = resp.json();
                       return playerInfo;
                   });
    }

    /**
     * Search the players based on the search string
     * @param searchString The filtering search string
     * @param onlyActive Specify whether to find only active player
     * @param pageNumber The page number
     * @param pageSize The page size
     * @returns {Observable<R>}
     */
    public searchPlayers(searchString: string, onlyActive: boolean,
        pageNumber: number, pageSize: number): Observable<PlayerList> {
        let url = this.configService.getRestApiUrl(RestUrl.playerService.searchPlayers);
        let req = RemoteRequest.createGetRemoteRequest(url, {
            searchText: searchString,
            activeOnly: onlyActive,
            pageNumber: pageNumber,
            pageSize  : pageSize
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let playerList: PlayerList = resp.json();
                       playerList.players.forEach(player => {
                           this.configService.deriveFulImageURL(player, ['photoUrl', 'thumbnail']);
                           ConfigurationService.deriveDates(player, ['birthdate', 'dateJoined']);
                       });
                       return playerList;
                   });
    }

    /**
     * Gets Player Info
     * @param playerId
     * @returns {Observable<R>}
     */
    public getPlayerInfo(playerId: number): Observable<Player> {
        let url     = this.configService.getRestApiUrl(RestUrl.playerService.playerInfo);
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, {
                playerId: playerId
            });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let playerInfo: Player = resp.json();
                       this.configService.deriveFulImageURL(playerInfo, ['photoUrl']);
                       return playerInfo;
                   });
    }

    public movePlayerData(fromPlayerId: number, toPlayerId: number,
            deleteFromPlayer: boolean, sendEmail: boolean): Observable<ServerResult> {
        let url     = this.configService.getRestApiUrl(RestUrl.playerService.movePlayerData);
        let request = RemoteRequest.createPostRequest(url, {
            playerIdFrom    : fromPlayerId,
            playerIdTo      : toPlayerId,
            deleteFromPlayer: deleteFromPlayer,
            sendEmail: sendEmail
        });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let result: ServerResult = resp.json();
                       return result;
                   });
    }


    public getPlayerHcpList(playerId?: number): Observable<Array<HandicapCalculation>> {
        // playerId = 199;
        const hdrs = {};
        hdrs['Player-Id'] = playerId;
        let url     = this.configService.getRestApiUrl(RestUrl.handicapService.getPlayerHcpList);
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, '', hdrs);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                    let handicapCalc: Array<HandicapCalculation> = resp.json();
                    handicapCalc.forEach((hcp: HandicapCalculation)=>{
                        this.configService.deriveFulImageURL(hcp.player, ['photoUrl']);
                        // console.log("p photo", hcp.player)
                    })
                        
                    console.log("getplayerhcplist : ", resp.json())
                       return handicapCalc;
                   });
    }

    public getClubHandicap(playerId: number): Observable<Array<ClubHandicap>> {
        let url = this.configService.getRestApiUrl(RestUrl.handicapService.getClubHandicap);
        // console.log("url ", url)
        // console.log("url", RestUrl.playerService.getCountries)
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, {
                playerId: playerId
            });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let clubHandicap: any = resp.json();
                       return clubHandicap;
                   });
    }

    public getHandicapSystemList(): Observable<Array<HandicapSystem>> {
        let url = this.configService.getRestApiUrl(RestUrl.handicapService.getHandicapSystemList);
        // console.log("url ", url)
        // console.log("url", RestUrl.playerService.getCountries)
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       console.log("handicap system : ", resp)
                       let handicapSystem: Array<HandicapSystem> = resp.json();
                       return handicapSystem;
                   });
    }

    public getPlayerDefaultHcpSystem(playerId: number): Observable<any> {
        let url = this.configService.getRestApiUrl(RestUrl.handicapService.getPlayerDefHandicapSystem);
        if(playerId) url  = url + "/" + playerId;
        // console.log("url ", url)
        // console.log("url", RestUrl.playerService.getCountries)
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                    //    console.log("response : ", resp.json())
                       let defHandicapSystem = resp; //resp.json();
                       return defHandicapSystem;
                   });
    }

    public getPlayerHcpIdx(playerId: number, handicapSystem: string): Observable<any> {
        let url = this.configService.getRestApiUrl(RestUrl.handicapService.getPlayerHcpIdx);
        if(playerId) url  = url + "/" + playerId;
        // console.log("url ", url)
        // console.log("url", RestUrl.playerService.getCountries)
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, {
                handicapSystem: handicapSystem
            });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let data: any = resp.json();
                       return data;
                   });
    }


}