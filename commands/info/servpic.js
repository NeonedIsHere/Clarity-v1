const Discord = require('discord.js')
const db = require("quick.db")
const moment = require('moment')
const axios = require('axios')
const fetch = require('node-fetch')
const cl = new db.table("Color")
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };

module.exports = {
    name: "servpic",
    run: async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let pic = message.guild.iconURL()
        if (pic) {

            const picembed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}`)
                .setColor(color)
                .setImage(message.guild.iconURL({ dynamic: true, size: 1024, }))
                .setFooter({text: `LuminaBots ${client.config.version}` })
            message.channel.send({ embeds: [picembed] })

        } else {
            const nopic = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}`)
                .setColor(color)
                .setDescription(`Ce serveur ne possède pas d'avatar`)
                .setFooter({text: `${getNow} LuminaBots ${client.config.version}`})
            message.channel.send({ embeds: [nopic] })
        }
    }
    }

 