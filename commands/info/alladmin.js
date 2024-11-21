const Discord = require('discord.js')
const db = require('quick.db')
const { Client, Message, MessageEmbed } = require('discord.js');
const cl = new db.table("Color")

module.exports = {
    name: 'alladmin',
    aliases: [],
    run: async (client, message, args, prefix) => {
       
         let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const tempdata = []
        const allMember = await message.guild.members.fetch()
        allMember.filter(
            (m) => m.permissions.has('ADMINISTRATOR')
        ).map(m => tempdata.push(m.user.id))

        let noembed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription("Aucun Admin")
        .setTitle("Admin Liste")
        .setTimestamp()
        .setFooter({text: `LuminaBots ${client.config.version}` })
    if (tempdata.length === 0) return message.channel.send({embeds: [noembed]})
    try {
        let tdata = await message.channel.send("chargement. . .")

        let p0 = 0;
        let p1 = 10;
        let page = 1;

        let embed = new Discord.MessageEmbed()

        embed.setTitle(`Nombre d admins : ${tempdata.length}`)
            .setColor(color)
            .setDescription(tempdata
                .filter(x => message.guild.members.cache.get(x))
                .map(r => r)
                .map((user, i) => `${i + 1} ・ **<@${message.guild.members.cache.get(user).user.id}>** [\`${message.guild.members.cache.get(user).user.id}\`]`)
                .slice(0, 10)
                .join('\n') + `\n\nPage **${page}** / **${Math.ceil(tempdata.length / 10)}**`)
            .setTimestamp()
             .setFooter({text: `LuminaBots ${client.config.version}` })

        let reac1
        let reac2
        let reac3

        if (tempdata.length > 10) {
            reac1 = await tdata.react("⬅");
            reac2 = await tdata.react("❌");
            reac3 = await tdata.react("➡");
        }

        tdata.edit({content: null, embeds: [embed]});

        const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

        data_res.on("collect", async (reaction) => {

            if (reaction.emoji.name === "⬅") {

                p0 = p0 - 10;
                p1 = p1 - 10;
                page = page - 1

                if (p0 < 0) {
                    return
                }
                if (p0 === undefined || p1 === undefined) {
                    return
                }


                embed.setDescription(tempdata
                    .filter(x => message.guild.members.cache.get(x))
                    .map(r => r)
                    .map((user, i) => `${i + 1} ・  **<@${message.guild.members.cache.get(user).user.id}>** [\`${message.guild.members.cache.get(user).user.id}\`]`)
                    .slice(p0, p1)
                    .join('\n') + `\n\nPage **${page}** / **${Math.ceil(tempdata.length / 10)}**`)
                tdata.edit({embeds: [embed]});

            }

            if (reaction.emoji.name === "➡") {

                p0 = p0 + 10;
                p1 = p1 + 10;

                page++;

                if (p1 > tempdata.length + 10) {
                    return
                }
                if (p0 === undefined || p1 === undefined) {
                    return
                }


                embed.setDescription(tempdata
                    .filter(x => message.guild.members.cache.get(x))
                    .map(r => r)
                    .map((user, i) => `${i + 1} ・ **<@${message.guild.members.cache.get(user).user.id}>** [\`${message.guild.members.cache.get(user).user.id}\`]`)
                    .slice(p0, p1)
                    .join('\n') + `\n\nPage **${page}** / **${Math.ceil(tempdata.length / 10)}**`)
                tdata.edit({embeds: [embed]});

            }

            if (reaction.emoji.name === "❌") {
                data_res.stop()
                await tdata.reactions.removeAll()
                return tdata.delete();
            }

            await reaction.users.remove(message.author.id);

        })

    } catch (err) {
        console.log(err)
    }
    }
}
  