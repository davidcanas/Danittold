const Event = require('../../structures/Event')
const CommandContext = require("../../structures/CommandContext");

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
        let command;
        if (cmd.length === 0) return;
        if (this.client.commands.find(c => c.name === cmd)) {
          
          command = this.client.commands.find(c => c.name === cmd)
        } 
        if(!command) return console.log("n é cmd")
  if (command) {
    const ctx = new CommandContext(this.client, msg, args)  
    command.run(ctx);
  }
  

    }}