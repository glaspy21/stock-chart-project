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
                    let newObservation = action.payload[symbol];

                    let stockToChange = {...state[symbol]};

                    stockToChange.observations = stockToChange.observations.concat([newObservation]);

                    stockToChange = recalculateStock(stockToChange);

                    newState[symbol] = Object.assign(state[symbol], stockToChange)
                }
            }
    
            return Object.assign({}, state, newState)

        case FETCH_INITIAL_DATA:
            let result = {}
            
            
            for ( let symbol in action.payload ) {
                let stockToChange = action.payload[symbol]

                recalculateStock(stockToChange)

                result[symbol] = stockToChange
            }

            return result

        case ADD_STOCK:
            return {...state, [action.payload.symbol]: action.payload}

        case REMOVE_STOCK:
            return state.filter(symbol => symbol !== action.payload);

        default:
            return state;
    }
}


