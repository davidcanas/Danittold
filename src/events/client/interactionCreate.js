const Event = require('../../structures/Event')
const CommandContext = require("../../structures/CommandContext");
const fs = require("fs")

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }

    run = async (interaction) => {
        if (interaction.isCommand()) {
            if (!interaction.guild) return

            const cmd = this.client.commands.find(c => c.name === interaction.commandName)

            if (cmd) {
                if (cmd.requireDatabase) {
                    interaction.guild.db =
                        await this.client.db.guilds.findById(interaction.guild.id) ||
                        new this.client.db.guilds({ _id: interaction.guild.id })
                }
              
                const ctx = new CommandContext(this.client, interaction)
             
                cmd.run(ctx)
                let currentdate = new Date(); 
                let date =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds()
           
                if (!fs.existsSync('./logs'))
     fs.mkdirSync('./logs');
  fs.appendFileSync(`./logs/latest.md`, `[${date}] - **Interação**: \`${interaction.commandName}\` executado por \`${interaction.user.tag} (${interaction.user.id})\`\n`)
              
            }
        } else if (interaction.isButton()) {

            console.log("buttton")

        }
    }
}