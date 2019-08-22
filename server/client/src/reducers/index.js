import { combineReducers } from "redux";
import stocksReducer from './stocksReducer';
import currentStockReducer from './currentStockReducercd '

const rootReducer = combineReducers({
    currentStock: currentStockReducer,
    stocks: stocksReducer,



})
export default rootReducer;