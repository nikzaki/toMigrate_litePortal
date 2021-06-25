/**
 * The base interface for paged result
 * Created by ashok on 28/04/17.
 */
export interface PagedResult {
    readonly totalPages?: number;
    readonly currentPage?: number;
    readonly totalItems?: number;
    readonly totalInPage?: number;
    readonly success?: boolean;
    readonly errorMessage?: string;
}
