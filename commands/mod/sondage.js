const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const ms = require("ms")
const cl = new db.table("Color")

module.exports = {
    name: "sondage",
    description:"permet de créer un sondage",
    run: async(client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            let nomsg_embed = new MessageEmbed()
            .setTitle(`Veuillez fournir un message !`)
            .setColor(color)
            .setFooter({text: `LuminaBots ${client.config.version}` })
            .setTimestamp();

        if(!args[0]) return message.channel.send({embeds: [nomsg_embed]})

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} viens de lancé un Sondage`)
            .setColor(color)
            .setDescription(`${args.join(" ")}`)
            .setFooter({text: `LuminaBots ${client.config.version}` });
        message.channel.send({embeds: [embed]}).then(msg => {
           msg.react("✅")
           msg.react("❌")
        })
        }

    }
}