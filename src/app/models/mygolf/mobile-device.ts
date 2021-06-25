import {PagedResult} from '../paged-result';
/**
 * Created by ashok on 03/07/17.
 */

export interface MobileDevice {
    deviceId?: string;
    deviceName?: string;
    virtual?: boolean;
    cordovaVersion?: string;
    platform?: string;
    platformVersion?: string;
    model?: string;
    manufacturer?: string;
    serial?: string;
    userTags?: string;
    ownedBy?:number;
    batterLevel?: number;
    lastActive?: Date;
    /**
     * This is volatile attribute used for maintaining the selection of the item
     */
    selected?: boolean;
    dirty?: boolean;
    assigned?: boolean;
}

export interface DeviceList extends PagedResult {
    deviceList?: MobileDevice[];
}