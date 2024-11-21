const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const {afk} = require("../../util/Collection")
const moment = require("moment")
module.exports = (client, message) => {
    if (!message.guild || message.author.bot) return;

    const mentionedMember = message.mentions.members.first()
    if (mentionedMember) {
      const data = afk.get(mentionedMember.id)
  
      if (data) {
        const [timestamp, reason] = data
        const timeAgo = moment(timestamp).fromNow()
  
        const afkembed = new Discord.MessageEmbed()
        
        afkembed.setColor("RANDOM")
        afkembed.addFields(
          {
            name: "Afk",
            value: `**${mentionedMember}** est AFK.\n`,
          },
          {
            name: "Raison",
            value: reason,
          },
          {
            name: "Date d'afk",
            value: timeAgo,
          }
          
        )
        afkembed.setTimestamp()
        afkembed.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: client.user.displayAvatarURL()})
        afkembed.setThumbnail(mentionedMember.displayAvatarURL({ dynamic: true }))
        afkembed.setAuthor({ name: `LuminaBots ${client.config.version} AFK System`, iconURL: mentionedMember.displayAvatarURL({ dynamic: true })})



       
        
        message.channel.send({ embeds: [afkembed] })

      }
    }
  
    const getData = afk.get(message.author.id)
    if (getData) {
      afk.delete(message.author.id)
      const finafk = new Discord.MessageEmbed()

      finafk.setColor("RANDOM")
      finafk.setAuthor({name: `${message.author.tag}`})
      finafk.setDescription(`Je viens d'enlever votre afk!`)
      message.channel.send({ embeds: [finafk] })
       }
    }


