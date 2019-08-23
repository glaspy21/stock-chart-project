import { ADD_STOCK, REMOVE_STOCK } from '../actions/types'

export default function (state = [], action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch ( action.type ) {
        case ADD_STOCK:
            return [ ...state, action.payload ];
        case REMOVE_STOCK:
            return "";
        default:
            return state;
    }
}