const Event = require('../../structures/Event')
const CommandContext = require("../../structures/CommandContext");


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
            }
        } else if (interaction.isButton()) {

            console.log("buttton")

        }
    }
}