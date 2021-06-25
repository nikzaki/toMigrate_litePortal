import {FlightMember} from './flight-member';
/**
 * Created by ashok on 26/06/17.
 */

export interface Flight
{
    flightNumber?: string;
    startTime?: Date;
    startHole?: number;
    groupName?: string;
    playerFlight: boolean;
    flightMembers: Array<FlightMember>;
}