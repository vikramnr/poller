const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    pasword: String
})

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema)