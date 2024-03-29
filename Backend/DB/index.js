const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://omkar139797:8TFetL0LVMsyTw0l@nocodefi.9c0vpvb.mongodb.net/nocodefi');

const TokenSchema = new mongoose.Schema({
    name: String,
    symbol: String,
    decimals: Number,
    creator: String,
    tokenAddress: String,
})

const Token = mongoose.model('Token', TokenSchema);

module.exports = {
    Token
}
