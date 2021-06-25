/**
 * The payment made by the player to participate in the given competition
 * Created by ashok on 02/05/17.
 */

export interface CompetitionPayment {
    paid: boolean;
    amount?: number;
    paymentDate?: Date;
    reference?: string;
}