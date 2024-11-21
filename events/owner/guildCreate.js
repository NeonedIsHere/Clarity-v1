const axios = require('axios');         
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, guild) => {


   console.log(`J'ai rejoint le serveur ${guild.name} [${guild.memberCount}]`)
   if(db.get(`antijoinbot_${client.user.id}`) === null){
    let join = new MessageEmbed()
    .setAuthor(`Je viens de rejoindre ${guild.name} `)
    .addField("Owner :", `<@${guild.ownerId}>`)
   .addField("Membres : ", `${guild.memberCount}`)
    .setFooter({text:`LuminaBots ${client.config.version}` })
 
   let own = db.all().filter(data => data.ID.startsWith(`ownermd_${client.user.id}`)).sort((a, b) => b.data - a.data) 
  own.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
    client.users.cache.get(m.ID.split('_')[2]).send({embeds: [join]})
   })
 
 }else if(db.get(`antijoinbot_${client.user.id}`) === true){
  let join = new MessageEmbed()
  .setAuthor(`Je viens de rejoindre ${guild.name} `)
   .addField("Owner :", `<@${guild.ownerId}>`)
   .addField("Membres : ", `${guild.memberCount}`)
   .addField("J'ai quitter car l'antijoin du bot est actif", "secinv pour le désactiver")
    .setFooter({text:`LuminaBots ${client.config.version}` })
   let own = db.all().filter(data => data.ID.startsWith(`ownermd_${client.user.id}`)).sort((a, b) => b.data - a.data) 
   
 
   own.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
     client.users.cache.get(m.ID.split('_')[2]).send({embeds: [join]})
    })
   return guild.leave()
   }
}