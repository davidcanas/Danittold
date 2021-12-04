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
       
        if(!command) return console.log("n é cmd")
  if (command) {
    const ctx = new CommandContext(this.client, msg, args)  
    command.run(ctx);
    const webhookClient = new WebhookClient({id:"916655523015847966", token: "RlrZZQuOcNt7ssUlD-9SdIIgQR6dB36DpFAFSogvYfH9T9NNS1ekSDbKZ3vtkxLbuvS9"});
    webhookClient.send("comando executado" + command.name)
     //Logs
    let currentdate = new Date(); 
     let date =  currentdate.getDate() + "/"
     + (currentdate.getMonth()+1)  + "/" 
     + currentdate.getFullYear() + " @ "  
     + currentdate.getHours() + ":"  
     + currentdate.getMinutes() + ":" 
     + currentdate.getSeconds()

     if (!fs.existsSync('./logs'))
     fs.mkdirSync('./logs');
  fs.appendFileSync(`./logs/latest.md`, `[${date}] - **Comando**: \`${cmd} ${args}\` executado por \`${msg.author.tag} (${msg.author.id})\`\n`)
  }
  

    }}