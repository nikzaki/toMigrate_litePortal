import {PagedResult} from '../../paged-result';
import {Advertisement} from './advertisement';

export interface AdvertisementList extends PagedResult {
    advertisements: Array<Advertisement>
}