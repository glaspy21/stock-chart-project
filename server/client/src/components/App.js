import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Chart from './chart'

const endpoint = "http://localhost:8000"
const socket = socketIOClient(endpoint);

class App extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    
    socket.on("stockData", data => console.log(data))
    console.log(socket)
  }

  componentDidUpdate() {
    console.log(this.state.response)
  }



  render() {
    return (
      <div>
      <div>hello</div>
      <button onClick={()=> socket.emit('startInterval') }>start</button>
      <button onClick={()=> socket.emit('stopInterval') }>stop</button>

      </div>
    )
  }
}



export default App;
