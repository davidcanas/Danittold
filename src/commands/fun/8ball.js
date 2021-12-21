const Discord = require("discord.js")
const Command = require('../../structures/Command')
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            description: 'Pergunte algo ao mestre danitto 😏',
            category: "🎉 Diversão",
            identifier: "fun",
            options: [
                {
                    name: 'question',
                    description: 'O que perguntar ao mestre danitto ?',
                    type: 'STRING',
                    required: true
                }
            ]
        })
    }

    run = async (ctx) => {
        function getRandom(array) {
            const auxArray = Array.from(array)
            auxArray.reduce((acc, curr, i, a) => a[i] = acc + curr.chance, 0)

            return array[auxArray.findIndex(w => w > Math.random() * auxArray[auxArray.length - 1])]
        }
        let answer = getRandom([
            { r: "Sim", chance: 5 },
            { r: "Não", chance: 5 },
            { r: "Talvez", chance: 5 },
            { r: "Meu informante disse que não...", chance: 4 },
            { r: "Claro que sim", chance: 4 },
            { r: "Claro que não", chance: 4 },
            { r: "Isso é um mistério", chance: 4 },
            { r: "Não posso dizer", chance: 4 },
            { r: "Quem sabe?", chance: 4 },
            { r: "Não conte comigo para isso", chance: 4 },
            { r: "Eu não sei, tente de novo.", chance: 4 },
            { r: "Provavelmente", chance: 4 },
            { r: "Dúvido muito...", chance: 4 },
            { r: "Um dia quem sabe...", chance: 4 },
            { r: "Felizmente", chance: 4 },
            { r: "Infelizmente", chance: 4 },
            { r: "🙏 Espero que Sim", chance: 4 },
            { r: "Só em 2038", chance: 4 },
            { r: "Quem discordar é cringe", chance: 4 },
            { r: "Provavelmente Não", chance: 4 },
            { r: "Provavelmente Sim", chance: 4 },
            { r: "Apenas eu sei 🤨", chance: 4 },
            { r: "Apenas Albert Einstein sabe ", chance: 4 },
            { r: "É segredo!", chance: 4 },
            { r: "Parabéns! Você encontrou uma mensagem secreta com 1% de chance de aparecer", chance: 1 },


        ])

        let args;
        if (ctx.msg.options) {
            args = ctx.msg.options.getString("type")
        } else {
            args = ctx.args.join(' ')
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('🔮 8ball')
            .setColor('YELLOW')
            .setDescription(`${ctx.commandAuthor} fez uma pergunta: \n **Pergunta:** \n ${args} \n **Resposta:** \n ${answer.r}`)
            .setImage('https://www.imagensanimadas.com/data/media/134/linha-divisoria-imagem-animada-0258.gif')
            .setFooter(`Há ${answer.chance}% de hipotese de esta resposta aparecer!`)
        await ctx.msg.reply({ embeds: [embed] });

    }
}