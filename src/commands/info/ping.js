const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Mostra a minha latência',
            category: "📒 Informação",
            identifier: "info"
        })
    }

    run = (ctx) => {


        ctx.msg.reply(`Oi! ${this.client.ws.ping}ms`)

    }
}