const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const cl = new db.table("Color")
module.exports = {
    name: 'tempban',
    aliases: [],
    description:"permet de bannir temporairement un membre avec une durée et une raison donnée",
    run: async (client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (message.member.permissions.has("BAN_MEMBERS")){
            let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply(`❌ Aucune personne trouvée !`)

        let temps = args[1]
        let raison = args.slice(2).join(' ')
        if (!raison) raison = "Aucune raison donnée"
        if (isNaN(ms(temps))) return message.reply("🗣️ Veuillez un indiquer une durée !")
        member.ban(`Banni par ${message.author.tag} pendant ${temps} pour ${raison}`).catch(() => false)
        const embed = new MessageEmbed()
        .setDescription(`${member} Banni par ${message.author.tag} pendant ${temps} pour: ${raison}`)
        .setFooter({text: `LuminaBots ${client.config.version}` })
        .setColor(color)

        message.channel.send({embeds: [embed]})

        setTimeout(() => {
            member.unban(`Fin du tempban`).catch(() => false)
        }, ms(temps));
        }
    }
}