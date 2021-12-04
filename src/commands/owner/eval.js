const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Executa algo',
            category: "Owner",
            aliases: ["ev"],
            options: [
                {
                    name: 'code',
                    description: 'Codigo a executar',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (ctx) => {

        try {

            if (ctx.commandAuthor.id !== '791347446298312724' && ctx.commandAuthor.id !== '718078381199065150' && ctx.commandAuthor.id !== '852650555254767676' && ctx.msg.commandAuthor.id !== "733963304610824252") {
                return ctx.msg.reply('Apenas meu criador');
            }
            let texto;
            if (ctx.msg.options) {
                texto = ctx.msg.options.getString("code")
            } else {
                texto = ctx.args.join(' ')
            }
            console.log(texto)
            console.log(texto)
            if (!texto) return ctx.msg.reply(`<@${ctx.msg.author.id}> Insira algo para ser executado!`)
            const start = process.hrtime();

            let code = eval(texto);
            if (code instanceof Promise) code = await code
            if (typeof code !== 'string') code = require('util').inspect(code, { depth: 0 });

            code = code.split(process.env.ERIS_DOCS).join("SECRET_CODE");
            code = code.split(process.env.TOKEN).join("SECRET_CODE");
            code = code.split(process.env.MONGO_URL).join("SECRET_CODE");
            const stop = process.hrtime(start);
            if (code.length > 1750) {

                return ctx.msg.reply(`Como o codigo passou dos 1800 caracteres n envio bosta nenhuma hahaha`, {
                    name: 'eval.txt',
                    file: Buffer.from(code)
                })
            }
            const evalBed = new MessageEmbed()
                .setTitle("Eval Executado:")
                .setDescription(`\`\`\`js\n${code}\n\`\`\`\n**Tempo de Execução:**\n\`\`\`\n${((stop[0] * 1e9) + stop[1]) / 1e6}ms \n\`\`\``)

                .setColor("GREEN")
            ctx.msg.reply({ embeds: [evalBed] })
        } catch (e) {
            const errBed = new MessageEmbed()
                .setTitle("Ocorreu um erro:")
                .setDescription(`\`\`\`js\n${e}\n\`\`\``)
                .setColor("RED")
            ctx.msg.reply({ embeds: [errBed] })
        }
    }
}