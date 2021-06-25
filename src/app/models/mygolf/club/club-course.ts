import {CourseHole} from './course-hole';
/**
 * Information about a given course in the club
 * Created by ashok on 30/04/17.
 */

export interface ClubCourse {
    courseId?: number;
    gameCourseId?: number;
    whichNine?: number;
    courseName?: string;
    coursePar?: number;
    photoUrl?: string;
    description?: string;
    holes: Array<CourseHole>;
    indexToUse?: number;
    teeBoxes?: Array<TeeBoxInfo>;
}

export interface TeeBoxInfo 
{
    id: number;
    name: string;
    image: string;
    description: string;
}