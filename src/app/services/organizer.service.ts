import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ConfigurationService} from './configuration.service';
import {Observable} from 'rxjs/Observable';
import {RestUrl} from '../models/config/rest-api-url';
import {Organizer} from '../models/mygolf/organizer/organizer';
import {RequestMethod, Response} from '@angular/http';
import {ContentType, RemoteRequest} from './remote-request';
import {Util} from '../util';
import {Competition} from '../models/mygolf/competition/competition';
import {OrganizerList} from '../models/mygolf/organizer/organizer-list';
import {CompetitionList} from '../models/mygolf/competition/competition-list';
/**
 * Created by ashok on 02/05/17.
 */
@Injectable()
export class OrganizerService {
    constructor(private remoteHttp: HttpService,
        private configService: ConfigurationService) {
    }

    /**
     * Gets a organizer
     * @param organizerId
     * @returns {Observable<R>}
     */
    public getOrganizerInfo(organizerId: number): Observable<Organizer> {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.getOrganizerInfo);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            organizerId: organizerId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let organizer: Organizer = resp.json();
                       this.configService.deriveFulImageURL(organizer, ['organizerImage']);
                       ConfigurationService.deriveDates(organizer, ['dateJoined', 'createdOn']);
                       return organizer;
                   });
    }

    /**
     * Get the organizer competitions
     * @param organizerId
     * @param pageNumber
     * @param pageSize
     * @param searchString
     * @returns {Observable<R>}
     */
    public getOrganizerCompetitions(organizerId: number, pageNumber: number,
        pageSize: number,
        searchString?: string): Observable<CompetitionList> {
        let url               = this.configService.getRestApiUrl(RestUrl.clubOrgService.organizerCompetitionList);
        let params            = Util.buildSearchParam(pageNumber, pageSize, searchString);
        params['organizerId'] = organizerId;
        let req               = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, params);
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let compList: CompetitionList = resp.json();
                       if (compList.competitions && compList.competitions.length) {
                           compList.competitions.forEach(c => {
                               this.configService.deriveFulImageURL(c, ['imageUrl']);
                           });
                       }
                       return compList;
                   }).catch(Util.handleError);
    }

    /**
     * Get active competitions of a given organizer
     * @param organizerId
     * @returns {Observable<R|T>}
     */
    public getActiveCompetitions(organizerId: number) {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.organizerActiveCompetitions);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            organizerId: organizerId
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let compList: Array<Competition> = resp.json();
                       if (compList && compList.length) {
                           compList.forEach(c => {
                               this.configService.deriveFulImageURL(c, ['imageUrl']);
                           });
                       }
                       return compList;
                   }).catch(Util.handleError);
    }

    /**
     * Search Organizers. This should be available only for myGolf admin screen
     * @param searchText
     * @param pageNumber
     * @param pageSize
     * @returns {Observable<R>}
     */
    public searchOrganizers(searchText: string, pageNumber: number, pageSize: number = 999): Observable<OrganizerList> {
        let url = this.configService.getRestApiUrl(RestUrl.clubOrgService.organizerList);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            searchText: searchText,
            pageNumber: pageNumber,
            pageSize  : pageSize
        });
        return this.remoteHttp.execute(req)
                   .map((resp: Response) => {
                       let orgList: OrganizerList = resp.json();
                       orgList.organizers.forEach(org => {
                           this.configService.deriveFulImageURL(org, ['organizerImage']);
                           ConfigurationService.deriveDates(org, ['createdOn', 'dateJoined']);
                       });
                       return orgList;
                   });
    }
}