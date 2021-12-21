const Discord = require('discord.js')
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'perfil',
            description: 'Mostra o perfil de algum usuario',
            category: "💡 Utilidades",
            identifier: "util",
            aliases: ["profile"],
            options: [
                {
                    name: 'membro',
                    description: 'O membro a ver o perfil (deixe vazio para pegar você mesmo)',
                    type: 'STRING',
                    required: false
                },
            ]
        })
    }


    run = async (ctx) => {
        let userDB = await this.client.db.users.findOne({_id: ctx.commandAuthor.id})
        let badges = userDB.profile.badges.join(",")
        let sobremim = userDB.profile.sobremim
        console.log(badges)
        const embed = new Discord.MessageEmbed()
        .setTitle(`Perfil de ${ctx.commandAuthor.tag}`)
        .addField("Sobremim", sobremim)
        .addField("Badges", badges)
        ctx.msg.reply({embeds: [embed]})
    }}