const Discord = require('discord.js')
const db = require('quick.db')
const voicelog = new db.table("voicelog")
const cl = new db.table("Color")
module.exports = {
    name: 'voicelog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        db.set(`${message.guild.id}.logvoice`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs de vocal`)

        
    }

    else if(args[0] === "off") {
        db.set(`${message.guild.id}.logvoice`,null)
        message.channel.send(`Logs vocal désactivés`)
        
    } else 
         if(ss) {
        db.set(`${message.guild.id}.logvoice`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs de vocal`)


        const logs = guild.channels.cache.get(db.get(`${message.guild.id}.logvoice`))

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs de voice`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs vocal** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    logs.send({embeds: [embed]})}
    


           
    
    
    }
    }
