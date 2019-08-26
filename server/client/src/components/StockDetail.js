import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import $ from 'jquery'


class StockDetail extends Component {


    render () {
        return (
            <div className="col-md-4 border rounded shadow-sm overflow-auto" style={{height:400, fontFamily: 'helvetica', backgroundColor: 'black'}}>
                <div id="detailHeader" className="row mb-4">
                    <div  className="col-md-12 " style={{zIndex: 2}}>
                        <div className="pt-2"  style={{color: 'white', backgroundColor: 'black'}}>
                            <h1 className="mb-0 font-weight-bold">NFLX </h1>
                            <div>Netflix Inc</div>
                            <div className="">Industry</div>
                        </div>
                    </div>
                    
                </div>
                <div className="row mt-2" style={{marginTop: 10, zIndex: 1, backgroundColor: 'white'}}>
                    <div className="col-md-6 mt-2">
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
                    <div className="col-md-6 mt-2">
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