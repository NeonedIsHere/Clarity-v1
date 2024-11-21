const Discord = require('discord.js')
const db = require('quick.db')
const syslog = new db.table("syslog")
const cl = new db.table("Color")
module.exports = {
    name: 'syslog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
           let guild = message.guild
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        db.set(`${message.guild.id}.logsys`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs sys`)

        
    }

    else if(args[0] === "off") {
        db.set(`${message.guild.id}.logsys`,null)
        message.channel.send(`Logs sys désactivés`)
        
    } else 
         if(ss) {
        db.set(`${message.guild.id}.logsys`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs sys`)


        const logs = guild.channels.cache.get(db.get(`${message.guild.id}.logsys`))

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs sys`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs sys** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
   logs.send({ embeds: [embed] })
    }


           
    
    
    }
    }
