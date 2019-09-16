import React, { Component } from 'react';
import CandleStickChart from './CandleStickChart';
import { TypeChooser } from "react-stockcharts/lib/helper";
import { connect } from 'react-redux'



class Chart extends Component {
	render() {
		if (this.props.currentStock.observations == null) {
			return <div>Loading...</div>
		}
		return (
            <TypeChooser>
				{type => <CandleStickChart type={type} data={this.props.currentStock.observations} />}
                </TypeChooser>
		)
	}
}

function mapStateToProps (state) {
	return {
		currentStock: state.currentStock
	}
}

export default connect (mapStateToProps)(Chart)