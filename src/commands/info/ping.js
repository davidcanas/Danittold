const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Teste'
        })
    }

    run = (ctx) => {


        ctx.msg.reply(`Oi! ${this.client.ws.ping}ms`)

    }
}