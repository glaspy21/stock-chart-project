import { UPDATE_CURRENT_TIME, SET_CURRENT_TIME } from '../actions/types'

export default function ( state = { 
    year: '2019',
    month: 'August',
    day: '22',
    hour: '09',
    minute: '30',
    second: '00'
    }, action ) {

    if ( action.error ) {
        return ( action.error );
    }
    switch (action.type) {
        case UPDATE_CURRENT_TIME:
            return Object.assign({}, action.payload);
        default:
            return state
    }
}