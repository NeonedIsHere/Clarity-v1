const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const owner = new db.table("Owner")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const { Util } = require("discord.js")
module.exports = {
    name : "create",
    aliases: ["addemoji"],
    run: async(client, message, args, prefix) => {

        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)
        

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) ) {
          
            if (!args.length) return message.channel.send({ content: "Veuillez spécifier l'émoji" })

            for (const rawEmoji of args) {
                const parsedEmoji = Util.parseEmoji(rawEmoji)

                
                if (parsedEmoji.id) {
                    const extension = parsedEmoji.animated ? ".gif" : ".png"
                    const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`
                    message.guild.emojis.create(url, parsedEmoji.name)
                        .then((emoji) => message.channel.send({ embeds: [new MessageEmbed()
                        .setColor(client.config.color)
                        .addFields({
                            name: "Emojis créés",
                            value: `${emoji}`,
                        
                        }, {
                            name: "ID",
                            value: `${parsedEmoji.id}`
                        }, {
                            name: "Nom",
                            value: `${parsedEmoji.name}`
                        }, {
                            name: "URL",
                            value: `${url}`
                        }, {
                            name: "Ajouté par",
                            value: `${message.author}`
                        })
                        .setImage("https://cdn.discordapp.com/emojis/" + parsedEmoji.id + extension)
                        .setFooter({text: "LuminaBots V1", iconURL: client.user.displayAvatarURL()})
                        ]}))
                }

    }
}
    }
}
  