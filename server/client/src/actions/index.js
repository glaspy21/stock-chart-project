import axios from 'axios'
import socketIOClient from 'socket.io-client';
import { FETCH_CURRENT_STOCK_HISTORY, FETCH_CURRENT_STOCK_UPDATE, FETCH_STOCKS, UDATE_CURRENT_TIME, CONNECT_SOCKET  } from './types'


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

//response.data["Time Series (1min)"]