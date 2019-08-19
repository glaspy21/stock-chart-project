const axios = require(`axios`);
const router = require('express').Router();
const AlphaBaseUrl = 'https://www.alphavantage.co/query'
const Alpha_API_KEY = 'XMY3YX3TU92Q9B1Z'

const MSFT = await axios.get(AlphaBaseUrl, {
    params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: 'MSFT',
        interval: '1min',
        outputsize: 'full',
        apikey: Alpha_API_KEY
    }
}).then(response => {
    return response
})


router.get('/stockData', (req, res) => {
    console.log(`accessing router`)
    res.send(MSFT)
})

module.exports = router