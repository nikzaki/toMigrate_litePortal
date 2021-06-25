
import {PagedResult} from '../../paged-result';
import {Team} from './team';

export interface CompetitionTeams extends PagedResult {
    competitionTeams?: Team [];
}