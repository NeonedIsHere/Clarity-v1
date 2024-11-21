const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const cl = new db.table('Color');
module.exports = {
    name: 'tos',
    aliases: ['terms'],
    run: async (client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const embed = new MessageEmbed()
        .setTitle('Terms of Service')
        .setDescription("Merci à tous de prendre en compte les T.O.S de Discord, pour cela, cliquez ci-dessous https://discordapp.com/terms")
        .setColor(color)
        message.channel.send({embeds: [embed]})
    }
}