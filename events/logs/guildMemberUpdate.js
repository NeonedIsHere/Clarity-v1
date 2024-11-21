const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const boostlog = new db.table("boostlog")
module.exports = async (client, oldMember, newMember) => {
    const { guild } = newMember;
    const oldStatus = oldMember.premiumSince;
    const newStatus = newMember.premiumSince;
    let color = cl.fetch(`color_${guild.id}`)
    if (color == null) color = client.config.color
    let wass = boostlog.get(`${guild.id}.logboosts`);
    const logschannel = guild.channels.cache.get(wass)
    if(!oldStatus && newStatus) {

        const boost1 = new Discord.MessageEmbed()
        
        .setColor(color)
        .setDescription(`**${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.id}\`) vient de boost le serveur !`)
        .setFooter(` LuminaBots ${client.config.version}` )
        if(logschannel) logschannel.send({
            embeds: [boost1]
        }
        )
    }

    if(oldStatus && !newStatus) {
        const boost2 = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`**${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.id}\`) a arrêter de boost le serveur !`)
        .setFooter(` LuminaBots ${client.config.version}` )
        if(logschannel) logschannel.send({
            embeds: [boost2]
        }
        )


        
    let wassx = boostlog.get(`${newMember.guild.id}.logboosts`);
    const logschannelss = newMember.guild.channels.cache.get(wassx)
    const fetchedLogs = await newMember.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_ROLE_UPDATE',
  })
  deletionLog = fetchedLogs.entries.first();
   // -- New roles
   if (oldMember.roles.cache.size < newMember.roles.cache.size) {
    let newroles = null;
    deletionLog.changes.forEach(r => {
        newroles = r.new
    });
  
  
  
          if (!deletionLog) return;
          if (!deletionLog) return;
          const { executor, target } = deletionLog;
          const boost3 = new Discord.MessageEmbed()
          .setColor(color)
    .setDescription(`**${executor.username}**#${executor.discriminator} (\`${executor.id}\`) a donné à **${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.user.id}\`) le(s) rôle(s): **${newroles.map(r => '\n<@&' + r.id + '>').join(", ")}**`)
    .setFooter(` LuminaBots ${client.config.version}` )
    .setAuthor(`➕ Ajout de rôle(s)`)
    if(logschannelss) logschannelss.send({
        embeds: [boost3]
    }
    )



} 
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        let newroles = null;
        deletionLog.changes.forEach(r => {
            newroles = r.new
        });
      
      
      
              if (!deletionLog) return;
              if (!deletionLog) return;
              const { executor, target } = deletionLog;
              const boost4 = new Discord.MessageEmbed()
              .setColor(color)
              .setDescription(`**${executor.username}**#${executor.discriminator} (\`${executor.id}\`) a retiré à **${newMember.user.username}**#${newMember.user.discriminator} (\`${newMember.user.id}\`) le(s) rôle(s): **${oldroles.map(r => '\n<@&' + r.id + '>').join(", ")}**`)
              .setFooter(` LuminaBots ${client.config.version}` )
              .setAuthor(`➖ Perte de rôle(s)`)
        if(logschannelss) logschannelss.send({
            embeds: [boost4]
        }
        )
    }
}
}
