

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

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

// function returnRSI(last14arr ) {
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
