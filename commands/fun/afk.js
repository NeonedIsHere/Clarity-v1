const Discord = require('discord.js')
const db = require('quick.db')
const { Client, Message, MessageEmbed } = require('discord.js');
const { afk } = require("../../util/Collection") 

module.exports = {
    name: 'afk',
    aliases: [],
    description:"Faites part avec une raison que vous vous absentez. Lorsque vous êtes mentionnés la raison apparaîtra.",
    run: async (client, message, args, prefix) => {
       

        const reason = args.join(" ") || "Aucune raison donnée"

        afk.set(message.author.id, [ Date.now(), reason])

        const afkembed = new MessageEmbed()
        
        afkembed.setColor("RANDOM")
        afkembed.addFields({
            name: "Afk",
            value: `Vous êtes désormais AFK.\n`,
        },
        {
            name: "Raison",
            value: reason,
        },
        {
            name: "Utilisateur",
            value: `<@${message.author.id}>`,
        },
        {
            name: "\u200b",
            value: "\u200b",
        },
        )
        afkembed.setTimestamp()
        afkembed.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: client.user.displayAvatarURL(), style: "font-size: 12px !   important"})


        return message.channel.send({embeds: [afkembed]})

      
    }
}
  