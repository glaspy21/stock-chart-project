import { CONNECT_SOCKET } from '../actions/types'
import { connect } from 'mongoose';

export default function ( state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case CONNECT_SOCKET:
            return action.payload;
        default:
            return state
    }
}