/**
 * The Authenticated user information
 * Created by ashok on 28/04/17.
 */
export interface User {
    userId: number;
    userName: string;
    password: string;
    userType: string;
    admin?: boolean;
    clubId?: number;
    playerId?: number;
    organizerId?: number;
    roles?: Array<string>;
    name?: string;
}