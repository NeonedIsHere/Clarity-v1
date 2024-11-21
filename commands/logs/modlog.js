const Discord = require('discord.js')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const modlog = new db.table("modlog")
const cl = new db.table("Color")
module.exports = {
    name: 'modlog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send({ content: `Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.` });  
 
          
        const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
        if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
        if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
        if (modlog.get(`${message.guild.id}.modlog`) === newChannel) return message.channel.send(`・Nouveau salon des logs de modération : \`${modlog.get(`${message.guild.id}.modlog`)}\``)
        else {
            modlog.set(`${message.guild.id}.modlog`, newChannel.id)
            message.channel.send(`・Nouveau salon des logs de modération : ${args[0]}`)

            const logs = modlog.get(`${message.guild.id}.modlog`)

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`${message.author.tag} à défini ce salon comme salon des logs de modération`)
                .setDescription(` Ce salon est désormais utilisé pour toutes les **logs de modération** du serveur\n Executeur : <@${message.author.id}>`)
                .setTimestamp()
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
            client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
        }
     
   
           
    
    
    }
    }
  