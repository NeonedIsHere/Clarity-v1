const Discord = require('discord.js')
const db = require('quick.db')
const emojilog = new db.table("emojilog")
const cl = new db.table("Color")
module.exports = {
    name: 'emojilog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        emojilog.set(`${message.guild.id}.logemojis`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs d'Emojis`)

        
    }

    else if(args[0] === "off") {
        emojilog.set(`${message.guild.id}.logemojis`,null)
        message.channel.send(`Logs de emojis désactivés`)
        
    } else 
         if(ss) {
        emojilog.set(`${message.guild.id}.logemojis`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs d'Emojis`)


        const logs = emojilog.get(`${message.guild.id}.logemojis`)

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs d'Emojis`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs d'Emojis** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
    }


           
    
    
    }
    }
