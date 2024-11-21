const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const { MessageEmbed } = require('discord.js')


module.exports = async(client, guild, user) => {
    const color = cl.fetch(`color_${guild.id}`)
    let wass = db.get(`modlog_${guild.id}`);
    const logschannel = guild.channels.cache.get(wass)
    const logs = new MessageEmbed()
    .setAuthor(guild)
    .setDescription(`${user} viens d'être ban  (\`${user.id}\`)\n\`${user.tag}\``)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
    .setFooter({text: ` LuminaBots ${client.config.version}` })
    .setColor(color)
  
    if(logschannel) logschannel.send({embeds: [logs]})
}