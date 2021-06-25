import {PagedResult} from '../../paged-result';
import {Player} from './player';
/**
 * Created by ashok on 02/05/17.
 */

export interface PlayerList extends PagedResult {
    players?: Array<Player>
}