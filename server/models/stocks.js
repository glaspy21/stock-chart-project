const mongoose = require(`mongoose`);
const Schema = mongoose.Schema


const StockSchema = new Schema({
    symbol: { type: String, required:true },
    name: { type: String },
    industry: { type: String },
    marketCap: { type: String },
    PERatio:  { type: String },
    forwardPE:  { type: String },
    EPS:  { type: String },
    ROA:  { type: String },
    ROE:  { type: String },
    ROI:  { type: String },
    shsFloat: { type: String },
    shsOutstanding:  { type: String },
    insiderOwn: { type: String },
    insiderTrans: { type: String },
    instOwn: { type: String },
    price: { type: Number },
    volume: { type: Number },
    change: { type: Number },
    float: { type: Number },
    vwap: { type: Number },
    rvol: { type: Number },
    rsi:{ type: Number },
    BB: { type: Number },
    observations: { type: Object, required:true },
});

module.exports = mongoose.model('Stock', StockSchema)

