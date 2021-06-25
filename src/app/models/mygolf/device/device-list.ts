import {PagedResult} from '../../paged-result';
import {Device} from './device';

export interface DeviceList extends PagedResult {
    deviceList?: Device[];
}