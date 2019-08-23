import React, { Component } from 'react';
import { getData } from "../utils/utils";
import CandleStickChart from './CandleStickChart';
import { TypeChooser } from "react-stockcharts/lib/helper";



class Chart extends Component {
	componentDidMount() {
		getData().then(data => {
            console.log(data)
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
            <TypeChooser>
				{type => <CandleStickChart type={type} data={this.state.data} />}
                </TypeChooser>
		)
	}
}


// currentStock: "APPL"
// stocks:{
//     "APPL":[{observation},{observation}],
//     "MSFT":[{observation},{observation}],
// }

// socket message 
// {
//     "APPL":observation
//     "MSFT":observation
// }

export default Chart