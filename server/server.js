const app = require('express')();
const server = require(`http`).Server(app);
const io = require(`socket.io`)(server);
const axios = require('axios');
const sockets = {}
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


const mongoose = require(`mongoose`);
const cors = require('cors')
const bodyParser = require(`body-parser`);


mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})

app.use(index);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const getDataAndEmit = socket => {
    if (sockets[socket.id].minutes.toString().length < 2) {
        sockets[socket.id].minutes = "0" + sockets[socket.id].minutes
    };
    if (sockets[socket.id].hours.toString().length < 2) {
        sockets[socket.id].hours = "0" + sockets[socket.id].hours
    };
    let dateTime = `2019-08-16 ${sockets[socket.id].hours}:${sockets[socket.id].minutes}:00`
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
    sockets[socket.id].startInterval = setInterval (() => {
            getDataAndEmit(socket)
        }, 2000
    );

    socket.on("disconnect", () => {
        clearInterval(sockets[socket.id].startInterval)
        console.log(`Client disconnected`)
    });

    socket.on('startInterval', () => {
        sockets[socket.id].hours = 10
        sockets[socket.id].minutes = 00
        sockets[socket.id].startInterval = setInterval (() => {
                getDataAndEmit(socket)
            }, 2000
        );
        console.log(`Interval started`)
    });

    socket.on('stopInterval', () => {
        clearInterval(sockets[socket.id].startInterval);
        console.log(`Interval stopped`)
    })
})

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})
