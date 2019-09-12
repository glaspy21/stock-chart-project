

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import moment from 'moment'

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

export function recalculateStock(stock) {
	//get latest observation
	let latestObservation = stock.observations[stock.observations.length - 1]
	

	//get last closing price
	stock.price =latestObservation.close

	//get last volume and add latest volume
	let filteredData = stock.observations.filter(observation => {
		return moment(observation.date).isSame(latestObservation.date, 'day')
	})
	
	stock.volume = filteredData.reduce((sum, item) => {
		return sum + item.volume
	}, 0)
	
	let filteredChangeData = stock.observations.filter(observation => {
		return moment(observation.date).isSame(moment(latestObservation.date).subtract(1, 'days'), 'day')
	})
	
	if (filteredChangeData.length > 0) {
		stock.prevClose = filteredChangeData[filteredChangeData.length-1].close
	} 
	
	// change is (price - prev) 
	stock.change = (((latestObservation.close - stock.prevClose)/stock.prevClose)*100).toFixed(2)




	//calculate volume
	stock.vwapSum = filteredData.reduce((sum, item) => {
		return sum + (item.volume/4 * (item.close + item.open + item.high + item.low))
	}, 0)
	// (stock.volume/4 * (latestObservation.high + latestObservation.close + latestObservation.open + latestObservation.low)) + stock.vwapSum

	stock.vwap = (stock.vwapSum/stock.volume).toFixed(2)

	//set rvol
	stock.rvol = (stock.volume/ stock.avgVolume).toFixed(2)

	let RSIfilteredData = stock.observations.filter(( observation, index) => {
	
		return index > stock.observations.length -15
	
	})


	let returnRSI = function(array) {
		let gainTotal = 0;
		let gainNum = 0;
		let lossTotal = 0;
		let lossNum = 0;
		
		
	
	
		for (let i = 1; i <= array.length - 1; i++) {
			
			let dif = array[i].close - array[i-1].close
			if ( dif > 0 ) {
				gainTotal += dif
				gainNum ++
			} else if (dif < 0) {
				lossTotal += dif
				lossNum ++
			}
		}

		let gainAvg = gainNum/14
		let lossAvg = lossNum/14

		
	
		let rsi = 100 -  (100/(1+ (gainAvg / lossAvg)))

		
		return rsi	

	}

	stock.rsi = returnRSI(RSIfilteredData).toFixed(2)


	return stock

}




// function returnBollingerBands(arr20) {
// 	let middleBand;
// 	let upperBand;
// 	let lowerBand;
// 	const mean = arr20.reduce((sum, price) => {
// 		return sum + price
// 	}, 0)/ arr20.length

// 	const squareMeanDifferences = [];

// 	arr20.forEach(number => {
// 		let dif = num - mean
// 		let squared = dif * dif
// 		squareMeanDifferences.push(squared)
// 	})

// 	const newMean = squaredMeanDifferences.reduce((sum, num) => {
// 		return sum + num;
// 	}, 0)/arr20.length;

// 	const stdDev = Math.sqrt(newMean)

// 	middleBand = mean
// 	upperBand = mean + (2 * stdDev)
// 	lowerBand = mean - (2 * stdDev)

// 	return {
// 		middleBand,
// 		upperBand,
// 		lowerBand
// 	}

// }

// function returnRSI(RSIfilteredData ) {
// 	let gainTotal = null;
// 	let gainNum = null;
// 	let lossTotal = null;
// 	let lossTotal = null;
	


// 	for (i = 1; i <= last14arr.length; i++) {
// 		let dif = last14arr[i] - last14arr[i-1]
// 		if ( dif > 0 ) {
// 			gainTotal += dif
// 		} else {
// 			lossTotal += dif
// 		}

// 		let gainAvg = gainTotal/gainNum
// 		let lossAvg = lossTotal/lossNum
// 	}

// 	let RSI = 100 -  100/(1+ gainAvg/lossAvg)

// 	return {
// 		RSI
// 	}	
// }

// function returnSMA50 () {
// 	let currentTime;

// 	//get closing price from last 50 time periods
// 	let arr50 = [pCli-50...pCl i]

	
// }

