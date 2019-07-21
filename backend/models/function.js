const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Function = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    author: {
        type: String
    },
    tag: {
        type: String
    },
    is_favorite: {
        type: Boolean,
        default: false,
    },
    package: {
        type: String,
    },
    code: {
        type: String,
    },
    created: {
        type: Date, 
        default: Date.now,
    },
    last_updated: {
        type: Date, 
        default: Date.now,  
    }
});

module.exports = mongoose.model('Function', Function);