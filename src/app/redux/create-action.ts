/**
 * Utility function for creating Redux action.
 * Created by ashok on 28/04/17.
 */
import {Action} from '@ngrx/store';

export function createAction(type, payload?): Action {
    return {type: type, payload: payload};
}
