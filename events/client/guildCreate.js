const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, guild) => {


   if(db.get(`antijoinbot_${client.user.id}`) === null){
    let join = new MessageEmbed()
    .setAuthor(`Je viens de rejoindre ${guild.name} `)
    .addField("Owner :", `<@${guild.ownerId}>`)
   .addField("Membres : ", `${guild.memberCount}`)
    .setFooter({text:`LuminaBots ${client.config.version}` })
 client.config.owner.forEach(u => client.users.cache.get(u).send({embeds: [join]}))

 
 }else if(db.get(`antijoinbot_${client.user.id}`) === true){
  let join = new MessageEmbed()
  .setAuthor(`Je viens de rejoindre ${guild.name} `)
  .addField("Owner :", `<@${guild.ownerId}>`)
   .addField("Membres : ", `${guild.memberCount}`)
   .addField("J'ai quitter car l'antijoin du bot est actif", "secinv pour le désactiver")
    .setFooter({text:`LuminaBots ${client.config.version}` })

   client.config.owner.forEach(u => client.users.cache.get(u).send({embeds: [join]}))
   return guild.leave()
   }
}