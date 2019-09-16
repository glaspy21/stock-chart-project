import { FETCH_CURRENT_STOCK_HISTORY, FETCH_CURRENT_STOCK_UPDATE, SET_CURRENT_STOCK, UPDATE_CURRENT_STOCK } from '../actions/types'

export default function ( state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case SET_CURRENT_STOCK:
            return action.payload;
        case FETCH_CURRENT_STOCK_UPDATE:
            return "";
        case UPDATE_CURRENT_STOCK:
            return Object.assign({}, action.payload);
        default:
            return state
    }
}