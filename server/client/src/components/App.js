import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart'
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectSocket, addStock, removeStock, setCurrentTime } from '../actions/index'


// const endpoint = "http://localhost:8000"
// const socket = socketIOClient(endpoint);

class App extends Component {
  constructor() {
    super();

    this.state = {
      year: '2019',
      month: 'AUG',
      day: '22',
      hour: '10',
      minute: '05',
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
    this.props.socket.emit("setTime", this.state)
  }

  render() {
    return (
      <div>
        <div>hello</div>
        <div>
          <label>
              Year:
              <input type="text" name="name" defaultValue={this.state.year} onChange={(e) => {
                this.setState({ year: e.target.value })
              }}/>
            </label>
            <label>
              Month:
              <input type="text" name="name" defaultValue={this.state.month} onChange={(e) => {
                this.setState({ month: e.target.value })
              }}/>
            </label>
            <label>
              Day:
              <input type="text" name="name" defaultValue={this.state.day} onChange={(e) => {
                this.setState({ day: e.target.value })
              }}/>
            </label>
            <label>
              Hour:
              <input type="text" name="name" defaultValue={this.state.hour} onChange={(e) => {
                this.setState({ hour: e.target.value })
              }}/>
            </label>
            <label>
              Minute:
              <input type="text" name="name" defaultValue={this.state.minute} onChange={(e) => {
                this.setState({ minute: e.target.value })
              }}/>
            </label>
          <button onClick={e => this.props.setCurrentTime(this.state)}>SUBMIT</button>
        </div>

        <div>{this.props.stockList[0]}</div>
        <div><button onClick={e => this.fetchChartData(e.currentTarget.innerHTML)}>NETE</button></div>
        <div><button onClick={e => this.fetchChartData(e.currentTarget.innerHTML)}>AAPL</button></div>
        <div><button onClick={e => this.fetchChartData(e.currentTarget.innerHTML)}>NFLX</button></div>

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
  return bindActionCreators({ connectSocket, addStock, removeStock, setCurrentTime }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);