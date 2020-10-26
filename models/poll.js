const mongoose = require('mongoose')

const pollSchema = new mongoose.Schema({
    title: String,
    question: String,
    answers : [String],
    votes: [Object],
    isActive: {
        type: Boolean,
        default: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Poll', pollSchema)