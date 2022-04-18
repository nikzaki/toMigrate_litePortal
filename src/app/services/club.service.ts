import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ConfigurationService} from './configuration.service';
import {Observable} from 'rxjs/Observable';
import {Club} from '../models/mygolf/club/club';
import {RestUrl} from '../models/config/rest-api-url';
import {RequestMethod, Response} from '@angular/http';
import {ContentType, RemoteRequest} from './remote-request';
import {CompetitionList} from '../models/mygolf/competition/competition-list';
import {Util} from '../util';
import {Competition} from '../models/mygolf/competition/competition';
import {ClubList} from '../models/mygolf/club/club-list';
import { ClubCourse } from 'app/models/mygolf/club';
/**
 * Created by ashok on 03/05/17.
 */

@Injectable()
export class ClubService {
    constructor(private remoteHttp: HttpService, private configService: ConfigurationService){
    }

    /**
     * Gets the Club Information for a given club ID
     * @param clubId ID of the club
     * @returns {Observable<R>}
     */
    public getClubInfo(clubId: number): Observable<Club> {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.getClubInfo);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            clubId: clubId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let club: Club = resp.json();
                       this.configService.deriveFulImageURL(club, ['clubImage']);
                       return club;
                   });
    }

    /**
     * Search the clubs matching the given search criteria. The results are paged list of clubs
     * @param searchText The optional filter text to filter the list of competitions
     * @param pageNumber The page number requested
     * @param pageSize The maximum number of competitions in a given page
     * @returns {Observable<R>} Returns the observable on ClubList
     */
    public searchClubs(searchText?: string, pageNumber?: number, pageSize: number = 999) {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.clubList);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            searchText: searchText,
            pageNumber: pageNumber,
            pageSize: pageSize
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let clubList: ClubList = resp.json();
                       clubList.clubs.forEach(club=>{
                           this.configService.deriveFulImageURL(club, ['clubImage']);
                       });
                       return clubList;
                   });
    }

    public searchClubsOpen(searchText?: string, pageNumber?: number, pageSize: number = 999) {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.clubListOpen);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            searchText: searchText,
            pageNumber: pageNumber,
            pageSize: pageSize
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let clubList: any = resp.json();
                       clubList.items.forEach(club=>{
                           this.configService.deriveFulImageURL(club, ['clubImage']);
                       });
                       return clubList;
                   });
    }

    public getCourses(clubId:number, pageNumber?: number, pageSize: number = 999) {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.courseList);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            clubId: clubId,
            // pageNumber: pageNumber,
            // pageSize: pageSize
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let courseList: Array<ClubCourse> = resp.json();
                       courseList.forEach(c=>{
                        //    this.configService.deriveFulImageURL(c, ['clubImage']);
                       });
                       return courseList;
                   });
    }


    public getCourseHandicap(playerId: number,teeBox?: string,firstNineCourse?: number,secondNineCourse?: number, handicapIndex?: number, handicapSystem?: string): Observable<number> {
        let hdrs = {};
        let url = this.configService.getRestApiUrl(RestUrl.playerService.getCourseHandicap);
        hdrs['Player-Id'] = playerId;
        console.log("get handicap history : ", playerId);
        console.log("get handicap history : ", hdrs);
        let params = {};
        params['playerId'] = playerId;
        params['teeBox'] = teeBox;
        params['firstNineCourse'] = firstNineCourse;
        params['secondNineCourse'] = secondNineCourse;
        if(handicapIndex) params['handicapIndex'] = handicapIndex;
        if(handicapSystem) params['handicapSystem'] = handicapSystem;
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, params);
        return this.remoteHttp.execute(req)
        .map((resp: Response)=>{
            let courseHandicap: number = resp.json();

            return courseHandicap;
        });

    }

    public getPlayerCourseHandicapDetails(playerId: number,teeBox?: string,firstNineCourse?: number,secondNineCourse?: number, handicapIndex?: number, handicapSystem?: string): Observable<number> {
        let hdrs = {};
        let url = this.configService.getRestApiUrl(RestUrl.playerService.getPlayerCourseHandicapDetails);
        hdrs['Player-Id'] = playerId;
        console.log("get handicap history : ", playerId);
        console.log("get handicap history : ", hdrs);
        let params = {};
        params['playerId'] = playerId;
        params['teeBox'] = teeBox;
        params['firstNineCourse'] = firstNineCourse;
        params['secondNineCourse'] = secondNineCourse;
        if(handicapIndex) params['handicapIndex'] = handicapIndex;
        if(handicapSystem) params['handicapSystem'] = handicapSystem;
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, params);
        return this.remoteHttp.execute(req)
        .map((resp: Response)=>{
            let courseHandicapDetails: any = resp.json();

            return courseHandicapDetails;
        });

    }

    /**
     * Gets the list of competitions held in a given club. The results are returned in paged manner.
     * @param clubId The ID of the club
     * @param pageNumber The page number requested
     * @param pageSize The maximum number of competitions in a given page.
     * @param searchString The search string to filter the competition lists
     * @returns {Observable<R>} Returns the Observable on CompetitionList object
     */
    public getCompetitions(clubId: number,
        pageNumber: number,
        pageSize: number,
        searchString?: string): Observable<CompetitionList> {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.clubCompetitionList);
        let params = Util.buildSearchParam(pageNumber, pageSize, searchString);
        params['clubId'] = clubId;
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, params);
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let compList: CompetitionList = resp.json();
                       if(compList.competitions && compList.competitions.length){
                           compList.competitions.forEach(c=>{
                               this.configService.deriveFulImageURL(c, ['imageUrl']);
                           });
                       }
                       return compList;
                   }).catch(Util.handleError);
    }

    /**
     * Get active competitions in a given club
     * @param clubId The ID of the club
     * @returns {Observable<R>} Returns an Observable to the array of active competitions.
     */
    public getActiveCompetitions(clubId: number) : Observable<Array<Competition>> {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.clubActiveCompetitions);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            clubId: clubId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response)=>{
                       let compList: Array<Competition> = resp.json();
                       if(compList && compList.length){
                           compList.forEach(c=>{
                               this.configService.deriveFulImageURL(c, ['imageUrl']);
                           });
                       }
                       return compList;
                   }).catch(Util.handleError);
    }

    /**
     * Get active competitions in a given club
     * @param clubId The ID of the club
     * @returns {Observable} Returns an Observable to the club membership.
     */

    public updateClubMemberStatus(clubId: number, playerId: number, mode: string, membership: string): Observable<any> {
        // console.log("Register player : ", clubId, )
        let url          = this.configService.getRestApiUrl(RestUrl.clubOrgService.updateClubMemberStatus);
        let token        = this.configService.getConfig()['registrationToken'] || 'portal';
        // if(_import) token = 'import';
        let _clubId;
        let _playerId;
        let _mode;
        let _membership;

        let _params = {};

        const hdrs = {};

        if(mode === 'approve') _mode = '/approve/';
        else if (mode === 'suspend') _mode = '/suspend/';
        if(playerId) _playerId = playerId;
        if(clubId) _clubId = clubId;
        if(membership) _params['membership'] = membership;
        url = url + "/" + _clubId + _mode + _playerId;
        // playerInfo.nationality = playerInfo.nationality.id;
        // playerInfo.country = playerInfo.country.id;
        let request      = new RemoteRequest(url, RequestMethod.Post,
            ContentType.URL_ENCODED_FORM_DATA, _params, hdrs);
        return this.remoteHttp.execute(request)
                   .map((resp: Response) => {
                       let data: any = resp.json();
                       return data;
                   });
    }
}