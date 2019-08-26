import axios from 'axios'
import socketIOClient from 'socket.io-client';
import { FETCH_CURRENT_STOCK_HISTORY, FETCH_CURRENT_STOCK_UPDATE, FETCH_STOCKS, SET_CURRENT_TIME, UDATE_CURRENT_TIME, CONNECT_SOCKET, ADD_STOCK, FETCH_INITIAL_DATA, REMOVE_STOCK, SET_CURRENT_CHART, SET_CURRENT_STOCK  } from './types' 


export const fetchInitialData = (symbol) => async dispatch => {
    axios
        .get('http://localhost:8000/initialData')
        .then(response => {
            console.log(`hey people what's good`)
            console.log(response)
        })
}

export const fetchCurrentStockUpdate = (symbol) => {

}

export const updateCurrentTime = () => {

}

export const fetchStocks = () => {
    
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

export const setCurrentChart = (interval) => dispatch => {
    return {
        type: SET_CURRENT_CHART, payload: interval
    }
}

export const setCurrentTime = (time) => dispatch => {
    console.log(`current time is blah blah`)
}

//response.data["Time Series (1min)"]