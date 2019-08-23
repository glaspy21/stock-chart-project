import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart'
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectSocket, addStock, removeStock } from '../actions/index'


// const endpoint = "http://localhost:8000"
// const socket = socketIOClient(endpoint);

class App extends Component {
  constructor() {
    super();

    this.state = {
      year: '',
      month: '',
      day: '',
      hour: '',
      minute: '',
    }
  }
  
  componentDidMount() {
    this.props.addStock('nete');
    this.props.addStock('aapl');
    this.props.addStock('nflx');
    this.props.connectSocket()
  }

  componentDidUpdate() {
    this.props.socket.on("stockData", data => console.log(data))
    console.log(this.props.socket)
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

  render() {
    return (
      <div>
        <div>hello</div>
        <form>
        <label>
            Year:
            <input type="text" name="name" onChange={(e) => {
              this.setState({ year: e.target.value })
            }}/>
          </label>
          <label>
            Month:
            <input type="text" name="name" onChange={(e) => {
              this.setState({ month: e.target.value })
            }}/>
          </label>
          <label>
            Day:
            <input type="text" name="name" onChange={(e) => {
              this.setState({ day: e.target.value })
            }}/>
          </label>
          <label>
            Hour:
            <input type="text" name="name" onChange={(e) => {
              this.setState({ hour: e.target.value })
            }}/>
          </label>
          <label>
            Minute:
            <input type="text" name="name" onChange={(e) => {
              this.setState({ minute: e.target.value })
            }}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
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
  return bindActionCreators({ connectSocket, addStock, removeStock }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);