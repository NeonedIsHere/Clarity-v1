const Discord = require('discord.js');

const db = require('quick.db')
const ticketlogg = new db.table("ticketlog");
const cl = new db.table("Color")
module.exports = {
    name: 'presetlog',
    aliases: [],

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send({ content: `Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.` });  
 



        message.channel.send({ content: `Création de la **catégorie** des logs en cours..` }).then(msge => {
        message.guild.channels.create(`${message.guild.name}・LOGS`, {
            type: "GUILD_CATEGORY",
            permissionsOverwrites: [{
                id: message.guild.id,
                deny: ['CONNECT', 'VIEW_CHANNEL'],
                allow: ['SEND_MESSAGES']
            }]
        }).then(c => {
           c.setPosition(0)
           c.guild.channels.create("📁・logs-messages", {
            type: "GUILD_TEXT",
            parent: c.id,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['CONNECT', 'VIEW_CHANNEL'],
                    allow: ['SEND_MESSAGES']
                },
            ],
           }).then(mess => {
            db.set(`msglog_${message.guild.id}`, mess.id)
            c.guild.channels.create("📁・logs-boosts", {
                type: "GUILD_TEXT",
                parent: c.id,
                permissionOverwrites: [
                    {
                        id: message.guild.id,
                        deny: ['CONNECT', 'VIEW_CHANNEL'],
                        allow: ['SEND_MESSAGES']
                    },
                ],}).then(boost => {
                    db.set(`logboosts_${message.guild.id}`, boost.id)
                    c.guild.channels.create("📁・logs-mod", {
                        type: "GUILD_TEXT",
                        parent: c.id,
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['CONNECT', 'VIEW_CHANNEL'],
                                allow: ['SEND_MESSAGES']
                            },
                        ],}).then(mod => {
                            db.set(`modlog_${message.guild.id}`, mod.id)
                            c.guild.channels.create("📁・logs-voc", {
                                type: "GUILD_TEXT",
                                parent: c.id,
                                permissionOverwrites: [
                                    {
                                        id: message.guild.id,
                                        deny: ['CONNECT', 'VIEW_CHANNEL'],
                                        allow: ['SEND_MESSAGES']
                                    },
                                ],}).then(voc => {
                                    db.set(`logvc_${message.guild.id}`, voc.id)
                                    c.guild.channels.create("📁・logs-sys", {
                                        type: "GUILD_TEXT",
                                        parent: c.id,
                                        permissionOverwrites: [
                                            {
                                                id: message.guild.id,
                                                deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                allow: ['SEND_MESSAGES']
                                            },
                                        ],}).then(sys => {
                                            db.set(`syslog_${message.guild.id}`, sys.id)
                                            c.guild.channels.create("📁・logs-antiraid", {
                                                type: "GUILD_TEXT",
                                                parent: c.id,
                                                permissionOverwrites: [
                                                    {
                                                        id: message.guild.id,
                                                        deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                        allow: ['SEND_MESSAGES']
                                                    },
                                                ],}).then(raid => {
                                                    db.set(`${message.guild.id}.raidlog`, raid.id)
                                                    c.guild.channels.create("📁・logs-rôles", {
                                                        type: "GUILD_TEXT",
                                                        parent: c.id,
                                                        permissionOverwrites: [
                                                            {
                                                                id: message.guild.id,
                                                                deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                                allow: ['SEND_MESSAGES']
                                                            },
                                                        ],}).then(role => {
                                                            db.set(`rolelog_${message.guild.id}`, role.id)
                                                            c.guild.channels.create("📁・logs-joinleave", {
                                                                type: "GUILD_TEXT",
                                                                parent: c.id,
                                                                permissionOverwrites: [
                                                                    {
                                                                        id: message.guild.id,
                                                                        deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                                        allow: ['SEND_MESSAGES']
                                                                    },
                                                                ],}).then(jl => {
                                                                    db.set(`joinleavelog_${message.guild.id}`, jl.id)
                                                                    c.guild.channels.create("📁・logs-salons", {
                                                                        type: "GUILD_TEXT",
                                                                        parent: c.id,
                                                                        permissionOverwrites: [
                                                                            {
                                                                                id: message.guild.id,
                                                                                deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                                                allow: ['SEND_MESSAGES']
                                                                            },
                                                                        ],}).then(salons => {
                                                                            db.set(`channellog_${message.guild.id}`, salons.id)
                                                                            c.guild.channels.create("📁・logs-emoji", {
                                                                                type: "GUILD_TEXT",
                                                                                parent: c.id,
                                                                                permissionOverwrites: [
                                                                                    {
                                                                                        id: message.guild.id,
                                                                                        deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                                                        allow: ['SEND_MESSAGES']
                                                                                    },
                                                                                ],}).then(emote => {
                                                                                    db.set(`emojilog_${message.guild.id}`, emote.id)
                                                                                    c.guild.channels.create("📁・logs-verif", {
                                                                                        type: "GUILD_TEXT",
                                                                                        parent: c.id,
                                                                                        permissionOverwrites: [
                                                                                            {
                                                                                                id: message.guild.id,
                                                                                                deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                                                                allow: ['SEND_MESSAGES']
                                                                                            },
                                                                                        ],}).then(verif => {
                                                                                            db.set(`${message.guild.id}.logverif`, verif.id)
                                                                                            c.guild.channels.create("📁・logs-ticket", {
                                                                                                type: "GUILD_TEXT",
                                                                                                parent: c.id,
                                                                                                permissionOverwrites: [
                                                                                                    {
                                                                                                        id: message.guild.id,
                                                                                                        deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                                                                        allow: ['SEND_MESSAGES']
                                                                                                    },]}).then(ticket => {
                                                                                                        ticketlogg.set(`${message.guild.id}.ticketlog`, ticket.id)
                                                                                                        c.guild.channels.create("📁・logs-perms", {
                                                                                                            type: "GUILD_TEXT",
                                                                                                            parent: c.id,
                                                                                                            permissionOverwrites: [
                                                                                                                {
                                                                                                                    id: message.guild.id,
                                                                                                                    deny: ['CONNECT', 'VIEW_CHANNEL'],
                                                                                                                    allow: ['SEND_MESSAGES']
                                                                                                                },]}).then(perm => {
                                                                                                                                db.set(`${message.guild.id}.alerteperm`, perm.id)
                                                                                                                            })
                                                                                
                                                                                                                
                                                                                        })

                                                                                        })
                                                                                })
                                                                        })
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                })
           })


           let success = new Discord.MessageEmbed()
           .setAuthor(message.guild.name)
           .setDescription(`La configuration des logs que vous avez demandé est terminer sur le serveur: ${message.guild.name}`)
           .setFooter(`LuminaBots ${client.config.version}` )
           .setColor(color)
           message.author.send({ embeds: [success] })

    })
})
     
   
           
    
    
    }
    }
  