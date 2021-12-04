const Command = require('../../structures/Command')
const fs = require("fs")
const sourcebin = require("sourcebin")
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'daniconfig',
            description: '😎',
            category: "Owner",
            options: [
                {
                    name: 'type',
                    description: 'O que fazer ?',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (ctx) => {
          
        if (ctx.commandAuthor.id !== '791347446298312724' && ctx.commandAuthor.id !== '718078381199065150' && ctx.commandAuthor.id !== '852650555254767676' && ctx.msg.commandAuthor.id !== "733963304610824252") {
            return ctx.msg.reply('Apenas meu criador');
        }
        let args;
        if (ctx.msg.options) {
           args = ctx.msg.options.getString("type")
        } else {
           args = ctx.args.join(' ')
        }
if (args === "cmdupdate") {
        let model = this.client.db.cmds
        await this.client.db.cmds.deleteMany({})

        this.client.commands.forEach(cmd => {

            model.create({
                name: cmd.name,
                aliases: cmd.aliases,
                description: cmd.description,
                category: cmd.category
            })

        })
        ctx.msg.reply("Atualizei a lista de comandos no website do danitto podes ver la em https://danitto.tk/comandos !")
    }
    if (args === "sendcmdlogs") {
        fs.readFile('logs/latest.md', 'utf8' , async (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            async function createBin(data) {
            const bin = await sourcebin.create(
                [
                    {
                        content: data,
                        language: 'markdown',
                    },
                ],
                {
                    title: 'Sourcebin',
                    description: 'test bin',
                },
            );
            return bin
            
            }
           let bin = await createBin(data)
        console.log(bin)
            ctx.msg.reply("Enviei os logs de comando para o teu privado")
            
            this.client.users.cache.get(ctx.commandAuthor.id).send(`Vê a lista de comandos aqui ---> ${bin.short}`)
        })
    }
    }
}