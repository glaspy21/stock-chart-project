import { UPDATE_CURRENT_TIME, SET_CURRENT_TIME } from '../actions/types'

export default function ( state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case SET_CURRENT_TIME:
            return '';
        case UPDATE_CURRENT_TIME:
            return "";
        default:
            return state
    }
}