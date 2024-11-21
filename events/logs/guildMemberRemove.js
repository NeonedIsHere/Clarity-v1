const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const joinleavelog = new db.table("joinleavelog")
const cl = new db.table("Color")
module.exports = async (client, member) => {
  if(member.partial) member = await member.fetch();
  let color = cl.fetch(`color_${member.guild.id}`)
  if (color == null) color = client.config.color
  let wass = joinleavelog.get(`${member.guild.id}.logjoinleave`)

  const logschannel = member.guild.channels.cache.get(wass)
  const join = new Discord.MessageEmbed()
  .setAuthor(member.guild.name)
  .setDescription(`<@${member.id}> vient de quitter ${member.guild.name} nous sommes maintenant ${member.guild.memberCount}`)
  .setFooter({text:` LuminaBots ${client.config.version}` , iconURL: member.displayAvatarURL()})
  .setColor(color)
  if(logschannel) logschannel.send({
    embeds: [join]
  }
  )

  

}

