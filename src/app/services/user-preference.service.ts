import {Injectable, OnInit, OnDestroy} from '@angular/core';
import {SessionService} from '../redux/session/session.service';
import {User} from '../models/session/user';
import {Subscription} from 'rxjs/Subscription';
import {Session} from '../models/session/session';

@Injectable()
export class UserPreferenceService {
    private userSubscription: Subscription;
    private prefKeyPrefix: string = 'mygolf.';
    private userPrefSession: any;
    private userPref: any;

    private currentKey: string;
    constructor(private sessionService: SessionService) {
        console.log("User preference service constructed");
        this.sessionService.getSession()
            .distinctUntilChanged()
            .subscribe((session: Session) => {
                if (session.userInfo && session.userInfo.userId) {
                    console.log('Reading preference for user ' + session.userInfo.userName);
                    this.currentKey = this.prefKey(session.userInfo.userId);
                    let str1 = sessionStorage.getItem(this.currentKey);
                    if (str1) {
                        this.userPrefSession = JSON.parse(str1);
                    } else {
                        this.userPrefSession = {};
                    }
                    let str2 = localStorage.getItem(this.currentKey);
                    if (str2) {
                        this.userPref = JSON.parse(str2);
                    } else {
                        this.userPref = {};
                    }
                }
                else {
                    console.log('Clearing preference objects');
                    if(this.currentKey) sessionStorage.removeItem(this.currentKey);
                    this.userPrefSession = {};
                    this.userPref        = {};
                }
            });
    }

    ngOnInit(): void {
        console.log('User preference initialized');
    }

    ngOnDestroy(): void {
        console.log('Destroying user preference');
        this.userPref        = null;
        this.userPrefSession = null;
        if (this.userSubscription) this.userSubscription.unsubscribe();
    }

    setInSession(key: string, value: any) {
        if(key) {
            if (value) {
                this.userPrefSession[key] = value;
            }
            else {
                delete this.userPrefSession[key];
            }
            if(this.currentKey)
                sessionStorage.setItem(this.currentKey, JSON.stringify(this.userPrefSession));
        }

    }

    getFromSession(key: string): string|number|any {
        if (key) {
            let val =  this.userPrefSession[key];
            return val;
        } else {
            return null;
        }
    }
    setPreference(key: string, value: any) {
        if(key){
            if(value){
                this.userPref[key] = value;
            }
            else {
                delete this.userPref[key];
            }
            if(this.currentKey){
                localStorage.setItem(this.currentKey, JSON.stringify(this.userPref));
            }
        }
    }
    getPreference(key: string) {
        if (key) {
            let val =  this.userPref[key];
            return val;
        } else {
            return null;
        }
    }
    private prefKey(userId: number) {
        return this.prefKeyPrefix + '.' + userId;
    }
}
