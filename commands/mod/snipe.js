const Discord = require("discord.js")
const db = require('quick.db')
const cl = new db.table("Color")
const moment = require("moment")

const links = [
    'discord.gg',
    'dsc.bio',
    'www',
    'https',
    'http',
    '.ga',
    '.fr',
    '.com',
    '.tk',
    '.ml',
    '://',
    '.gg'
]


module.exports = {
    name: "snipe",
    description:"permet de voir les messages récemment supprimés",
    run: async(client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        let isLinkall = false

        const msg = client.snipes.get(message.channel.id)
        if (!msg) return message.channel.send("Aucun message n'a été supprimer récemment !")

        links.forEach(l => {
            if (msg.content.includes(l)) {
                isLinkall = true
            }
        })

        if (isLinkall == true) {
            const embedl = new Discord.MessageEmbed()
                .setDescription(`**${msg.author.tag}** \`\`\`discord.gg/******\`\`\``)
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
                .setColor(color)
            return message.channel.send({ embeds: [embedl] })
        }


        const embed = new Discord.MessageEmbed()
            .setDescription(`**${msg.author.tag}** \`\`\`${msg.content}\`\`\``)
            .setColor(color)
            .setFooter({ text: `LuminaBots ${client.config.version}`  })
        if (msg.image) embed.setImage(msg.image)

        message.channel.send({ embeds: [embed] })
    }
}
