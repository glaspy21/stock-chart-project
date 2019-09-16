import axios from 'axios'
import socketIOClient from 'socket.io-client';
import { FETCH_CURRENT_STOCK_HISTORY, FETCH_CURRENT_STOCK_UPDATE, FETCH_STOCKS, SET_CURRENT_TIME, UDATE_CURRENT_TIME, CONNECT_SOCKET, ADD_STOCK, FETCH_INITIAL_DATA, REMOVE_STOCK, SET_CURRENT_CHART, SET_CURRENT_STOCK, UPDATE_STOCK_LIST, UPDATE_CURRENT_STOCK, UPDATE_CURRENT_TIME  } from './types' 


export const fetchInitialData = (symbol) => async dispatch => {
    axios
        .get('http://localhost:8000/initialData')
        .then(response => {
           dispatch({type: FETCH_INITIAL_DATA, payload: response.data})
           dispatch({type: SET_CURRENT_STOCK, payload: response.data.NFLX})
        })
}



export const updateCurrentTime = (time) => dispatch => {
    let clock = {}
    clock.year = time[0]
    clock.month = time[1] == '01' ? 'January' :
    time[1] == '02' ? 'February' :
    time[1] == '03' ? 'March' :
    time[1] == '04' ? 'April' :
    time[1] == '05' ? 'May' :
    time[1] == '06' ? 'June' :
    time[1] == '07' ? 'July' :
    time[1] == '08' ? 'August' :
    time[1] == '09' ? 'September' :
    time[1] == '10' ? 'October' :
    time[1] == '11' ? 'November' :
    'December'
    clock.day = time[2];
    clock.hour = time[3]
    clock.minute = time[4]
    clock.second = time[5]
    dispatch({
        type: UPDATE_CURRENT_TIME,
        payload: clock
    }) 
}

export const fetchStocks = () => {
    
}

export const updateStocks = (data) => dispatch => {
    dispatch({type: UPDATE_STOCK_LIST, payload: data})

}

export const updateCurrentStock = (stockList, currentStock) => dispatch => {
    const updatedStock = stockList[currentStock.symbol]
    dispatch({type: UPDATE_CURRENT_STOCK, payload: updatedStock})
}

export const setCurrentStock = (stock) => dispatch => {
    dispatch({type: SET_CURRENT_STOCK, payload: stock})
}

export const connectSocket = () => dispatch => {
    const endpoint = "http://localhost:8000"
    const socket = socketIOClient(endpoint);

    dispatch({ type: CONNECT_SOCKET, payload: socket  })
}

export const addStock =  (symbol) => async dispatch => {
    symbol = symbol.toUpperCase();

    await axios.get('http://localhost:8000/symbol', {
        params: {
            symbol
        }})
        .then(response => {
            dispatch({type: ADD_STOCK, payload: response.data})
        })
        .catch (error => {
            console.log(error)
        })
}

export const removeStock = (symbol) => dispatch => {
    symbol = symbol.toUpperCase();

    axios.get('http://localhost:8000/symbol', {
        params: {
            symbol
        }})
        .then((response) => {
            dispatch({type: REMOVE_STOCK, payload: response.data})
        })
        .catch((error) => {
            console.log(error)
        })
    }

export const setCurrentChart = (interval) => dispatch => {
    return {
        type: SET_CURRENT_CHART, payload: interval
    }
}

export const setCurrentTime = (time) => dispatch => {
}

//response.data["Time Series (1min)"]