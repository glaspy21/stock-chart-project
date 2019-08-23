import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart'
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectSocket, addStock } from '../actions/index'


// const endpoint = "http://localhost:8000"
// const socket = socketIOClient(endpoint);

class App extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    this.props.addStock('nete');
    this.props.connectSocket()
  }

  componentDidUpdate() {
    this.props.socket.on("stockData", data => console.log(data))
    console.log(this.props.socket)

  }

  fetchChartData(e) {
    console.log(e.currentTarget.value)
    // this.props.fetchStockData(e.target.value)

  }

  render() {
    return (
      <div>
        <div>hello</div>
        <div>{this.props.stockList[0]}</div>
        <div><button onClick={e => this.fetchChartData(e)}>NETE</button></div>
        <div><button onClick={e => this.fetchChartData(e)}>AAPL</button></div>
        <div><button onClick={e => this.fetchChartData(e)}>NFLX</button></div>

        <button onClick={()=> this.props.socket.emit('startInterval') }>start</button>
        <button onClick={()=> this.props.socket.emit('stopInterval') }>stop</button>
        <BrowserRouter>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                Stuff should go Here
              </div>
              <div className="col-md-6">
                <Chart />
              </div>
            </div>
          </div>
        </BrowserRouter>
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
  return bindActionCreators({ connectSocket, addStock }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);