const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const { MessageEmbed } = require('discord.js')

module.exports = async (client, oldChannel, newChannel) => {

    const color = cl.fetch(`color_${oldChannel.guild.id}`)

    let wass = db.get(`channellog_${oldChannel.guild.id}`);
    const logschannel = oldChannel.guild.channels.cache.get(wass)
    let types = {
        text: "Text Channel",
        voice: "Voice Channel",
        null: "No Type",
        news: "News Channel",
        store: "Store Channel",
        category: "Category",
      }
      if(oldChannel.name != newChannel.name) {
       
        let logs = new MessageEmbed()
        .setAuthor(oldChannel.guild.name)
        .addField("Modification du channel:", `<#${oldChannel.id}>`)
        .setDescription(`Ancien nom: ${oldChannel.name} -> nouveau nom: ${newChannel.name}`)
        .setFooter({text: ` LuminaBots ${client.config.version}` })
        .setColor(color)
        if(logschannel) logschannel.send({embeds: [logs]})
      }


      else if(oldChannel.type != newChannel.type) {
       
        let logs = new MessageEmbed()
        .setAuthor(oldChannel.guild.name)
        .addField("Modification du channel:", `<#${oldChannel.id}>`)
        .setDescription(`Ancien type: ${oldChannel.type} -> Nouveau type: ${newChannel.type}`)
        .setFooter({text: ` LuminaBots ${client.config.version}` })
        .setColor(color)
        if(logschannel) logschannel.send({embeds: [logs]})
      }

      else if(oldChannel.topic != newChannel.topic) {
       
        let logs = new MessageEmbed()
        .setAuthor(oldChannel.guild.name)
        .addField("Modification du channel:", `<#${oldChannel.id}>`)
        .setDescription(`Ancien topic: ${oldChannel.topic} -> Nouveau type: ${newChannel.topic}`)
        .setFooter({text: ` LuminaBots ${client.config.version}` })
        .setColor(color)
        if(logschannel) logschannel.send({embeds: [logs]})
      }


  


  
}