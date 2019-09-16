import { combineReducers } from "redux";
import stockListReducer from './stockListReducer';
import currentStockReducer from './currentStockReducer'
import currentTimeReducer from './currentTimeReducer'
import socketReducer from './socketReducer'
import currentChartReducer from './currentChartReducer'

const rootReducer = combineReducers({
    socket: socketReducer,
    currentStock: currentStockReducer,
    currentTime: currentTimeReducer,
    currentChart: currentChartReducer,
    stockList: stockListReducer,
})

export default rootReducer;