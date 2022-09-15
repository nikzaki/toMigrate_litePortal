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
import { PlayerInfo } from 'app/models/mygolf.data';
import * as moment from 'moment';
/**
 * Created by ashok on 02/05/17.
 */
@Injectable()
export class PlayerService {
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
    public registerPlayer(playerInfo: any, _import?: boolean, admin?: boolean): Observable<Player> {
        console.log("Register player : ", playerInfo)
        let url          = this.configService.getRestApiUrl(RestUrl.playerService.registerPlayer);
        let token        = this.configService.getConfig()['registrationToken'] || 'portal';
        // if(_import) token = 'import';
        playerInfo.token = token;
        const hdrs = {};
        if(admin) {
            hdrs['Player-Id'] = null;
        }
        if(playerInfo.nationality && playerInfo.nationality.id) playerInfo.nationality = playerInfo.nationality.id;
        if(playerInfo.country && playerInfo.country.id) playerInfo.country = playerInfo.country.id;
        // playerInfo.nationality = playerInfo.nationality.id;
        // playerInfo.country = playerInfo.country.id;
        let request      = new RemoteRequest(url, RequestMethod.Post,
            ContentType.URL_ENCODED_FORM_DATA, playerInfo, hdrs);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let playerInfo: Player = resp.json();
                       return playerInfo;
                   });
    }

    public updateClubMembership(playerInfo: any, clubId?: number, dateJoined?: string): Observable<Player> {
        let url          = this.configService.getRestApiUrl(RestUrl.playerService.updateClubMembership);
        // let token        = this.configService.getConfig()['registrationToken'] || 'portal';
        // playerInfo.token = token;
        console.log("update club service : ", playerInfo)
        console.log("update club service : ", clubId)
        const hdrs = {};
        hdrs['Player-Id'] = playerInfo.playerId;
        let request      = new RemoteRequest(url, RequestMethod.Post,
            ContentType.URL_ENCODED_FORM_DATA, {
                clubId: clubId,
                membershipNumber: playerInfo.membership,
                homeClub: true,
                joinedDate: moment().format("YYYY-MM-DD")
            }, hdrs);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let clubMemberInfo: any = resp.json();
                       return clubMemberInfo;
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
        pageNumber: number, pageSize?: number): Observable<PlayerList> {
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

    public getPlayerByEmail(email: string): Observable<Player> {
        let url     = this.configService.getRestApiUrl(RestUrl.playerService.getPlayerByEmail);
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, {
                email: email
            });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let playerInfo: Player = resp.json();
                       this.configService.deriveFulImageURL(playerInfo, ['photoUrl']);
                       this.configService.deriveFulImageURL(playerInfo, ['thumbnail'])
                       return playerInfo;
                   });
    }

    public getPlayerById(playerId: number): Observable<PlayerInfo> {
        let url     = this.configService.getRestApiUrl(RestUrl.playerService.getPlayerById);
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, {
                playerId: playerId
            });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let playerInfo: PlayerInfo = resp.json();
                       this.configService.deriveFulImageURL(playerInfo, ['photoUrl']);
                       this.configService.deriveFulImageURL(playerInfo, ['thumbnail'])
                       return playerInfo;
                   });
    }

    public movePlayerData(fromPlayerId: number, toPlayerId: number,
            deleteFromPlayer: boolean, sendEmail: boolean, authToken: string): Observable<ServerResult> {
        let url     = this.configService.getRestApiUrl(RestUrl.playerService.movePlayerData);
        let hdrs = {};
        if(authToken) hdrs['X-AUTH-TOKEN'] = authToken;
        hdrs['Player-Id'] = null;
        let request = RemoteRequest.createPostRequest(url, {
            playerIdFrom    : fromPlayerId,
            playerIdTo      : toPlayerId,
            deleteFromPlayer: deleteFromPlayer,
            sendEmail: sendEmail
        },hdrs);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let result: ServerResult = resp.json();
                       return result;
                   });
    }

    public getCountryList(): Observable<Array<any>> {
        let url = this.configService.getRestApiUrl(RestUrl.playerService.getCountryList);
        console.log("url ", url)
        console.log("url", RestUrl.playerService.getCountries)
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let countryList: any = resp.json();
                       return countryList;
                   });
    }

    public getClubMembership(playerId: number): Observable<Array<any>> {
        let url = this.configService.getRestApiUrl(RestUrl.playerService.getClubMembership);
        // console.log("url ", url)
        // console.log("url", RestUrl.playerService.getCountries)
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA, '', {
                'Player-Id': playerId
            });
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let clubMembership: any = resp.json();
                       return clubMembership;
                   });
    }

    public getTeeBox(): Observable<Array<any>> {
        let url = this.configService.getRestApiUrl(RestUrl.playerService.getTeeBox);
        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.URL_ENCODED_FORM_DATA);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let teeBox: any = resp.json();
                       return teeBox;
                   });
    }


    public updatePlayerProfile(playerInfo: any): Observable<Player> {
        let url          = this.configService.getRestApiUrl(RestUrl.playerService.updatePlayerProfile);
        // let token        = this.configService.getConfig()['registrationToken'] || 'portal';
        // playerInfo.token = token;
        console.log("update player service : ", playerInfo)
        const hdrs = {};
        hdrs['Player-Id'] = playerInfo.playerId;
        let request      = new RemoteRequest(url, RequestMethod.Post,
            ContentType.URL_ENCODED_FORM_DATA, {
                handicapIndex: playerInfo.handicapIndex,
            }, hdrs);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let playerInfo: any = resp.json();
                       return playerInfo;
                   });
    }

    public downloadImportFile(format?: string) {
        let url = this.configService.getRestApiUrl(RestUrl.playerImport.downloadTemplateXLS);
        if(format === 'xlsx')
            url = this.configService.getRestApiUrl(RestUrl.playerImport.downloadTemplateXLSX);

        let request = new RemoteRequest(url, RequestMethod.Get,
            ContentType.JSON);
        return this.remoteHttp.execute(request)
                   .map((resp: any) => {
                       let file: any = resp.json();
                       return resp;
                   });
    }

    public submitProcessImportInstance(instanceId: number, password?: string, approveMembership?: boolean): Observable<any> {
        let url          = this.configService.getRestApiUrl(RestUrl.playerImport.submitInstance);
        // let token        = this.configService.getConfig()['registrationToken'] || 'portal';


        let _params = {};
        if(password) _params['password'] = password;
        if(approveMembership) _params['approveMembership'] = approveMembership;
        
        let reInstanceId = /:importInstance/gi;
        let reMembership = /:membershipId/gi;
        
        url = url.replace(reInstanceId, String(instanceId));
        let request      = new RemoteRequest(url, RequestMethod.Post,
            ContentType.URL_ENCODED_FORM_DATA, _params);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let data: any = resp.json();
                       return data;
                   });
    }

    // public updatePlayerProfile(player: PlayerInfo): Observable<boolean> {
    //     console.log("[teebox] player home action calling playre service : ", player)
    //     return this.playerService.updatePlayerProfile(player.email,
    //         player.firstName, player.lastName, player.gender,
    //         player.teeOffFrom, player.handicap, player.phone,
    //         moment(player.birthdate,).format("YYYY-MM-DD"), player.playerId, player.countryId, player.nationalityId)
    //         .map((result: ServerResult)=>{
    //             if(result.success){
    //                 player.playerName = player.firstName + ((player.lastName)?(' ' + player.lastName):'');
    //                 if(!updatingFriendProfile){
    //                     this.store.dispatch(createAction(PlayerHomeActions.UPDATE_PLAYER_PROFILE, player));
    //                     this.setNeedRefresh(true);
    //                 }
    //             }
    //             return result.success;
    //         });
    // }



}