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
         price: 100,
         volume: 1000000,
         change: 5,
         float: 10000000,
         VWAP: 80,
         SR: {
            s1: 40,
            s2: 30,
            s3: 20,
            r1: 50,
            r2: 60,
            r3: 70
           },
         RVol: 2,
         RSI: 70,
         BB: {
            upper: 80,
            mid: 60,
            lower: 40
         },


         check: 'green',
         /*green: #00ff55
         red:  #ff4d4d*/
      }
      this.renderStockRow = this.renderStockRow.bind(this);
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
           <td  rowSpan="3"><a href="#" onClick={() => this.props.setCurrentStock(stock)}>{stock.symbol}</a></td>
         </tr>
         <tr>
           <td>{stock.price}</td>
           <td>{stock.volume}</td>
           <td>{stock.change}</td>  
           <td>{stock.float}</td>
           <td>{stock.vwap}</td>
           <td>{stock.price}</td>
           {/* <td>{stock.price}</td> */}
           <td>{stock.rvol}</td>
           <td>{stock.rsi}</td>
           <td>{stock.BB}</td>
           {/* <td>{stock.sma}</td>
           <td>{stock.price}</td> */}
           {/* <td>{stock.price}</td> */}
           {/* <td rowSpan="3">60%</td>
           <td rowSpan="3">0%</td> */}
         </tr>
         <tr>
            <span className={stock.price > 60 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           <td>
              <span className={stock.volume > 1000000 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={stock.change > 5 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={stock.float > 30000000 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={stock.vwap > 80 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={stock.sr > 70 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={stock.rvol > 2 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={stock.bb > 60 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           {/* <td>
              <span className={(stock.price - 40)/40 > .20 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={(stock.price - 50)/40 > 40 ? 'green':'red'}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={this.state.che}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td>
           <td>
              <span className={stock}>
                <span title="green box" />
                <span title="red box" />
              </span>
           </td> */}
           <td>
              <span className={stock.macd > 0 ? 'green':'red'}>
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
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>Symbol</th>
                   <th  className="pr-4"><button style={{float: 'left', width: 25}}>+</button>Price</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>Volume</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>Change</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>Float</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>VWAP</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>S/R</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>RVol</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>RSI</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>BB</th>
                   {/* <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>SMA</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>EMA</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>ADX</th>
                   <th className="pr-4"><button style={{float: 'left', width: 25}}>+</button>MACD</th> */}
                   {/* <th>LONG</th>
                   <th>SHORT</th> */}


   
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