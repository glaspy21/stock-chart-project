import React, { Component } from 'react';
import { getData } from "../utils/utils";
import CandleStickChart from './CandleStickChart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import { connect } from 'react-redux'



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
			<div></div>
        //     <TypeChooser>
		// 		{/* {type => <CandleStickChart type={type} data={this.props.currentStock.observations} />} */}
        //         </TypeChooser>
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
	// "currentTime":<time>
//     "APPL":observation
//     "MSFT":observation
// }

function mapStateToProps (state) {
	return {
		currentStock: state.currentStock
	}
}

export default connect (mapStateToProps)(Chart)