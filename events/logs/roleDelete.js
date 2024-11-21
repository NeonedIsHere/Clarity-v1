const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
module.exports = async (client, role) => {

    const color = db.get(`color_${role.guild.id}`) === null ? client.config.prefix : db.get(`color_${role.guild.id}`)
  let wass = db.get(`rolelog_${role.guild.id}`);
  const logschannel = role.guild.channels.cache.get(wass)
  const log = new Discord.MessageEmbed()
  .setColor(color)
  .addField(`Suppression du role:`, `${role.name}`)
  .addField("Role ID:", `**${role.id}**`)
  .addField("Couleur du Rôle:", `**${role.hexColor}**`)
  .addField("Position du Rôle", `**${role.position}**`)
  .setFooter(` LuminaBots ${client.config.version}` )
  
  

  if(logschannel) logschannel.send({
    embeds: [log]
  }
  )

}