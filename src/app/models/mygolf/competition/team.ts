import {TeamPlayer} from './team-player';
export interface Team {
    teamId?: number;
    teamName?: string;
    description?: string;
    teamLogo?: string;
    playerTeam?: boolean;
    captainName?: string;
    teamPlayers?: TeamPlayer [];
}