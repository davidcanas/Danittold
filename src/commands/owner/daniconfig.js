const Command = require('../../structures/Command')
const fs = require("fs")
const sourcebin = require("sourcebin")
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'daniedit',
            description: '😎',
            category: "⚙ Dono",
            aliases: ["daniconfig", "dc"],
            identifier: "owner",
            options: [
                {
                    name: 'type',
                    description: 'O que fazer ?',
                    type: 'STRING',
                    required: true
                },
                {
                    name: "args1",
                    description: "Argumento 1",
                    type: "STRING",
                    required: false
                },
                {
                    name: "args2",
                    description: "Argumento 2",
                    type: "STRING",
                    required: false
                }
            ]
        })
    }

    run = async (ctx) => {

        if (ctx.commandAuthor.id !== '733963304610824252' && ctx.commandAuthor.id !== '718078381199065150' && ctx.commandAuthor.id !== '852650555254767676' && ctx.msg.commandAuthor.id !== "733963304610824252") {
            return ctx.msg.reply('Apenas meu criador');
        }
        let args;
        if (ctx.msg.options) {
            args = ctx.msg.options.getString("type")
        } else {
            args = ctx.args[0]
        }
        let args1;
        if (ctx.msg.options) {
            args1 = ctx.msg.options.getString("args1")
        } else {
            args1 = ctx.args[1]
        }
        let args2;
        if (ctx.msg.options) {
            args2 = ctx.msg.options.getString("args2")
        } else {
            args2 = ctx.args[2]
        }
        if (args === "cmdupdate") {
            let model = this.client.db.cmds
            await this.client.db.cmds.deleteMany({})

            this.client.commands.forEach(cmd => {

                model.create({
                    name: cmd.name,
                    aliases: cmd.aliases,
                    description: cmd.description,
                    category: cmd.category,
                    identifier: cmd.identifier
                })

            })
            ctx.msg.reply("Atualizei a lista de comandos no website do danitto podes ver la em https://danitto.tk/comandos !")
        }
        if (args === "sendcmdlogs") {
            fs.readFile('logs/latest.md', 'utf8', async (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }

                let bin = await ctx.createBin(sourcebin, data, "markdown")

                ctx.msg.reply("Enviei os logs de comando para o teu privado")

                this.client.users.cache.get(ctx.commandAuthor.id).send(`Vê a lista de comandos aqui ---> ${bin.short}`)
            })
        }
        if (args === "addbadge") {
            if (!args1) return ctx.msg.reply("diga o id de alguem")
            if (!args2) return ctx.msg.reply("insira uma badge")
          
            let userDB = await this.client.db.users.findOne({ _id: args1 })
            if (!userDB) {
                return ctx.msg.reply("Ok, parece que esse usuario não exista ou nunca tenha usado um comando no danitto, peça que ele use um comando!")
            }
            userDB.profile.badges.push(`${args2}`)
            userDB.profile.badges = userDB.profile.badges
            userDB.save()
            ctx.msg.reply("Feito")
        }
        if (args === "removebadge") {
            if (!args1) return ctx.msg.reply("diga o id de alguem")
       
          
            let userDB = await this.client.db.users.findOne({ _id: args1 })
            if (!userDB) {
                return ctx.msg.reply("Ok, parece que esse usuario não exista ou nunca tenha usado um comando no danitto, peça que ele use um comando!")
            }
            userDB.profile.badges.pop()
            userDB.profile.badges = userDB.profile.badges
            userDB.save()
            ctx.msg.reply("Feito, removi a ultima badge do perfil dele")
        }

    }
}