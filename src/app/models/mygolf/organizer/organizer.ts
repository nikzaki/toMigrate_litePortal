import {Address} from '../address';
import {PagedResult} from '../../paged-result';
/**
 * The data for a given organizer
 * Created by ashok on 28/04/17.
 */

export interface Organizer {
    readonly organizerId: number;
    readonly registrationNumner?: string;
    readonly name?: string;
    readonly organizerImage?: string;
    readonly shortName?: string;
    readonly description?: string;
    readonly dateJoined?: Date;
    readonly status?: string;
    readonly addressInfo?: Address;
    readonly clubId?: number;
    readonly contactPerson?: string;
    readonly createdOn?: Date;
    readonly reatedBy?: string;
}

