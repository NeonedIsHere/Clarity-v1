const Discord = require('discord.js')
const db = require('quick.db')
const cl = new db.table("Color")
const raidlog = new db.table("raidlog")
module.exports = {
    name: 'raidlog',
    aliases: [],

    run: async (client, message, args) => {
          const color = await cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        const guild = message.guild
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        raidlog.set(`${message.guild.id}.raidlog`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les logs de raid`)

        
    }

    else if(args[0] === "off") {
        raidlog.set(`${message.guild.id}.raidlog`,null)
        message.channel.send(`Logs de raid désactivés`)
        
    } else 
         if(ss) {
            raidlog.set(`${message.guild.id}.raidlog`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les logs de raid`)


        const logs =  guild.channels.cache.get(db.get(`${message.guild.id}.raidlog`))

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon des logs de raid`)
        .setDescription(` Ce salon est désormais utilisé pour toutes les **logs de raid** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    logs.send({ embeds: [embed] })
    }


           
    
    
    }
    }
