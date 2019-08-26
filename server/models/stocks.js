const mongoose = require(`mongoose`);
const Schema = mongoose.Schema


const StockSchema = new Schema({
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    industy: { type: String, required: true },
    marketCap: { type: String, required: true },
    PERatio:  { type: String, required: true },
    forwardPE:  { type: String, required: true },
    EPS:  { type: String, required: true },
    ROA:  { type: String, required: true },
    ROE:  { type: String, required: true },
    ROI:  { type: String, required: true },
    shsFloat: { type: String, required: true },
    shsOutstanding:  { type: String, required: true },
    insiderOwn: { type: String, required: true },
    insiderTrans: { type: String, required: true },
    instOwn: { type: String, required: true },
    _1min: { type: Object, required: true },
    _5min: { type: Object, required: true },
    _1day: { type: Object, required: true },
    
});

module.exports = mongoose.model('Stock', StockSchema)