const Discord = require('discord.js')
const db = require('quick.db')
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")

module.exports = {
    name: "idle",
    run: async (client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.buyer.includes(message.author.id) || db.get(`buyermd.${message.author.id}`)) {

            // via cette commande le bot se met en ne pas déranger

            client.user.setPresence({status: 'idle'})
            return message.channel.send({
                embeds: [new MessageEmbed()
                  .setColor(color)
                  .setDescription(`**${message.author.username}**, vous avez défini le status de votre bot en : absent!`)
                  .setFooter({text: 'LuminaBots ${client.config.version}` ${client.config.version}', iconURL: client.user.displayAvatarURL()})
                  
                ]
            })

        }
    }
}