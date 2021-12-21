const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    name: {
        type: String
      },
      description: {
      type: String
      },
      category: {
        type: String
      },
      identifier: {
        type: String
      },
      aliases: {
        type: Array
      }
    
}, { 
    versionKey: false
})

module.exports = model('Cmds', guildSchema)