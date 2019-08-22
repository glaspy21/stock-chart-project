import { FETCH_CURRENT_STOCK } from '../actions/types'

export default function ( state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case FETCH_CURRENT_STOCK:
            return "";
    }
}