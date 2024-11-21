const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const { MessageEmbed } = require('discord.js')

module.exports = async (client, oldEmoji, newEmoji) => {

    const color = cl.fetch(`color_${oldEmoji.guild.id}`)

    let wass = db.get(`emojilog_${oldEmoji.guild.id}`);
  const logschannel = oldEmoji.guild.channels.cache.get(wass)
  let logs = new MessageEmbed()
  .setAuthor(oldEmoji.guild.name)
  .addField("Emoji modifié:", `${oldEmoji.name} -> ${newEmoji.name}`)
  .setFooter({text: ` LuminaBots ${client.config.version}` })
  .setColor(color)

  if(logschannel) logschannel.send({embeds: [logs]})
}