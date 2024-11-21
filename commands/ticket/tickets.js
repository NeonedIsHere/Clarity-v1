const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require("fs")
const ms = require("ms")
const cl = new db.table("Color")
module.exports = {
    name: "ticket",
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ) {
            message.delete()
              let ticketb = new Discord.MessageButton()
                .setCustomId('ticketo')
                .setEmoji("📧")
                .setStyle("PRIMARY")
                const row = new MessageActionRow()
                    .addComponents(ticketb);

            message.channel.send({
                embeds: [{
                    title: `__Support ${message.guild.name}__`,
                    description: `**Pour ouvrir un Ticket cliquez sur le bouton ci-dessous**`,
                    color: color,
                    footer: { text: `LuminaBots ${client.config.version}`  }
                }],
                components: [row]
            })
     }

        }
    }
