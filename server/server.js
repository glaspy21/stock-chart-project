const express = require(`express`);
const mongoose = require(`mongoose`);
mongoose.connect('mongodb://localhost/stockProject', {useNewUrlParser: true})
const app = express();
const server = require(`http`).createServer(app);
const io = require(`socket.io`)(server);
const moment = require(`moment`);
const Stock = require(`./models/stocks`);
const sockets = {}

let stockTime = {
    year: '2019',
    month: '08',
    day: '22',
    hour: '15',
    minute: '56',
    second: '00'
}
let rate = 60;
let milliseconds = 60000/rate
let timeInterval = '_1min'
let timeFormat = 'YYYY-MM-DD HH:mm:ss'
let timeIncrement = 1


let stockTimeString = () => `${stockTime.year}-${stockTime.month}-${stockTime.day} ${stockTime.hour}:${stockTime.minute}:${stockTime.second}`


console.log(stockTimeString()._i)


const PORT = process.env.PORT || 8000;
const index = require(`./routes/index`);
const AlphaBaseUrl = 'https://www.alphavantage.co/query';
const Alpha_API_KEY = 'XMY3YX3TU92Q9B1Z';

let minutes = 0;
let hours = 10;


const dataObj = {
    "2019-08-16 10:30:00": {
        "1. open": "1.6500",
        "2. high": "1.6500",
        "3. low": "1.6500",
        "4. close": "1.6500",
        "5. volume": "104"
    },
    "2019-08-16 10:28:00": {
        "1. open": "1.6700",
        "2. high": "1.6700",
        "3. low": "1.6700",
        "4. close": "1.6700",
        "5. volume": "520"
    },
    "2019-08-16 10:27:00": {
        "1. open": "1.6454",
        "2. high": "1.6454",
        "3. low": "1.6454",
        "4. close": "1.6454",
        "5. volume": "1500"
    },
    "2019-08-16 10:26:00": {
        "1. open": "1.6001",
        "2. high": "1.7000",
        "3. low": "1.6001",
        "4. close": "1.7000",
        "5. volume": "1518"
    },
    "2019-08-16 10:24:00": {
        "1. open": "1.6600",
        "2. high": "1.6600",
        "3. low": "1.6600",
        "4. close": "1.6600",
        "5. volume": "202"
    },
    "2019-08-16 10:23:00": {
        "1. open": "1.7101",
        "2. high": "1.7200",
        "3. low": "1.7101",
        "4. close": "1.7200",
        "5. volume": "300"
    },
    "2019-08-16 10:22:00": {
        "1. open": "1.7200",
        "2. high": "1.7200",
        "3. low": "1.7200",
        "4. close": "1.7200",
        "5. volume": "200"
    },
    "2019-08-16 10:18:00": {
        "1. open": "1.8000",
        "2. high": "1.8041",
        "3. low": "1.8000",
        "4. close": "1.8041",
        "5. volume": "780"
    },
    "2019-08-16 10:16:00": {
        "1. open": "1.6799",
        "2. high": "1.6799",
        "3. low": "1.6799",
        "4. close": "1.6799",
        "5. volume": "1209"
    },
    "2019-08-16 10:14:00": {
        "1. open": "1.6401",
        "2. high": "1.6401",
        "3. low": "1.6401",
        "4. close": "1.6401",
        "5. volume": "178"
    },
    "2019-08-16 10:13:00": {
        "1. open": "1.6600",
        "2. high": "1.6600",
        "3. low": "1.6400",
        "4. close": "1.6400",
        "5. volume": "461"
    },
    "2019-08-16 10:12:00": {
        "1. open": "1.6534",
        "2. high": "1.6534",
        "3. low": "1.6534",
        "4. close": "1.6534",
        "5. volume": "139"
    },
    "2019-08-16 10:11:00": {
        "1. open": "1.6800",
        "2. high": "1.6800",
        "3. low": "1.6718",
        "4. close": "1.6718",
        "5. volume": "200"
    },
    "2019-08-16 10:10:00": {
        "1. open": "1.6790",
        "2. high": "1.6800",
        "3. low": "1.6700",
        "4. close": "1.6800",
        "5. volume": "1800"
    },
    "2019-08-16 10:08:00": {
        "1. open": "1.6600",
        "2. high": "1.6600",
        "3. low": "1.6300",
        "4. close": "1.6300",
        "5. volume": "1242"
    },
    "2019-08-16 10:05:00": {
        "1. open": "1.6200",
        "2. high": "1.6200",
        "3. low": "1.6200",
        "4. close": "1.6200",
        "5. volume": "303"
    },
    "2019-08-16 10:04:00": {
        "1. open": "1.6000",
        "2. high": "1.6000",
        "3. low": "1.6000",
        "4. close": "1.6000",
        "5. volume": "115"
    },
    "2019-08-16 10:03:00": {
        "1. open": "1.5901",
        "2. high": "1.5901",
        "3. low": "1.5901",
        "4. close": "1.5901",
        "5. volume": "261"
    },
    "2019-08-16 10:01:00": {
        "1. open": "1.5701",
        "2. high": "1.6400",
        "3. low": "1.5701",
        "4. close": "1.6200",
        "5. volume": "1997"
    },
    "2019-08-16 10:00:00": {
        "1. open": "1.6200",
        "2. high": "1.6210",
        "3. low": "1.5850",
        "4. close": "1.5850",
        "5. volume": "1720"
    }
}


