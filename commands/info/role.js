const { Client, Message, MessageEmbed } = require('discord.js');
const db =  require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name: 'role',
    aliases: [],
    description: 'Check Role of a User',
    usage: 'role <mention>',
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (member.bot) {
            return message.channel.send(
                new MessageEmbed()
              .setColor(color)
              .setTitle('Vous ne pouvez pas voir les bots.')
            )
        }

        if (!member) return message.channel.send(
            new MessageEmbed()
            .setColor(color)
            .setTitle('Veuillez mentionné un utilisateur.')
        )

    

            let description =
            `**Listes des Rôles de** ${member}\n\n` +
            member.roles.cache
            .filter((roles) => roles.id !== message.guild.id)
            .map((role) => role.toString())
            .join("\n")


        message.channel.send({ embeds:  [
            new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(description)
            .setColor(color)
        ]}
           
        )
    }
}