const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    title: String,
    question: String,
    answers : [String],
    votes: [Object]
})

module.exports = mongoose.model('Poll', pollSchema)