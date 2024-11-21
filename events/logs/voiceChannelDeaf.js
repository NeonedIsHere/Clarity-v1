const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
module.exports = async (client, member, deafType, channel) => {
 const color = db.get(`color_${member.guild.id}`) === null? client.config.color:db.get(`color_${member.guild.id}`)

 let wass = db.get(`logvc_${member.guild.id}`);
 var fetchedLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_UPDATE',
})
var deletionLog = await fetchedLogs.entries.first();

var { executor, extra } = deletionLog;

 const logschannel = member.guild.channels.cache.get(wass)



    if(logschannel) logschannel.send({
        embeds: [new Discord.MessageEmbed()
            .setColor(color)
           .setDescription(`**${executor.username}**${executor.discriminator} (\`${executor.id}\`) a retiré la permissions d'écouter a **${member.user.username}**#${member.user.discriminator} (\`${member.id}\`) dans le salon [\`${channel.name}\`](https://discord.com/channels/${channel.guild.id}/${channel.id})`)
            .addField("Type de mute:", `${deafType}`)
            .setFooter(` LuminaBots ${client.config.version}` )
            .setAuthor("🔇 Mute casque d'un membre")
        ]
    }
    )


  

}
  
