const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, guild) => {

   console.log(`J'ai quitter le serveur ${guild.name} [${guild.memberCount}]`)
   let leave = new MessageEmbed()
   .setAuthor(`Je viens de quitter ${guild.name} `)
   .addField("Owner :", `<@${guild.ownerId}>`)
   .addField("Membres : ", `${guild.memberCount}`)
   .setFooter({text:`LuminaBots ${client.config.version}` })
   client.config.owner.forEach(u => client.users.cache.get(u).send({embeds: [leave]}))
  
}