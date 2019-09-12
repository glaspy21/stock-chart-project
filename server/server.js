const app = require(`express`)();
const mongoose = require(`mongoose`);
mongoose.connect('mongodb://localhost/stockProject', {useNewUrlParser: true})
const server = require(`http`).createServer(app);
const io = require(`socket.io`)(server);
const moment = require(`moment`);
const Stock = require(`./models/stocks`);


let stockTime = {
    year: '2019',
    month: '08',
    day: '16',
    hour: '10',
    minute: '05',
    second: '00'
}
let rate = 30;
let milliseconds = 60000/rate

let stockTimeString = () => `${stockTime.year}-${stockTime.month}-${stockTime.day} ${stockTime.hour}:${stockTime.minute}:${stockTime.second}`


const PORT = process.env.PORT || 8000;
const index = require(`./routes/index`);

const cors = require('cors')
const bodyParser = require(`body-parser`);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(index);

const getObservationForStockFromTime = async (symbol, time) => {
    let stock = await Stock
        .find({ symbol })

   let result = stock[0].observations.find(observation => {
    
        return moment(observation.date).isSame(time, 'minute')
    })
    console.log(result)
    return result
}

const sendUpdates =  async socket => {
    // Get stock data for current simulation Time
    let message = {time:socket.currentSimulationTime}
    for (const stock of stocks) {
        // TODO: make this pull from db, not dataObj
        message[stock] = await getObservationForStockFromTime(stock, socket.currentSimulationTime)
    }
    console.log('message sent is',message)
    // Emit stock data
    socket.emit("stockData", message)

    // Increment current simulation time
    socket.currentSimulationTime.add(1,'m')
}

let startSimulationTime = moment('2019-08-23 9:31')

let stocks = ['NETE', 'AAPL','NFLX', 'AMZN', 'TSLA', 'FB', 'GOOG', 'RKDA', 'BABA'];

io.on('connection', (socket) => {

    socket.on("disconnect", () => {
        clearInterval(socket.timeInterval)
        console.log(`Client disconnected`)
    });

    socket.on('startInterval', () => {
        console.log(`starttimeInterval`);

        socket.currentSimulationTime = startSimulationTime
        socket.timeInterval = setInterval (async() => {
                await sendUpdates(socket)
            }, milliseconds
        );
        console.log(`timeInterval started`)
    });

    socket.on('stopInterval', () => {
        console.log(`stoptimeInterval`);
        clearInterval(socket.timeInterval);
        console.log(`timeInterval stopped`)
    });
})

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})
