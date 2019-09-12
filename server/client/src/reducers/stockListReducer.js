import { ADD_STOCK, REMOVE_STOCK, FETCH_INITIAL_DATA, UPDATE_STOCK_LIST } from '../actions/types'
import { recalculateStock } from '../utils/utils'

export default function (state = {}, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch ( action.type ) {
        case UPDATE_STOCK_LIST:
            console.log(`the state is `, state)
           console.log(`action.payload is`, action.payload)
            //loop through stocks in data
            for ( let symbol in action.payload ) {
                if (symbol !== 'time') {
                    console.log(`action.payload ${symbol} is:`, action.payload[symbol])
                    let newObservation = action.payload[symbol]
                    let stockToChange = state[symbol]
                    stockToChange.observations.push(newObservation)
                   stockToChange = recalculateStock(stockToChange)
                    state[symbol] = stockToChange
                }
            }
            console.log('after recalculation',state)
            return state
        case FETCH_INITIAL_DATA:
            let result = {}
                for ( let symbol in action.payload ) {
                    let stockToChange = action.payload[symbol]
                    recalculateStock(stockToChange)
                    result[symbol] = stockToChange
                }
                console.log(`The INITIAL STATE is`, result)
                return result
        case ADD_STOCK:
            return {...state, [action.payload.symbol]: action.payload}
        case REMOVE_STOCK:
            return state.filter((symbol) => {
                return symbol !== action.payload
            });
        default:
            return state;
    }
}


