const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const ml = new db.table("modlog")
const cl = new db.table("Color")
const p3 = new db.table("Perm3")
const fs = require('fs')
const moment = require('moment')

module.exports = {
    name: 'lock',
    aliases: [],
    description:"permet de verrouiller l'accès à des salons",
    run: async (client, message, args, prefix) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: " Vous n'avez pas les permissions utiliser cette commande - [ADMINISTRATOR]" });
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (args[0] === "all") {
            message.guild.channels.cache.forEach((channel, id) => {
                channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: false,
                })
            }, `Tous les salons lock par ${message.author.tag}`);

            message.channel.send(`${message.guild.channels.cache.size} salons fermés`);

            const channellogs = ml.get(`${message.guild.id}.modlog`)

            const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Modération • Type: **\`lock\`**`)
                .setDescription(`${message.author.tag} vient de lock tout les salons du serveur `)
                .setTimestamp()
                .setColor(color)
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
            client.channels.cache.get(channellogs).send({ embeds: [embed] }).catch(console.error)
            return
        }

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

        try {
            message.guild.roles.cache.forEach(role => {
                channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: false,
                });
            }, `Salon fermé par ${message.author.tag}`);
        } catch (e) {
            console.log(e);
        }
        message.channel.send(`Les membres ne peuvent plus parler dans <#${channel.id}>`);
    



    const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setTitle(`Modération • Type: **\`lock\`**`)
        .setColor(color)
        .setDescription(`<@${message.author.id}> a \`lock\` le salon <#${message.channel.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error)
    }
}

