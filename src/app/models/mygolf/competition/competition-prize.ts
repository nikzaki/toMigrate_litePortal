/**
 * Created by ashok on 26/06/17.
 */
export interface CompetitionPrize
{
    categoryName?: string;
    categoryDisplaySequence?: number;
    title: string;
    prizeName: string;
    scoreType?: string;
    teamPrize?: boolean;
    order?: number;
    prizePosition?: number;
    roundNumber?: number;
    prizeMoney?: number;
    playerMon?: string;
    playerPos?: string;
    teamMon?: string;
    teamPos?: string;
}