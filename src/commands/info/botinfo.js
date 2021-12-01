const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            description: 'Informações do Bot'
        })
    }

    run = (ctx) => {

            ctx.msg.reply({
                content: `Estou consumindo ${(process.memoryUsage().rss / 1024 / 1024).toFixed(0)}MB de ram*`,
                ephemeral: false
            })
     
    }
}