// symbol: NFLX
// name: 'Netflix, Inc'
// industry: 'Services | CATV Systems'
// marketCap: '131.58B'
// PERatio: '118.75'
// forwardPE: '52.20'
// EPS: '2.48'
// ROA:  '4.30%'
// ROE:  '20.90%'
// ROI: '10.00%'
// shsFloat: '430.62M'
// shsOutstanding: '446.08M'
// insiderOwn: '81.40%'
// insiderTrans: '2.72%'
// instOwn: '81.40%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// name:  'AMZN'
// industry: 'Services | Catalog & Mail Order Houses'
// marketCap: '902.97B'
// PERatio: '74.30'
// forwardPE: '53.25'
// EPS: '23.81'
// ROA:  '7.20%'
// ROE:  '26.30%'
// ROI: '11.90'
// shsFloat: '416.69M'
// shsOutstanding: '510.48M'
// insiderOwn: '11.70%'
// insiderTrans: '-2.51%'	
// instOwn: '57.80%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// symbol: 'GOOG'
// name: 'Alphabet Inc.'
// industry: 'Technology | Internet Information Providers'
// marketCap: '795.91B'
// PERatio: '23.60'
// forwardPE: '20.95'
// EPS: '49.54'
// ROA:  
// ROE:  
// ROI: 
// shsFloat: '601.64M	'
// shsOutstanding: '680.92M'
// insiderOwn: '0.02%'	
// insiderTrans: '125.74%	'
// instOwn: '69.95%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:
// symbol: 'TSLA'
// name:  'Tesla, Inc.'.
// industry: 'Consumer Goods | Auto Manufacturers'
// marketCap: '40.47B'
// PERatio: 
// forwardPE: '54.44'
// EPS: '-3.81'
// ROA:  '-2.20%'
// ROE:  '-13.40%'
// ROI:  '-2.60%'
// shsFloat: '132.99M'
// shsOutstanding: '188.24M'
// insiderOwn: '59.90%'
// insiderTrans: '-22.96%'
// instOwn: '59.90%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// symbol: 'RKDA'
// name: 'Arcadia Biosciences, Inc'
// industry: 'Basic Materials | Agricultural Chemicals'
// marketCap: '62.74M'
// PERatio: 
// forwardPE: 
// EPS: 
// ROA:  '-18.60%'
// ROE:  '-52.70%'
// ROI:  '-57.20%'
// shsFloat: '4.68M'
// shsOutstanding: '6.37M'
// insiderOwn: '33.31%'
// insiderTrans: '137.98%'
// instOwn: '7.50%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// symbol: 'TSLA'
// name: 'Tesla, Inc'
// industry: 'Consumer Goods | Auto Manufacturers'
// marketCap: '40.47B'
// PERatio: 
// forwardPE: '54.44'
// EPS: '-3.81'
// ROA:  '-2.20%'
// ROE:  '-13.40%'
// ROI: '-2.60%'
// shsFloat: '132.99M'
// shsOutstanding: '188.24M'
// insiderOwn: '0.20%'
// insiderTrans: '-22.96%'
// instOwn: '59.90%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// symbol: 'FB'
// name: 'Faceboook'
// industry: 'Technology | Internet Information Providers'
// marketCap: '526.98B'
// PERatio: '30.56'
// forwardPE: '19.00'
// EPS: '5.90'
// ROA:  '16.40%'
// ROE:  '20.10%'
// ROI: '25.80%'
// shsFloat: '2.38B'
// shsOutstanding: '2.92B'
// insiderOwn: '1.43%'
// insiderTrans: '-8.71%'
// instOwn: '78.00%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// symbol: 'NETE'
// name: 'Net Element, Inc.'
// industry: 'Technology | Internet Software & Services'
// marketCap: '20.42M'
// PERatio: 
// forwardPE: 
// EPS: '-1.28'
// ROA:  '-20.90%'
// ROE:  '-58.90%'
// ROI: '-33.10%'
// shsFloat: '3.43M'
// shsOutstanding: '4.64M'
// insiderOwn: '11.70%'
// insiderTrans: '0.00%'
// instOwn: '15.00%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// symbol: 'AAPL'
// name: 'Apple Inc'
// industry: 'Consumer Goods | Electronic Equipment'
// marketCap: '978.39B'
// PERatio: '17.94'
// forwardPE: '16.13'
// EPS: '11.51'
// ROA:  '15.90%'
// ROE:  '52.10%'
// ROI: '26.60%'
// shsFloat: '4.52B'
// shsOutstanding: '4.74B'
// insiderOwn: '0.07%'
// insiderTrans: '-4.93%'
// instOwn: '61.20%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// symbol: 'BABA'
// name: 'Alibaba Group Holding Limited'
// industry: 'Services | Specialty Retail, Other'
// marketCap: '451.28B'
// PERatio: '30.77'
// forwardPE: '19.11'
// EPS: '5.39'
// ROA:  '10.80%'
// ROE:  '21.10%'
// ROI: '6.50%'
// shsFloat: '1.49B'
// shsOutstanding: '2.72B'
// insiderOwn: '48.49%'
// insiderTrans: '0.00%'
// instOwn: '46.30%'
// price:
// volume:
// change:
// float: 
// vwap:
// rvol:
// rsi:
// BB:

// NFLX, AMZN, TSLA, FB, GOOG, NETE, RKDA, AAPL, BABA