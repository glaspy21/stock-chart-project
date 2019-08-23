import { combineReducers } from "redux";
import stocksReducer from './stocksReducer';
import currentStockReducer from './currentStockReducer'
import currentTimeReducer from './currentTimeReducer'
import socketReducer from './socketReducer'

const rootReducer = combineReducers({
    socket: socketReducer,
    currentStock: currentStockReducer,
    currentTime: currentTimeReducer,
    stocks: stocksReducer,



})
export default rootReducer;