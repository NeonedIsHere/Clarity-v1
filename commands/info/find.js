const Discord = require('discord.js')
const db = require("quick.db")
const moment = require('moment')
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
const cl = new db.table("Color")
module.exports = {
    name: "find",
    run: async(client, message, args, prefix) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let embed = new Discord.MessageEmbed()
            .setTitle("Recherche vocal du membre:\n" + member.user.username)
            .setColor(color)
            .addField(
                `Le membre est en vocal:`,
                member.voice.channel
                    ? `<#${member.voice.channel.id}>`
                    : `Le membre n'est pas en vocal.`,
                true
            )
            .setFooter({text: `LuminaBots ${client.config.version}` })
        message.channel.send({ embeds: [embed] })

    }
    }

