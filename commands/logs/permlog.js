const Discord = require('discord.js')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const cl = new db.table("Color")
module.exports = {
    name: 'permlog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send({ content: `Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.` });  
 
          
        const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (db.get(`${message.guild.id}.alerteperm`) === newChannel) return message.channel.send(`Nouveau salon Perm Logs : \`${db.get(`${message.guild.id}.alerteperm`)}\``)
            else {
                db.set(`${message.guild.id}.alerteperm`, newChannel.id)
                message.channel.send(`Nouveau salon Perm Logs : ${args[0]}`)

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag} à défini ce salon comme PermLog`)
                    .setDescription(` Ce salon est désormais utilisé pour toutes **les Logs Permissions** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setColor(color)
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                client.channels.cache.get(db.get(`${message.guild.id}.alerteperm`)).send({ embeds: [embed] }).catch(console.error)
            }
     
   
           
    
    
    }
    }
  