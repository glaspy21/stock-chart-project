const express = require('express');
const http = require(`http`);
const mongoose = require(`mongoose`);
const cors = require('cors')
const bodyParser = require(`body-parser`);
const PORT = 8000;


mongoose.connect('mongodb://localhost/products', {useNewUrlParser: true})




const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const stockData = require(`./routes/stockData`);
app.use(stockData)




const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
})
