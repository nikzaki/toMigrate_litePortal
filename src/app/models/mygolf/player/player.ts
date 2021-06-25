import {AddressInfo} from 'dgram';
/**
 * Created by ashok on 30/04/17.
 */

export interface Player {
    playerId?: number;
    /**
     * The user id. Corresponding Mobile Authentication Records
     */
    userId?: number;
    firstName?: string;
    lastName?: string;
    playerName?: string;
    nickName?: string;
    email?: string;
    phone?: string;
    handicapIndex?: number;
    handicap?: number;
    handicapIn?: string;
    mygolfHandicapIndex?: number;
    gender?: string;
    countryId?: string;
    countryName?: string;
    sportCode?: string;
    flagUrl?: string;
    photoUrl?: string;
    thumbnail?: string;
    dateJoined?: Date;
    status?: string;
    teeOfFrom?: string;
    addressInfo?: AddressInfo;
    nhsNumber?: string;
    birthdate?: Date;
    checked?: boolean;
    allowEdit?: boolean;
    errorMessage?: string;
    friendSince?: Date;
    membership?: string;
}