/**
 * Created by ashok on 28/04/17.
 */
export interface PushServerInfo {
    readonly userKey: string;
    readonly appKey: string;
    readonly restApiKey: string;
    readonly googleProjectNumber: string;
}
export interface ServerInfo {
    readonly minClientVersion: number;
    readonly maxClientVersion: number;
    readonly pushServerInfo: PushServerInfo;
    readonly showAds: boolean;
    readonly adUrls: string [];
}
