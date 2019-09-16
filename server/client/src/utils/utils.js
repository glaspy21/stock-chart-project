

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