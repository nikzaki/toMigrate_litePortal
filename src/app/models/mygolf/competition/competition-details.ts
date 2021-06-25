import {CompetitionPlayer} from './competition-player';
import {CompetitionPrize} from './competition-prize';
import {CompetitionSponsor} from './competition-sponsor';
import {CompetitionCategory} from './competition-category';
import {GameRound} from '../gameround';
/**
 * Created by ashok on 26/06/17.
 */
export interface CompetitionDetails
{
    nextRound?: number;
    roundInProgress?: number;
    players?: Array<CompetitionPlayer>;
    prizes?: Array<CompetitionPrize>;
    teamPrizes?: Array<CompetitionPrize>;
    sponsors?: Array<CompetitionSponsor>;
    gameRounds?: Array<GameRound>;
    categories?: Array<CompetitionCategory>;
    //The requesting player's overall scores and position
    totalNet?: number;
    totalGross?: number;
    netPosition?: number;
    grossPosition?: number;
    totalTeams?: number;
}