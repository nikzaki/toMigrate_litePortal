import {PagedResult} from '../../paged-result';
import {Competition} from './competition';
/**
 * Created by ashok on 02/05/17.
 */

export interface CompetitionList extends PagedResult {
    competitions?: Array<Competition>;
}