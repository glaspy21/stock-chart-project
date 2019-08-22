import { FETCH_STOCKS } from '..actions/types'

export default function (state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch ( action.type ) {
        case FETCH_STOCKS:
            return ""
    }
}