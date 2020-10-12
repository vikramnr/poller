const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    question: String,
    answers : [String]
})

module.exports = mongoose.model('Poll', pollSchema)