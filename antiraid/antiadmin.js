const Discord = require ("discord.js");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const antia = new db.table("Antiadmin")
module.exports = {
    name: "antiadmin",
    description: "Active ou désactive le module anti-admin pour empêcher les administrateurs de modifier certains paramètres",

    run : async(client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {

            if (args[0] == "on") {
                antia.set(`${message.guild.id}.antiadmin`, true)
                const embed = new MessageEmbed()
                .setColor(color)
                .setDescription(`Module: Anti-Admin activé avec succès\n
                Activé par: ${message.author}`)
                .setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL()})
                }
                message.channel.send({embeds: [embed]})
        }
       else  if (args[0] == "off") {
            antia.set(`${message.guild.id}.antiadmin`, false)
            const embed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Module: Anti-Admin désactivé avec succès\n
             Désactivé par: ${message.author}`)
          .setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL()})
          message.channel.send({embeds: [embed]})
        } else {
            return message.channel.send({content: `merci de préciser le paramètre "on" ou "off"`, ephemeral: true})
        }
    }
    }
