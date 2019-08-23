import { combineReducers } from "redux";
import stockListReducer from './stockListReducer';
import currentStockReducer from './currentStockReducer'
import currentTimeReducer from './currentTimeReducer'
import socketReducer from './socketReducer'

const rootReducer = combineReducers({
    socket: socketReducer,
    currentStock: currentStockReducer,
    currentTime: currentTimeReducer,
    stockList: stockListReducer,



})
export default rootReducer;