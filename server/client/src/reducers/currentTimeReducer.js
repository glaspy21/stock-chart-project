import { UPDATE_CURRENT_TIME } from '../actions/types'

export default function ( state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case UPDATE_CURRENT_TIME:
            return "";
        default:
            return state
    }
}