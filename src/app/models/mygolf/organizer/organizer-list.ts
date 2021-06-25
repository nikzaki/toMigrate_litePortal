import {PagedResult} from '../../paged-result';
import {Organizer} from './organizer';
/**
 * One page of organizers read from the server
 * Created by ashok on 30/04/17.
 */

export interface OrganizerList extends PagedResult {
    readonly organizers?: Array<Organizer>;
}