const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    welcome: {
        channel: String
    },
    prefix: {
        type: String,
        default: "d/"
    }
}, { 
    versionKey: false
})

module.exports = model('guilds', guildSchema)