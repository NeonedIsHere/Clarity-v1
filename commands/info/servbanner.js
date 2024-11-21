const Discord = require('discord.js')
const db = require("quick.db")
const moment = require('moment')
const axios = require('axios')
const fetch = require('node-fetch')
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
const cl = new db.table("Color")
module.exports = {
    name: "servbanner",
    run: async(client, message, args, prefix) => {
        let banner = message.guild.bannerURL()
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (banner) {

            const bannerembed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}`)
                .setColor(color)
                .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                .setFooter({text: `LuminaBots ${client.config.version}` })
            message.channel.send({ embeds: [bannerembed] })

        } else {
            const nobanner = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name}`)
                .setColor(color)
                .setDescription('Ce serveur ne possède pas de bannière')
                .setFooter({text: `LuminaBots ${client.config.version}` })
            message.channel.send({ embeds: [nobanner] })
        }
    }
    }

 