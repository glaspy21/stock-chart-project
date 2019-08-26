import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import $ from 'jquery'


class StockDetail extends Component {


    render () {
        return (
            <div className="col-md-4 border rounded shadow-sm overflow-auto" style={{height:400, fontFamily: 'helvetica'}}>
                <div id="detailHeader" className="row">
                    <div  className="col-md-12 mb-4" style={{zIndex: 2}}>
                        <div className=""  style={{}}>
                            <h1 className="mb-0 font-weight-bold">NFLX </h1>
                            <div>Netflix Inc</div>
                            <div className="">Industry</div>
                        </div>
                    </div>
                    
                </div>
                <div className="row" style={{marginTop: 10, zIndex: 1}}>
                    <div className="col-md-6">
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                        <div>Data Column 1</div>
                    </div>
                    <div className="col-md-6">
                        Data Column 2
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        currentStock: state.currentStock
    }
}

// function mapDispatchToProps (dispatch) {
//     return bindActionCreators({ connectSocket, addStock, removeStock, setCurrentTime }, dispatch)
// }

export default connect (mapStateToProps)(StockDetail)