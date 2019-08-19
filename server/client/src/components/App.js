import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  getData() {
    axios
      .get('http://localhost:8000/stockData')
      .then((response) => {
        console.log(response)
      })
  }
  componentDidMount() {
    axios
      .get('http://localhost:8000/stockData')
      .then((response) => {
        console.log(response)
      })
  }


  render() {
    return (
      <div>Hello</div>
    )
  }
}



export default App;
