import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ConfigurationService} from './configuration.service';
import {Observable} from 'rxjs/Observable';
import {DeviceList, MobileDevice} from '../models/mygolf/mobile-device';
import {RemoteRequest, ContentType} from './remote-request';
import {RequestMethod, Response} from '@angular/http';
import {RestUrl} from '../models/config/rest-api-url';
import * as moment from 'moment';
import {ServerResult} from '../models/server-result';


/**
 * Created by ashok on 03/07/17.
 */

@Injectable()
export class DeviceService {
    constructor(private http: HttpService, private configService: ConfigurationService) {
    }

    public searchDevices(searchText: string, platformType: string,
        activeOnOrAfter: Date, pageNo: number, pageSize: number): Observable<DeviceList> {
        let data: any = {
            searchText  : searchText,
            platformType: platformType,
            pageSize    : pageSize,
            pageNumber  : pageNo
        };
        if (activeOnOrAfter) {
            data.activeAfter = moment(activeOnOrAfter).format('YYYY-MM-DD HH:mm:ss');
        }
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.searchDevices);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, data);
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let deviceList: DeviceList = resp.json();
                       if (deviceList && deviceList.deviceList) {
                           deviceList.deviceList.forEach(device => {
                               ConfigurationService.deriveDates(device, ['lastActive']);
                           });
                       }
                       return deviceList;
                   });
    }

    /**
     * Updates the device information in the database
     * @param deviceInfo
     * @returns {Observable<R>}
     */
    public updateDevice(deviceInfo: MobileDevice): Observable<MobileDevice> {
        let url      = this.configService.getRestApiUrl(RestUrl.deviceService.updateDevice);
        let toUpdate = Object.assign({}, deviceInfo);
        delete toUpdate.lastActive;
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, toUpdate);
        return this.http.execute(req)
                   .map((resp: Response) => {
                       return <MobileDevice> resp.json();
                   });
    }

    public getDeviceInfo(deviceId: string): Observable<MobileDevice> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.getDevice);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            deviceId: deviceId
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let result: MobileDevice = resp.json();
                       ConfigurationService.deriveDates(result, ['lastActive']);
                       return result;
                   });
    }

    public addToFavorites(devices: string): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.addToFavorites);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            devices: devices
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let result: ServerResult = resp.json();
                       return result;
                   });
    }

    public removeFromFavorites(devices: string): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.removeFromFavorites);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            devices: devices
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let result: ServerResult = resp.json();
                       return result;
                   });
    }

    public updateFavoriteDevices(devices: string): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.updateFavorites);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            devices: devices
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let result: ServerResult = resp.json();
                       return result;
                   });
    }

    public listFavorites(): Observable<MobileDevice[]> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.listFavorites);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {});
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let result: MobileDevice [] = resp.json();
                       return result;
                   });
    }

    public identifyDevice(deviceId: string): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.identify);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            deviceId: deviceId
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       return resp.json();
                   });
    }

    public startDevices(competitionId: number, roundNumber: number,
        assignments: any[],
        userId: string, password: string): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.startDevices);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            roundNo      : roundNumber,
            userId       : userId,
            password     : password,
            assignments  : JSON.stringify(assignments)
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       return resp.json();
                   })
    }
    public logoutDevice(competitionId: number, roundNo: number, scorerId: number,
        deviceId: string): Observable<ServerResult> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.logout);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: competitionId,
            roundNo: roundNo,
            scorerId: scorerId,
            deviceId: deviceId
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       return resp.json();
                   })
    }
    public getCompetitionLocks(compId: number, roundNumber: number): Observable<any[]> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.compLocks);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId,
            roundNo      : roundNumber
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let result: any [] = resp.json();
                       return result;
                   })
    }

    /**
     * Gets the device assignments for a given competition round
     * @param compId The ID of the competition
     * @param roundNumber The round number
     * @returns {Observable<R>}
     */
    public getDeviceAssignments(compId: number, roundNumber: number): Observable<any[]> {
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.deviceAssignments);
        let req = new RemoteRequest(url, RequestMethod.Get, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId,
            roundNo      : roundNumber
        });
        return this.http.execute(req)
                   .map((resp: Response) => {
                       let result: any [] = resp.json();
                       return result;
                   })
    }

    public assignDevices(compId: number, roundNumber: number, assignments: any[]): Observable<any[]>  {
        let jsonStr = JSON.stringify(assignments);
        let url = this.configService.getRestApiUrl(RestUrl.deviceService.assignDevices);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId,
            roundNo      : roundNumber,
            assignments: jsonStr
        });

        return this.http.execute(req)
                   .map((resp: Response)=>{
                       let result: any [] = resp.json();
                       return result;
                   })
    }

    public removeAssignment(compId: number, roundNumber: number, scorerId: number): Observable<any[]> {

        let url = this.configService.getRestApiUrl(RestUrl.deviceService.removeAssignment);
        let req = new RemoteRequest(url, RequestMethod.Post, ContentType.URL_ENCODED_FORM_DATA, {
            competitionId: compId,
            roundNo      : roundNumber,
            scorerId: scorerId
        });

        return this.http.execute(req)
                   .map((resp: Response)=>{
                       let result: any [] = resp.json();
                       return result;
                   })
    }
}