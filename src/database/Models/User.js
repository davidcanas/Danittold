const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    _id: String,
    profile: {
        badges: {
        type: Array,
        default: ["🌟"]
        }
      
    },
    blacklist: Boolean,
}, { 
    versionKey: false
})

module.exports = model('users', userSchema)