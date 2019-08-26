import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart'
import NavBar from './Navbar'
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectSocket, addStock, removeStock, setCurrentTime } from '../actions/index'
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

    this.props.addStock('nete');
    this.props.addStock('aapl');
    this.props.addStock('nflx');
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
            <div className="col-md-8">
                <Chart />
            </div>
        </div>


        

        <div>{this.props.stockList[0]}</div>
        <div><a name="NETE" onClick={
            (e) => {this.fetchChartData(e.currentTarget.name)
            }}>NETE</a></div>
        <div><a name="AAPL" onClick={e => this.fetchChartData(e.currentTarget.innerHTML)}>AAPL</a></div>
        <div><a name="NFLX" onClick={e => this.fetchChartData(e.currentTarget.innerHTML)}>NFLX</a></div>

        <button onClick={()=> this.props.socket.emit('startInterval') }>start</button>
        <button onClick={()=> this.props.socket.emit('stopInterval') }>stop</button>
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
  return bindActionCreators({ connectSocket, addStock, removeStock, setCurrentTime }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);