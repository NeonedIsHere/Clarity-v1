const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }

module.exports = async (client, member, voiceChannel) => {
   const color = db.get(`color_${member.guild.id}`) === null? client.config.color:db.get(`color_${member.guild.id}`)

   let wass = db.get(`logvc_${member.guild.id}`);
      
   const logschannel = member.guild.channels.cache.get(wass)
      
        if(logschannel) logschannel.send(
            {
                embeds: [
                    new Discord.MessageEmbed()
        
        .setColor(color)
   .setDescription(`**${member.user.username}**#${member.user.discriminator} (\`${member.id}\`) s'est déconnecté du salon [\`${voiceChannel.name}\`](https://discord.com/channels/${voiceChannel.guild.id}/${voiceChannel.id})`)
   .setFooter(` LuminaBots ${client.config.version}` )
                ]
            }
        )
    
}
  
