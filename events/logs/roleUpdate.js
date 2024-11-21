const axios = require('axios');         
const db = require("quick.db")
const Discord = require("discord.js");
const ms = require("ms")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
module.exports = async (client, oldRole, newRole) => {

    const color = db.get(`color_${oldRole.guild.id}`) === null ? client.config.prefix : db.get(`color_${oldRole.guild.id}`)
    let wass = db.get(`rolelog_${oldRole.guild.id}`);
    const logschannel = oldRole.guild.channels.cache.get(wass)
    let perms = {
        "1": "CREATE_INSTANT_INVITE",
        "2": "KICK_MEMBERS",
        "4": "BAN_MEMBERS",
        "8": "ADMINISTRATOR",
        "16": "MANAGE_CHANNELS",
        "32": "MANAGE_GUILD",
        "64": "ADD_REACTIONS",
        "128": "VIEW_AUDIT_LOG",
        "256": "PRIORITY_SPEAKER",
        "1024": "VIEW_CHANNEL",
        "1024": "READ_MESSAGES",
        "2048": "SEND_MESSAGES",
        "4096": "SEND_TTS_MESSAGES",
        "8192": "MANAGE_MESSAGES",
        "16384": "EMBED_LINKS",
        "32768": "ATTACH_FILES",
        "65536": "READ_MESSAGE_HISTORY",
        "131072": "MENTION_EVERYONE",
        "262144": "EXTERNAL_EMOJIS",
        "262144": "USE_EXTERNAL_EMOJIS",
        "1048576": "CONNECT",
        "2097152": "SPEAK",
        "4194304": "MUTE_MEMBERS",
        "8388608": "DEAFEN_MEMBERS",
        "16777216": "MOVE_MEMBERS",
        "33554432": "USE_VAD",
        "67108864": "CHANGE_NICKNAME",
        "134217728": "MANAGE_NICKNAMES",
        "268435456": "MANAGE_ROLES",
        "268435456": "MANAGE_ROLES_OR_PERMISSIONS",
        "536870912": "MANAGE_WEBHOOKS",
        "1073741824 ": "MANAGE_EMOJIS",
        "CREATE_INSTANT_INVITE": "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS": "KICK_MEMBERS",
        "BAN_MEMBERS": "BAN_MEMBERS",
        "ADMINISTRATOR": "ADMINISTRATOR",
        "MANAGE_CHANNELS": "MANAGE_CHANNELS",
        "MANAGE_GUILD": "MANAGE_GUILD",
        "ADD_REACTIONS": "ADD_REACTIONS",
        "VIEW_AUDIT_LOG": "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER": "PRIORITY_SPEAKER",
        "VIEW_CHANNEL": "VIEW_CHANNEL",
        "READ_MESSAGES": "READ_MESSAGES",
        "SEND_MESSAGES": "SEND_MESSAGES",
        "SEND_TTS_MESSAGES": "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES": "MANAGE_MESSAGES",
        "EMBED_LINKS": "EMBED_LINKS",
        "ATTACH_FILES": "ATTACH_FILES",
        "READ_MESSAGE_HISTORY": "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE": "MENTION_EVERYONE",
        "EXTERNAL_EMOJIS": "EXTERNAL_EMOJIS",
        "USE_EXTERNAL_EMOJIS": "USE_EXTERNAL_EMOJIS",
        "CONNECT": "CONNECT",
        "SPEAK": "SPEAK",
        "MUTE_MEMBERS": "MUTE_MEMBERS",
        "DEAFEN_MEMBERS": "DEAFEN_MEMBERS",
        "MOVE_MEMBERS": "MOVE_MEMBERS",
        "USE_VAD": "USE_VAD",
        "CHANGE_NICKNAME": "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES": "MANAGE_NICKNAMES",
        "MANAGE_ROLES": "MANAGE_ROLES",
        "MANAGE_ROLES_OR_PERMISSIONS": "MANAGE_ROLES_OR_PERMISSIONS",
        "MANAGE_WEBHOOKS": "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS": "MANAGE_EMOJIS"
         }
         if (oldRole.name !== newRole.name){
            const log = new Discord.MessageEmbed()
            .setColor(color)
            .addField(`Modification du role:`, `${newRole}`)
            .addField("Avant:", `**${oldRole.name}**`)
            .addField("Après:", `**${newRole.name}**`)
            .addField("Role ID:", `**${newRole.id}**`)
              .setFooter(` LuminaBots ${client.config.version}` )
            if(logschannel) logschannel.send({
                embeds: [log]
            }
            )
            }
          
            if (oldRole.color !== newRole.color){
                const log = new Discord.MessageEmbed()
               .setColor(color)
               .addField(`Modification de la couleur du role:`, `${newRole}`)
               .addField("Avant:", `**${oldRole.color.toString(16)}**`)
               .addField("Après:", `**${newRole.color.toString(16)}**`)
               .addField("Role ID:", `**${newRole.id}**`)
               .setFooter(` LuminaBots ${client.config.version}` )
              if(logschannel) logschannel.send({
                embeds: [log]
              }
              
              
              )
              } else {
                const log = new Discord.MessageEmbed()
                .setColor(color)
                .addField(`Modification du rôle:`, `${oldRole}`)
                .setDescription("Permissions du rôle changés")
                .addField("Anciennes perms:", `${/*perms[String(oldRole.permissions.bitfield)]*/oldRole.permissions.bitfield}`)
                .addField("Nouvelles perms:", `${/*perms[String(newRole.permissions.bitfield)]*/newRole.permissions.bitfield}`)
                .addField("Role ID:", `**${newRole.id}**`)
                .setFooter(` LuminaBots ${client.config.version}` )
                if(logschannel) logschannel.send(
                    {
                        embeds: [log]
                    }
                )
              } 


}