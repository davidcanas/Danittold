const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'calcular',
            description: 'Calcula algo',
            category: "Util",
            aliases: ["calc"]
        })
    }


    run = (ctx) => {
ctx.msg.reply("sad")
    }}