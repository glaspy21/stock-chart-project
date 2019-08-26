import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart'
import NavBar from './Navbar'
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectSocket, addStock, removeStock, setCurrentTime, setCurrentChart } from '../actions/index'
import Clock from './Clock'
import StockTable from './StockTable'
import StockDetail from './StockDetail'
import '../index.css'
import 'bootstrap/dist/css/bootstrap.css'




// const endpoint = "http://localhost:8000"
// const socket = socketIOClient(endpoint);

class App extends Component {
  constructor() {
    super();

    this.state = {
      year: '2019',
      month: '08',
      day: '22',
      hour: '10',
      minute: '05',
      rate: 30
    }
  }
  
  async componentDidMount() {

    // await this.props.addStock('tsla');
    // await this.props.addStock('amzn');
    // await this.props.addStock('fb');
    await this.props.connectSocket()
    this.props.socket.on("stockData", data => console.log(data))
    this.props.socket.on("updateCurrentTime", data => this.props.updateCurrentTime(data))

  }

  componentDidUpdate() {
    console.log(`the current state is:`)
    console.log(this.state.year)
    console.log(this.state.month)
    console.log(this.state.day)
    console.log(this.state.hour)
    console.log(this.state.minute)

  }

  fetchChartData(symbol) {
    this.props.removeStock(symbol)
    // this.props.fetchStockData(e.target.value)

  }

  emitCurrentTime(time) {
    this.props.socket.emit("setTimeAndStart", this.state)
  }

  render() {
    return (
        <div className="doc">
        <NavBar />
        <div className="container" style={{fontFamily: 'helvetica'}}>
            <div className="row">
                    <Clock />
            </div>
            
            <div className="row table-container">
                <StockTable />
            </div>
            <div className="row">{/*chart, stocks, stockDetailrow*/}
                <StockDetail />
            <div className="col-md-8 mb-5">
              <div style={{float: 'right'}}>
                <span className="mr-5">
              <button className="stock-button" onClick={() => this.props.setCurrentChart('1min')}>1</button>
                <button className="stock-button" onClick={() => this.props.setCurrentChart('5min')}>5</button>
                <button className="stock-button" onClick={() => this.props.setCurrentChart('1day')}>D</button>
                </span>
            <button className="stock-button" onClick={()=> this.props.socket.emit('startInterval') }>Start</button>
            <button className="stock-button" onClick={()=> this.props.socket.emit('stopInterval') }>Stop</button>
            <button className="stock-button">1x</button>

            </div>
                <Chart />
            </div>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    currentStock: state.currentStock,
    stockList: state.stockList
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ connectSocket, addStock, removeStock, setCurrentTime, setCurrentChart }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);

// onClick={e => this.fetchChartData(e.currentTarget.innerHTML)}