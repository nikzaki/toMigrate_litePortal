import {Sponsor} from '../sponsor';
/**
 * The information about a sponsor for a given competition
 * Created by ashok on 02/05/17.
 */

export interface CompetitionSponsor {
    sponsor: Sponsor;
    imageUrl?: string;
    sponsorDate: Date;
    sponsorship: string;
    status: string;
}