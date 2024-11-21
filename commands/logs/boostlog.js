const Discord = require('discord.js')
const db = require('quick.db')
const boostlog = new db.table("boostlog")
const cl = new db.table("Color")
module.exports = {
    name: 'boostlog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        boostlog.set(`${message.guild.id}.logboosts`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs de Boosts`)

        
    }

    else if(args[0] === "off") {
        boostlog.set(`${message.guild.id}.logboosts`,null)
        message.channel.send(`Logs de Boosts désactivés`)
        
    } else 
         if(ss) {
        boostlog.set(`${message.guild.id}.logboosts`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs de Boosts`)


        const logs = boostlog.get(`${message.guild.id}.logboosts`)

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs de boosts`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs de boosts** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
    }


           
    
    
    }
    }
