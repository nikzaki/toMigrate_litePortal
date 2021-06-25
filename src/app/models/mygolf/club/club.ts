import {ClubCourse} from './club-course';
/**
 * Information about a given club
 * Created by ashok on 30/04/17.
 */

export interface Club {
    clubId: number;
    clubName: string;
    clubImage: string;
    clubTag: string;
    latitude: number;
    longitude: number;
    address: string;
    description: string;
    courses?: Array<ClubCourse>;
    virtualClub?: boolean;
    timeZone: TimeZone;
    countryId?: string;
    countryName?: string;

}

export interface TimeZone {
    id: string;
    name: string;
    usesDaylist?: boolean;
    offsetMinutesUtc?: number;
    offsetSpec?: string;
}