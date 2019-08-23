import { FETCH_CURRENT_STOCK_HISTORY, FETCH_CURRENT_STOCK_UPDATE } from '../actions/types'

export default function ( state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case FETCH_CURRENT_STOCK_HISTORY:
            return "";
        case FETCH_CURRENT_STOCK_UPDATE:
            return "";
        default:
            return state
    }
}