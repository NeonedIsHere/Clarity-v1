const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const { MessageEmbed } = require('discord.js')


module.exports = async(client, member, oldNickname, newNickname) => {
    const color = cl.fetch(`color_${member.guild.id}`)
    let guild = member.guild;
    let wass = guild.channels.cache.get(db.get(`${member.guild.id}.logsys`))
  const logschannel = member.guild.channels.cache.get(wass)
  let logs = new MessageEmbed()
  .setAuthor(member.guild.name)
  .addField("Modification du Membre:", `**${member.user.tag}**`)
  .addField(`Ancien nom:`, `${oldNickname}`)
  .addField("Nouveau nom:", `**${newNickname}**`)
  .setFooter({text: ` LuminaBots ${client.config.version}` })
  .setColor(color)

  if(logschannel) logschannel.send({embeds: [logs]})

}