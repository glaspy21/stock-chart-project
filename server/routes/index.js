const axios = require(`axios`);
const router = require('express').Router();
const AlphaBaseUrl = 'https://www.alphavantage.co/query'
const Alpha_API_KEY = 'XMY3YX3TU92Q9B1Z'

const MSFT = () => {
    axios.get(AlphaBaseUrl, {
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
} 


router.get('/', (req, res) => {
    res.send(`Router up and running`)
})

module.exports = router