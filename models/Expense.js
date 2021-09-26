const mongoose = require('mongoose')
const moment = require('moment')

const expenseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImage: {
        type: String
    },
    lat:{
        type: Number,
        default: 0
    },
    lon:{
        type: Number,
        default: 0
    },
    createdAt: {
        type: String,
        default: moment().format("D.MM.YY")
    }
})

module.exports = mongoose.model('expenseModel', expenseSchema)