import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import '../index.css'
import $ from 'jquery'
import { bindActionCreators } from 'redux';
import { setCurrentStock } from '../actions/index'

class StockTable extends Component {
   constructor(props) {
      super(props) 
      this.state = { 
         students: [
            { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
            { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
            { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
            { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
         ],
         check: 'green'
         /*green: #00ff55
         red:  #ff4d4d*/
      }
      this.props.setCurrentStock.bind(this);
   }

   componentDidMount() {
   //    $(document).ready(function() {
   //       $(":checkbox").on("click", false);
   //   });
   }

   renderStockRow(stock) {
      console.log(this.props.setCurrentStock)
      return (
         <Fragment>
         <tr>
           <td onClick={(e) => this.props.setCurrentStock(stock.symbol)} rowSpan="3">{stock.symbol}</td>
         </tr>
         <tr>
           <td>100</td>
           <td>85</td>
           <td>20000</td>  
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td>100</td>
           <td rowSpan="3">60%</td>
           <td rowSpan="3">0%</td>
         </tr>
         <tr>
            <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.check}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           
         </tr>
         
         </Fragment>
      )
   }

   renderTableData() {
      let stockRows = [];
      for ( let stockSymbol in this.props.stockList ) {
         let stock = this.props.stockList[stockSymbol]
        stockRows.push( this.renderStockRow(stock))
      }
      return stockRows
         
      
   } 
      

 renderTableHeader() {
   
 }

 render() {
    return (
       
          
       <div id="stockTable" className="col-md-12 mb-5">
          <div className="text-center">
          <h4 id='title'className="font-weight-bold" style={{fontFamily: 'helvetica'}}>US STOCKS</h4>
          <table className="stockTable" style={{fontFamily: 'helvetica', width:"100%"}} id='students'>
             <tbody>
                <tr>
                   <th>Symbol</th>
                   <th>Price</th>
                   <th>Volume</th>
                   <th>Change</th>
                   <th>Float</th>
                   <th>VWAP</th>
                   <th>S/R</th>
                   <th>RVol</th>
                   <th>RSI</th>
                   <th>BB</th>
                   <th>SMA</th>
                   <th>EMA</th>
                   <th>ADX</th>
                   <th>MACD</th>
                   <th>LONG</th>
                   <th>SHORT</th>


   
                </tr>
                {this.renderTableData()}
             </tbody>
          </table>
          </div>
       </div>
       
    )
 }
}

function mapStateToProps (state) {
   return {
      stockList: state.stockList
   }
}

function mapDispatchToProps (dispatch) {
   return bindActionCreators({ setCurrentStock }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(StockTable)