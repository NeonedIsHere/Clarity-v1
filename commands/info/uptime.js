const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const ms = require('ms')
const cl = new db.table("Color")

module.exports = {
    name: "uptime",
    description: "calcul depuis quand le bot est en ligne",
    run: async(client, message, args) => {
        let totalSeconds = (client.uptime / 1000);
        let jours = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let heures = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let secondes = Math.floor(totalSeconds % 60);
        
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let uptimE = new Discord.MessageEmbed()
        .setColor(color)
        .addFields({
            name: "Uptime",
            value: `${jours} jours, ${heures} heures, ${minutes} minutes et ${secondes} secondes`,
        })
        message.channel.send({embeds: [uptimE]})
    }
}