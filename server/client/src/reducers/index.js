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

// stocks: {
//     APPL: {
//         observations:[{open, close, volume...},],
//         currentFIET:2.5,
//         name: "Apple Inc.",
//         currentVolume:20000,
//     }
//     NETE: {}

// }

// ["APPL"].forEach(stockSymbol){
//     stock.Find()
// }

// socket emission:
// {
//     APPL: {open,close,volume...}
//     NETE: {open,close,volume...}  
// }