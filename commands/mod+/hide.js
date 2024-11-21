const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const p2 = new db.table("Perm2")
const ml = new db.table("modlog")
const p3 = new db.table("Perm3")
const cl = new db.table("Color")
module.exports = {
    name : "hide",
    description:"permet de cacher un salon aux membres.",
    aliases: [],
    run: async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)


        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) )  {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

            try {
                message.guild.roles.cache.forEach(role => {
                    channel.permissionOverwrites.edit(message.guild.id, {
                        VIEW_CHANNEL: false,
                    });
                }, `Salon caché par ${message.author.tag}`);
            } catch (e) {
                console.log(e);
            }
            message.channel.send(`Les membres ne peuvent plus voir le salon <#${channel.id}>`);
        }

        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`<@${message.author.id}> a utilisé la commande \`hide\` dans le channel \`<#${message.channel.id}>\``)
            .setTimestamp()
            .setFooter({ text: `LuminaBots ${client.config.version}`  })
        client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error)

    }
}

