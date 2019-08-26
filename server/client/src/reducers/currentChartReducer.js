import { SET_CURRENT_CHART } from '../actions/types'

export default function ( state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case SET_CURRENT_CHART:
            return action.payload;
        default:
            return state
    }
} 