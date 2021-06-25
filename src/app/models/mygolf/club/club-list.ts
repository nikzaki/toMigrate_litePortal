import {PagedResult} from '../../paged-result';
import {Club} from './club';
/**
 * List of clubs read in paged manner for a given filter keys
 * Created by ashok on 30/04/17.
 */

export interface ClubList extends PagedResult {
    clubs: Array<Club>
}