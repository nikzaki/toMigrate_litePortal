import {Injectable} from '@angular/core';
import {ConfigurationService} from './configuration.service';

import {Observable} from 'rxjs/Observable';
import {AdvertisementList, Advertisement} from '../models/mygolf/advertisement';
import {RemoteRequest, ContentType} from './remote-request';
import {RequestMethod, Response, Headers} from '@angular/http';
import {ServerResult} from '../models/server-result';
import {HttpService} from './http.service';
import {RestUrl} from '../models/config/rest-api-url';

@Injectable()
export class AdvertisementService {
    constructor(private configService: ConfigurationService,
        private http: HttpService) {
    }

    /**
     * Search the ads defined
     * @param {string} searchString The filter text applied on ad name and company name
     * @param {string} activeType valid values 'active', 'inactive' and 'both'
     * @param includeExpired Whether to include expire ads in the result
     * @param {number} pageNo The page number
     * @param {number} pageSize maximum number of ads to return in one page
     * @returns {Observable<AdvertisementList>}
     */
    public searchAds(searchString: string, activeType: string, includeExpired: boolean,
        pageNo: number, pageSize: number): Observable<AdvertisementList> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.searchAds);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            searchString  : searchString,
            activeType    : activeType,
            includeExpired: includeExpired,
            pageNumber        : pageNo,
            pageSize      : pageSize
        });
        return this.http.execute(req)
                   .map((response: Response) => {
                       let adList: AdvertisementList = response.json();
                       //Process the images and dates
                       if (adList && adList.advertisements) {
                           this.processAdList(adList.advertisements);
                           // adList.advertisements.forEach(ad => {
                           //     this.updateImageUrl(ad);
                           //     this.configService.deriveFulImageURL(ad, ['imageUrl']);
                           //     let useIn: any = ad["useIn"];
                           //     ad.useIn = useIn.split(',');
                           // });
                       }
                       return adList;
                   });
    }

    /**
     * Search ads associated with given organizer
     * @param {number} organizerId The ID of the organizer
     * @param {string} searchString for this and rest of the parameters Refer to {@link Advertisement.searchAds}
     * @param {string} activeType
     * @param {boolean} includeExpired
     * @param {number} pageNo
     * @param {number} pageSize
     * @returns {Observable<AdvertisementList>}
     */
    public searchOrganizerAds(organizerId: number,
        searchString: string, activeType: string, includeExpired: boolean,
        pageNo: number, pageSize: number): Observable<AdvertisementList> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.searchOrganizerAds);

        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            organizerId   : organizerId,
            searchString  : searchString,
            activeType    : activeType,
            includeExpired: includeExpired,
            pageNumber        : pageNo,
            pageSize      : pageSize
        });
        return this.http.execute(req)
                   .map((response: Response) => {
                       let adList: AdvertisementList = response.json();
                       //Process the images and dates
                       if (adList && adList.advertisements) {
                           this.processAdList(adList.advertisements);
                           // adList.advertisements.forEach(ad => {
                           //     this.updateImageUrl(ad);
                           //     this.configService.deriveFulImageURL(ad, ['imageUrl']);
                           //     let useIn: any = ad["useIn"];
                           //     ad.useIn = useIn.split(',');
                           // });
                       }
                       return adList;
                   });
    }
    /**
     * search the ads associated to the competition directly. This doesn't include the
     * competitions indirectly associated to organizers with auto_include = 'Y'
     * @param {number} competitionId The Id of the competition for which ads are returned
     * @param {string} searchString The filtering text on name and company name
     * @param {string} activeType valid values 'active', 'inactive' and 'both'
     * @param {boolean} includeExpired Whether to include expire ads in the result
     * @returns {Observable<Advertisement[]>}
     */
    public searchCompetitionAds(competitionId: number, searchString: string,
            activeType: string, includeExpired: boolean): Observable<Array<Advertisement>> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.searchCompetitionAds);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            searchString  : searchString,
            activeType    : activeType,
            includeExpired: includeExpired
        });
        return this.http.execute(req)
                   .map((response: Response) => {
                       let adList: Advertisement[] = response.json();
                       //Process the images and dates
                       this.processAdList(adList);
                       return adList;
                   })
    }

    /**
     * Search the advertisements which can be associated to a given competition.
     * The competitons already associated are excluded from the list
     * @param {number} competitionId The ID of the competition.
     * @param {string} searchString Search string to filter the matching competitions
     * @param {number} pageNo
     * @param {number} pageSize
     * @returns {Observable<any>}
     */
    public searchForCompetition(competitionId: number, searchString: string,
        pageNo: number, pageSize?: number): Observable<AdvertisementList> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.searchForCompetition);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            searchString: searchString,
            pageNumber: pageNo,
            pageSize: pageSize
        });
        return this.http.execute(req)
            .map((resp: Response)=>{
                let adList: AdvertisementList = resp.json();
                if(adList && adList.advertisements)
                    this.processAdList(adList.advertisements);
                return adList;
            })
    }

    /**
     * Search the advertisements which can be associated to a given organizer.
     * The competitons already associated are excluded from the list
     * @param {number} organizerId The ID of the organizer.
     * @param {string} searchString Search string to filter the matching competitions
     * @param {number} pageNo
     * @param {number} pageSize
     * @returns {Observable<any>}
     */
    public searchForOrganizer(organizerId: number, searchString: string,
        pageNo: number, pageSize?: number): Observable<AdvertisementList> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.searchForOrganizer);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            organizerId: organizerId,
            searchString: searchString,
            pageNumber: pageNo,
            paegeSize: pageSize
        });
        return this.http.execute(req)
                   .map((resp: Response)=>{
                       let adList: AdvertisementList = resp.json();
                       if(adList && adList.advertisements)
                           this.processAdList(adList.advertisements);
                       return adList;
                   })
    }

    public createAd(formData: any): Observable<Advertisement> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.createAd);
        return this._saveAd(formData, url);
    }
    public updateAd(formData: any): Observable<Advertisement> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.updateAd);
        return this._saveAd(formData, url);
    }

    /**
     * Deletes a given AD with id
     * @param {number} adId The ID of the AD to delete
     * @returns {Observable<ServerResult>}
     */
    public deleteAd(adId: number): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.deleteAd);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            adId: adId
        });
        return this.http.execute(req)
            .map((resp: Response)=>{
                return resp.json();
            });
    }

    public associateAdToCompetition(competitionId: number,
            adId: number,
            displayPeriod?: number,
            rank?: number): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.addCompetitionAd);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA,{
            competitionId: competitionId,
            adId: adId,
            displayPeriod: displayPeriod,
            rank: rank
        });
        return this.http.execute(req)
            .map((resp:Response)=>{
                return resp.json();
            })
    }
    public removeAdFromCompetition(competitionId: number, adId: number): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.deleteCompetitionAd);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA,{
            competitionId: competitionId,
            adId: adId
        });
        return this.http.execute(req)
                   .map((resp:Response)=>{
                       return resp.json();
                   })
    }
    public associateAdToOrganizer(organizerId: number,
        adId: number, displayPeriod?: number,
        rank?: number): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.addOrganizerAd);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA,{
            organizerId: organizerId,
            adId: adId,
            displayPeriod: displayPeriod,
            rank: rank
        });
        return this.http.execute(req)
                   .map((resp:Response)=>{
                       return resp.json();
                   })
    }
    public removeAdFromOrganizer(organizerId: number, adId: number): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.advertisement.deleteOrganizerAd);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA,{
            organizerId: organizerId,
            adId: adId
        });
        return this.http.execute(req)
            .map((resp: Response)=>{
                return resp.json();
            })
    }
    private _saveAd(formData: any, url: string): Observable<Advertisement> {
        let headers: Headers = new Headers();
        headers.set("Accept", "application/json");

        return this.http.post(url, formData, headers)
                   .map((resp: Response)=>{
                       let ad: Advertisement = resp.json();
                       this.updateImageUrl(ad);
                       this.configService.deriveFulImageURL(ad, ['imageUrl']);
                       let useIn: any = ad["useIn"];
                       ad.useIn = useIn.split(',');
                       return ad;
                   })
    }
    private processAdList(adList: Advertisement[]) {
        if (adList && adList.length) {
            adList.forEach(ad => {
                this.updateImageUrl(ad);
                this.configService.deriveFulImageURL(ad, ['imageUrl']);
                let useIn: any = ad["useIn"];
                ad.useIn = useIn.split(',');

            });
        }
    }
    private updateImageUrl(ad: Advertisement) {
        if(ad.imageUrl && ad.updateCounter)
            ad.imageUrl = ad.imageUrl + '?counter=' + ad.updateCounter;
    }
}