const cors = require('cors')
const bodyParser = require(`body-parser`);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(index);

// let stocks = {
//     NETE: {
//         candles: []
//     },
//     AAPL: {
//         candles: []
//     },
//     NFLX: {
//         candles: []
//     },

// }

// const sendInitialData = (stocks) => {
//     for (let symbol in stocks) {
//         Stock
//             .find({symbol})
//             .exec((err, doc) => {
//                 stocks[symbol].candles = []
//                 for (let timeString in doc[0][timeInterval]) {
//                     if (moment(timeString, timeFormat).isBefore(stockTimeString(), timeFormat) || moment(timeString, timeFormat).isSame(stockTimeString(), timeFormat)) {
//                         stocks[symbol].candles.push({
//                             [timeString]: doc[0][timeInterval][timeString]
//                         })
//                     } 
//                 }
//             })
//     }
//     console.log(stocks)
// }

// const sendNextCandle = (stocks) => {
//     for (let symbol in stocks) {
//         Stock
//         .find({symbol})
//         .exec((err, doc) => {
//            let nextCandleTime = moment(stockTimeString(), timeFormat).add(timeIncrement, 'minute')._d
//            console.log(`the next Candle time is:`)
//            console.log(nextCandleTime)
//            timeIncrement ++
//            nextCandleTime = moment(stockTimeString(), timeFormat).add(timeIncrement, 'minute')
//            console.log(`the next Candle time is:`)
//            console.log(nextCandleTime)
           
//         })
//     }
// }

// sendInitialData(stocks)
// sendNextCandle(stocks)

const sendUpdates = socket => {
    if (sockets[socket.id].minutes.toString().length < 2) {
        sockets[socket.id].minutes = "0" + sockets[socket.id].minutes
    };
    if (sockets[socket.id].hours.toString().length < 2) {
        sockets[socket.id].hours = "0" + sockets[socket.id].hours
    };
    let dateTime = `${stockTime.year}-${stockTime.month}-22 ${sockets[socket.id].hours}:${sockets[socket.id].minutes}:00`
    let currentData = dataObj[dateTime];
    console.log(`Sending Current Data ${sockets[socket.id].minutes}`)
    socket.emit("stockData", currentData)
    socket.emit("stockData", dateTime)
    sockets[socket.id].minutes = parseInt(sockets[socket.id].minutes);
    sockets[socket.id].hours = parseInt(sockets[socket.id].hours);
    sockets[socket.id].minutes ++;
    if (sockets[socket.id].minutes === 60) {
        sockets[socket.id].minutes = 0;
        sockets[socket.id].hours ++;
        if (sockets[socket.id].hours === 24) {
            sockets[socket.id].hours = 0;
        }
    }
} 



io.on('connection', (socket) => {
    console.log(`New client connected`);
    console.log(`Socket id is: ${socket.id}`)
    sockets[socket.id] = {}
    sockets[socket.id].hours = 10
    sockets[socket.id].minutes = 00 
    sockets[socket.id].starttimeInterval = settimeInterval (() => {
            sendUpdates(socket)
        }, 1000
        //6000/100 = x
    );
    socket.on('setTimeAndStart',(data) => {
        stockTime.year = data.year;
        stockTime.month = data.month;
        stockTime.day = data.day;
        stockTime.hour = data.hour;
        stockTime.minute = data.minute

        socket.starttimeInterval = settimeInterval(() => {
            sendUpdates(socket)
        }, milliseconds)
    })

    socket.on("disconnect", () => {
        cleartimeInterval(sockets[socket.id].starttimeInterval)
        console.log(`Client disconnected`)
    });

    socket.on('starttimeInterval', () => {
        sockets[socket.id].hours = 10
        sockets[socket.id].minutes = 00
        sockets[socket.id].starttimeInterval = settimeInterval (() => {
                sendUpdates(socket)
            }, 2000
        );
        console.log(`timeInterval started`)
    });

    socket.on('stoptimeInterval', () => {
        cleartimeInterval(sockets[socket.id].starttimeInterval);
        console.log(`timeInterval stopped`)
    });

    socket.on('setTimeAndStart',(data) => {
        
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})
