import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import '../index.css'
import $ from 'jquery'

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
   }

   componentDidMount() {
   //    $(document).ready(function() {
   //       $(":checkbox").on("click", false);
   //   });
   }

   renderTableData() {
      for ( let stock in this.props.stockList ) {
         return (
            <Fragment>
            <tr>
              <td rowSpan="3"><a href="#">{stock}</a></td>
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
            </tr>
            <tr>
               <td></td>
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

export default connect (mapStateToProps)(StockTable)