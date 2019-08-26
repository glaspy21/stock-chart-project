import axios from 'axios'
import socketIOClient from 'socket.io-client';
import { FETCH_CURRENT_STOCK_HISTORY, FETCH_CURRENT_STOCK_UPDATE, FETCH_STOCKS, SET_CURRENT_TIME, UDATE_CURRENT_TIME, CONNECT_SOCKET, ADD_STOCK, REMOVE_STOCK  } from './types' 


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

    axios.get('http://localhost:8000/symbol', {
        params: {
            symbol
        }})
        .then(response => {
            console.log(`hey peopel the response is`)
            console.log(response.data)
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
            console.log(`ok hewre we go poEPOPL`)
            dispatch({type: REMOVE_STOCK, payload: response.data})
        })
        .catch((error) => {
            console.log(error)
        })
    }

export const setCurrentTime = (time) => dispatch => {
    console.log(`current time is blah blah`)
}

//response.data["Time Series (1min)"]