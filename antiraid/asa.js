const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
module.exports = {
    name: 'antiscam',
    description:"permet à un utilisateur ayant les permissions nécessaires de protéger le serveur Discord contre les scams",
    aliases: [],
    run: async (client, message, args, prefix, guild) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
   
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            if (!args.length) return message.channel.send({ content: `Merci de préciser un mode : \`antiscam <on/off>\`` })
            const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
            if (args[0] === "on") {
                db.set(`antiscam_${message.guild.id}`, true)
                channels.forEach(channel => {
                    channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                        SEND_MESSAGES: false,
                        CONNECT: false
                    })
                })
                let def= new Discord.MessageEmbed()
                .setDescription(`${message.guild.name} sera protéger par l'antiscam !`)
                .setColor(color)
                .setFooter(`LuminaBots ${client.config.version}` )
                message.channel.send({ embeds: [def] })

            }

            if(args[0] === "off") {
                channels.forEach(channel => {
                    channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                        SEND_MESSAGES: true,
                        CONNECT: true
                    })
                })
                db.set(`antiscam_${message.guild.id}`, null)
                let def= new Discord.MessageEmbed()
                .setDescription(`${message.guild.name} ne sera plus protéger par l'antiscam !`)
                .setColor(color)
                .setFooter(`LuminaBots ${client.config.version}` )
                message.channel.send({ embeds: [def] })
            }
        }
    }
}  