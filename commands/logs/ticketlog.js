const Discord = require('discord.js')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const ticketlog = new db.table("ticketlog")
const cl = new db.table("Color")
module.exports = {
    name: 'ticketlog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send({ content: `Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.` });  
 
            let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
       

        const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0] || message.channelId);
            if (args[0] == undefined) args[0] = `<#${message.channel.id}>`
            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
            if (ticketlog.get(`${message.guild.id}.ticketlog`) === newChannel) return message.channel.send(`✉️・Nouveau salon des logs Tickets : \`${ticketlog.get(`${message.guild.id}.ticketlog`)}\``)
            else {
                
                ticketlog.set(`${message.guild.id}.ticketlog`, newChannel.id)
                message.channel.send(`✉️・Nouveau salon des logs Tickets : ${args[0]}`)

                const guild = message.guild;
                

                const logs = guild.channels.cache.get(ticketlog.get(`${message.guild.id}.ticketlog`))

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(`${message.author.tag} à défini ce salon comme salon des logs Ticket`)
                    .setDescription(`✉️ | Ce salon est désormais utilisé pour toutes les **logs Tickets** du serveur\n Executeur : <@${message.author.id}>`)
                    .setTimestamp()
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                logs.send({ embeds: [embed] })
            }  if(args[0] === "off") {
                ticketlog.set(`${message.guild.id}.ticketlog`, null)
                message.channel.send("Logs ticket reset avec succès")
            }
     
   
           
    
    
    }
    }
  