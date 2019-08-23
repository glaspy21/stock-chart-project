import axios from 'axios'
import socketIOClient from 'socket.io-client';
import { FETCH_CURRENT_STOCK_HISTORY, FETCH_CURRENT_STOCK_UPDATE, FETCH_STOCKS, UDATE_CURRENT_TIME, CONNECT_SOCKET, ADD_STOCK  } from './types' 


export const fetchCurrentStockHistory = (symbol) => dispatch => {

}

export const fetchCurrentStockUpdate = (symbol) => {

}

export const updateCurrentTime = () => {

}

export const fetchStocks = () => {
    
}

export const connectSocket = () => dispatch => {
    const endpoint = "http://localhost:8000"
    const socket = socketIOClient(endpoint);

    dispatch({ type: CONNECT_SOCKET, payload: socket  })
}

export const addStock = (symbol) => dispatch => {
    symbol = symbol.toUpperCase();

    axios.get('http://localhost:8000/symbol?symbol=NETE') 
    // {
    //     params: {
    //         symbol: symbol
    //     }})
        .then(response => {
            console.log(response.data)
            dispatch({type: ADD_STOCK, payload: response.data})
        })
        .catch (error => {
            console.log(error)
        })
}

//response.data["Time Series (1min)"]