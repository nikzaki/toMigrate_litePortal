/**
 * Created by ashok on 26/06/17.
 */
export interface CompetitionCategory
{
    sequence?: number;
    categoryId?: number;
    categoryName?: string;
    gender?: string;
    forGrouping?: boolean;
    fromHandicap?: number;
    toHandicap?: number;
}