const Discord = require('discord.js')
const db = require('quick.db')
const channellog = new db.table("channellog")
const cl = new db.table("Color")
module.exports = {
    name: 'channellog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        channellog.set(`${message.guild.id}.logchannels`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs de channels`)

        
    }

    else if(args[0] === "off") {
        channellog.set(`${message.guild.id}.logchannels`,null)
        message.channel.send(`Logs de channels désactivés`)
        
    } else 
         if(ss) {
        channellog.set(`${message.guild.id}.logchannels`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs de channels`)


        const logs = channellog.get(`${message.guild.id}.logchannels`)

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs de channels`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs de channels** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
    }


           
    
    
    }
    }
