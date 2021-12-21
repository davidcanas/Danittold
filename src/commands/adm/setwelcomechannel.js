const Discord = require("discord.js")
const Command = require('../../structures/Command')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'setwelcomechannel',
            description: 'Configura o canal de entrada',
            category: "👨‍💼 Administrador",
            identifier: "adm",
            requireDatabase: true,
            options: [
                {
                    name: 'on_ou_off',
                    description: 'Diga on para ligar e off para desligar',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'canal',
                    description: 'Se on o canal a setar',
                    type: 'CHANNEL',
                    required: false
                },
            ]
        })
    }

    run = async (ctx) => {
        let channel;
        let on_off;

        if (ctx.msg.options) {
       on_off = ctx.options.getString('on_ou_off')
        } else {
            if(!ctx.args[0]) return ctx.msg.reply("On ou off")
            on_off = ctx.args[0]
        }

        if (ctx.msg.options) {
       channel = ctx.options.getChannel('canal').id
        } else {
           console.log(ctx)
    
            channel = ctx.args[1]
        }
       

    if (on_off === "on") {
        let dbGuild = await this.client.db.guilds.findOne({_id: ctx.msg.guild.id})
        if (!dbGuild) return ctx.msg.reply("Guild não registrada na db")
       console.log(channel)
        dbGuild.welcome.channel = channel
        dbGuild.save()
        ctx.msg.reply({ content: 'Canal setado com sucesso!', ephemeral: false})
    }
    if (on_off === "off") {
        let dbGuild = await this.client.db.guilds.findOne({_id: ctx.msg.guild.id})
        if (!dbGuild) return ctx.msg.reply("Guild não registrada na db")
    
        dbGuild.welcome.channel = null
        dbGuild.save()
        ctx.msg.reply({ content: 'Logs de entrada desativados com sucesso!', ephemeral: false })
    }

    }
}