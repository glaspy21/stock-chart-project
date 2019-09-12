import { ADD_STOCK, REMOVE_STOCK, FETCH_INITIAL_DATA, UPDATE_STOCK_LIST } from '../actions/types'
import { recalculateStock } from '../utils/utils'

export default function (state = {  }, action ) {
    if ( action.error ) {
        return ( action.error );
    }
    switch ( action.type ) {
        case UPDATE_STOCK_LIST:
            let newState = {}
            //loop through stocks in data
            for ( let symbol in action.payload ) {
                if (symbol !== 'time') {
                    if ( symbol === 'AAPL' ) {
                        console.log(`the  AAPL observations length is `, state.AAPL.observations.length)
                        console.log(`action.payload ${symbol} is:`, action.payload[symbol])
                    }
                    let newObservation = action.payload[symbol]
                    let stockToChange = {...state[symbol]}
                    stockToChange.observations = stockToChange.observations.concat([newObservation])  
                   stockToChange = recalculateStock(stockToChange)
                    newState[symbol] = Object.assign(state[symbol], stockToChange)
                }
            }
    
            return newState
        case FETCH_INITIAL_DATA:
            let result = {}
            console.log(`initial symbol ACTION.PAYLOAD is:`, action.payload)
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


