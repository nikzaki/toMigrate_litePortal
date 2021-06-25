import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RestUrl} from '../models/config/rest-api-url';
import {isPresent} from '../util';
import * as moment from 'moment';
import {ServerConfig} from '../models/config/server-config';
@Injectable()
export class ConfigurationService {
    config: ServerConfig;

    public static deriveTime(obj: any, fldNames: Array<string>) {
        if (isPresent(obj) && isPresent(fldNames) && fldNames.length) {
            for (const fldName of fldNames) {
                const timeObj: any = obj[fldName];
                if (isPresent(timeObj)) {
                    const time = new Date();
                    time.setHours(timeObj['hour']);
                    time.setMinutes(timeObj['minute']);
                    time.setSeconds(timeObj['second']);
                    obj[fldName] = time;
                }

            }

        }
    }
    /**
     * Converts the date in string from in an given object to proper date object and
     * sets the same field
     * @param obj The object with date fields
     * @param dateFields The array field names which are dates
     */
    public static deriveDates(obj: any, dateFields: Array<string>) {
        if (isPresent(obj) && isPresent(dateFields) && dateFields.length) {
            dateFields.forEach(field => {
                if (obj.hasOwnProperty(field)) {
                    const val = obj[field];
                    if (isPresent(val) && val instanceof Date) {
                        try {
                            obj[field] = moment(val).toDate();
                            // new Date(val);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                }
            });
        }
    }
    constructor(private http: Http) {

    }

    public init(): Observable<ServerConfig> {
        return this.http.get('config/configuration.json')
                   .map((resp: Response) => {
                       this.config = resp.json();
                       return this.config;
                   });
    }

    /**
     * Returns the config object
     * @returns {any}
     */
    public getConfig(): ServerConfig {
        return this.config;
    }

    /**
     * Gets the REST API Url
     * @param relativeUrl
     * @returns {string}
     */
    public getRestApiUrl(relativeUrl: string): string {
        if (this.config) {
            // console.log("getRestApiUrl : ",this.config.serverRoot + RestUrl.restBase + relativeUrl)
            return this.config.serverRoot + RestUrl.restBase + relativeUrl;
        } else {
            return '/rest' + relativeUrl;
        }
    }

    /**
     * Gets the absolute URL for a given relative url
     * @param relativeUrl The relative url
     * @returns {string} The absolute url
     */
    public getUrl(relativeUrl: string): string {
        if (this.config) {
            console.log("getURL : ", this.config.serverRoot + relativeUrl)
            return this.config.serverRoot + relativeUrl;
        }
            
        else return relativeUrl;
    }

    /**
     * Derives the full image URLs
     * @param obj The object which needs image urls to be adjusted
     * @param fldNames
     */
    public deriveFulImageURL(obj: any, fldNames: Array<string>) {
        fldNames.forEach((fldName) => {
            if (isPresent(obj) && isPresent(fldName) && obj.hasOwnProperty(fldName)) {
                const val: string = obj[fldName];
                if (isPresent(val) && val.indexOf(this.config.serverRoot) < 0)
                    obj[fldName] = this.config.serverRoot + '/' + val;

            }
        });
    }


    public setLocaleId() {
        if (window.navigator && window.navigator.language) {
            console.log('Browser language ' + window.navigator.language);
            return window.navigator.language;
        } else {
            console.error('Browser language can\'t be detected. Setting to default en-GB');
            return 'en-GB';
        }
    }

    /**
     * This is called by APP_INITIALIZER before the APP is bootstrapped
     * @returns {Promise<T>}
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('config/configuration.json')
                .map(res => res.json())
                .catch((error: any): any => {
                    console.log('Configuration file "configuration.json" could not be read');
                    resolve(true);
                    return Observable.throw(error.json().error || 'Server error');
                }).subscribe((config) => {
                this.config = config;
                resolve(true);
            });

        });
    }

    public getServerRoot() {
        if(this.config) {
            return this.config.serverRoot
        }
    }
}
