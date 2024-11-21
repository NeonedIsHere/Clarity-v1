const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'banid',
    description:"permet de bannir un utilisateur via son ID",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: " Vous n'avez pas les permissions pour bannir un utilisateur - [BAN_MEMBERS]" });
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send({ content: " Je n'ai pas la permission pour bannir des utilisateurs - [BAN_MEMBERS]" });
        if (!args[0]) return message.channel.send({ content: " Merci de fournir un utilisateur a bannir." })
        await client.users.fetch(args[0])
        .then(async user => {
            const reason = args.splice(1).join(' ') || "Aucune raison fournie"
            try {
                await message.guild.members.ban(user.id, {reason: reason }).then(() => {
                    message.channel.send({ content: `**${user.tag}** a été banni pour \`${reason}\`` })
                    const channel  = db.get(`modlog_${message.guild.id}`);
                    if (!channel) return;
                    const embed = new MessageEmbed()
                        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .addField("**Moderation**", "Ban")
                        .addField("**ID**", `${user.tag}`)
                        .addField("**Banned By**", message.author.username)
                        .addField("**Reason**", `${reason || "**Aucune raison fournie**"}`)
                        .addField("**Date**", message.createdAt.toLocaleString())
                        .setTimestamp();
                    var sChannel = message.guild.channels.cache.get(channel)
                    if (!sChannel) return;
                    return sChannel.send({ embeds: [embed] })
                })
            } catch (error) {
                null
            }
        })
        .catch(err => {return message.channel.send({ content: ' Cet utilisateur n\'est pas valide.'})
    })
    }
}