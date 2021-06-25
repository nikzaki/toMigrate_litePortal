/**
 * The information about a single hole in a givn course in the club
 * Created by ashok on 30/04/17.
 */
export interface CourseHole {
    holeId?: number;
    courseHoleNumber?: number;
    holeNo?: number;
    holePar?: number;
    latitude?: number;
    longitude?: number;
    holeDescription?: string;
    holeDistanceBlack?: number;
    holeDistanceBlue?: number;
    holeDistanceRed?: number;
    holeDistanceWhite?: number;
    holeImage?: string;
    holeIndex?: number;
}