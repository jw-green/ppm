const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Package = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    author: {
        type: String
    },
    tag: {
        type: String
    },
    in_prod: {
        type: Boolean
    },
    timestamp: {
        type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model('Package', Package);