const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            description: 'Vê os meus comandos',
            category: "📒 Informação",
            identifier: "info",
            aliases: ["ajuda"]
        })
    }


    run = (ctx) => {
     const embed = new MessageEmbed()
     .setTitle("<:danitto:883308546983362561> Ajuda do Danitto")
    .setDescription("<:internet:797178541702774834> [Website](https://danitto.tk/)\n[<:discord:864509377256095764> Discord](https://discord.gg/R92DHj6vCe)\n[<:pasta:793559362093711440> Comandos](https://danitto.tk/comandos)\n[<:peepo_smile:828156822468296744> Me adicione](https://discord.com/oauth2/authorize?client_id=829971254269837344&permissions=8&scope=applications.commands%20bot)")
    .setTimestamp()
    .setColor("BLUE")
    ctx.msg.reply({embeds: [embed]})
    }}