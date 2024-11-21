const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const ms = require("ms")
const cl = new db.table("Color")

module.exports = {
    name: "derankall",
    description:"permet de retirer tous les rôles à tous les membres du serveur.",
    run: async (client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            const embedarray = []
            const perms = [
                "ADMINISTRATOR",
                "MANAGE_GUILD",
                "MANAGE_ROLES",
                "MANAGE_CHANNELS",
                "BAN_MEMBERS",
                "KICK_MEMBERS",
                "MANAGE_WEBHOOKS",
            ];
            let value = false
            try {
                message.guild.members.cache.map((m) => {

                    m.roles.cache.map((r) => {
                        if (r.managed) return;
                        if (r.id === r.guild.id) return;
                        if (m.id === client.user.id) return;
                        embedarray.push({
                            mid: `<@` + m.id + `>`,
                            rid: ` -> ` + `<@&` + r.id + `>`
                        })
                        perms.forEach((p) => {
                            if (r.permissions.has(p)) {
                                m.roles.remove(r.id);
                            } else {
                            }
                        });
                    });
                });
                value = true
            } catch {
                message.reply("Erreur !");
                value = false
            }
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("Voici les personnes qui ont été derank")
                .setDescription(`**${embedarray.map(e => e.mid + e.rid).join("\n")}**`)
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
            if (value = true) message.channel.send({ embeds: [embed] })

            const alert = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`${message.author.tag} à effectué un derank all`)
                .setDescription(`Toutes les personnes possédant des permissions **Dangereuses** ont été derank`)
                .setTimestamp()
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
           message.author.send({embeds: [alert]})
        }

        }
    }
