const mongoose = require(`mongoose`);
const Schema = mongoose.Schema


const StockSchema = new Schema({
    symbol: { type: String, required: true },
    _1min: { type: Object, required: true },
    _5min: { type: Object, required: true },
    _1day: { type: Object, required: true }
});

module.exports = mongoose.model('Stock', StockSchema)