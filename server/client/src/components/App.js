import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();

    this.state = {
      response: false,
      endpoint: "http://localhost:8000"
    }
  }
  
  componentDidMount() {
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("stockData", data => console.log(data))
    this.setState({response: data  })
  }

  componentDidUpdate() {
    console.log(this.state.response)
  }



  render() {
    return (
      <div>{this.state.response.high}</div>
    )
  }
}



export default App;
