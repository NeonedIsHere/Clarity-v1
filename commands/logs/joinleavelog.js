const Discord = require('discord.js')
const db = require('quick.db')
const joinleavelog = new db.table("joinleavelog")
const cl = new db.table("Color")
module.exports = {
    name: 'joinleavelog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        joinleavelog.set(`${message.guild.id}.logjoinleave`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs de join/leave`)

        
    }

    else if(args[0] === "off") {
        joinleavelog.set(`${message.guild.id}.logjoinleave`,null)
        message.channel.send(`Logs de join/leave désactivés`)
        
    } else 
         if(ss) {
        joinleavelog.set(`${message.guild.id}.logjoinleave`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs de join/leave`)


        const logs = joinleavelog.get(`${message.guild.id}.logjoinleave`)

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs de join/leave`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs de join/leave** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
    }


           
    
    
    }
    }
