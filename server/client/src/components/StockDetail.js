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
                            <h1 className="mb-0 font-weight-bold">{this.props.currentStock.symbol} </h1>
                            <div>{this.props.currentStock.name}</div>
                            <div style={{fontSize: 12}}>{this.props.currentStock.industry}</div>
                        </div>
                    </div>
                    
                </div>
                <div className="row mt-2" style={{marginTop: 10, zIndex: 1, backgroundColor: 'white'}}>
                    <div className="col-md-6 mt-2">
                        <div>Market Cap: {this.props.currentStock.marketCap}</div>
                        <div>P/E Ratio: {this.props.currentStock.PERatio}</div>
                        <div>Forward P/E: {this.props.currentStock.forwardPE}</div>
                        <div>EPS: {this.props.currentStock.EPS}</div>
                        <div>ROA: {this.props.currentStock.ROA}</div>
                        <div>ROE: {this.props.currentStock.ROE}</div>
                        <div>ROI: {this.props.currentStock.ROI}/div>
                        <div>Shs Outstanding: {this.props.currentStock.shsOutstanding}</div>
                        <div>Insider Own: {this.props.currentStock.insiderOwn}</div>
                        <div>Insider Trans: {this.props.currentStock.insiderTrans}</div>
                        <div>Inst Owned: {this.props.currentStock.instOwn}</div>
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