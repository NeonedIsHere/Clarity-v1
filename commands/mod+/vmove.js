const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'vmove',
    description:"Permet de déplacer un membre dans votre salon vocal",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const membre = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`Tu as besoin de la permission \`MANAGE_MESSAGES\`.`)

        if(!membre) return message.channel.send(`Veuillez spécifiez le membre.`)
        if (!membre.voice.channel) return message.channel.send(`Ce membre n'est pas dans un salon vocal.`)
        if (!message.member.voice.channel) return message.channel.send("Veuillez rejoindre un salon vocal.")



        membre.voice.setChannel(message.member.voice.channel).then(() => {
            message.channel.send(`J\'ai déplacé ${membre.user.tag} dans votre salon vocal.`)
        })
    }
}