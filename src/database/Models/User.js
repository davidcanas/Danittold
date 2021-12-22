const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    _id: String,
    profile: {
        badges: {
        type: Array,
        default: [""]
        },
        sobremim: {
            type: String,
            default: "Danitto é lindo ! (Use d/sobremim para editar esta mensagem)"
        }
      
    },
    blacklist: Boolean,
}, { 
    versionKey: false
})

module.exports = model('users', userSchema)