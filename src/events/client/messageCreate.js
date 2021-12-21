const Event = require('../../structures/Event')
const CommandContext = require("../../structures/CommandContext");
const { WebhookClient } = require("discord.js")
const fs = require("fs")
module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }

    run = async (msg) => {

        let prefix = "d/"

        if (!msg.content.startsWith(prefix)) return;
        let args = msg.content.slice(prefix.length).trim().split(/ +/g);

        let cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;
        let command = this.client.commands.find(c => c.name === cmd || c.aliases?.includes(cmd))

        if (!command) return
        if (command) {

            /* Registrando Usuarios e Servidores Caso Não Existam*/
            let guildDB = await this.client.db.guilds.findOne({ _id: msg.guild.id })
            if (!guildDB) {
                await this.client.db.guilds.create({ _id: msg.guild.id })
            }

            let userDB = await this.client.db.users.findOne({ _id: msg.author.id })
            if (!userDB) {
                await this.client.db.users.create({ _id: msg.author.id })
            }
            /*FIM*/

            const ctx = new CommandContext(this.client, msg, args)
            command.run(ctx);

            let currentdate = new Date();
            let date = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds()

            if (!fs.existsSync('./logs'))
                fs.mkdirSync('./logs');
            fs.appendFileSync(`./logs/latest.md`, `[${date}] - **Comando**: \`${cmd} ${args}\` executado por \`${msg.author.tag} (${msg.author.id})\`\n`)
        }


    }
}