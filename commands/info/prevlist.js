const Discord = require('discord.js')
const db = require('quick.db')
const cl = new db.table("Color")
const { MessageButton , MessageActionRow } = require('discord.js')
module.exports = {
    name : "prevlist",
    description: "Le bot retourne le nombre d'utilisateurs enregistrés dans les prevnames",
    run: async(client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        // recupere toute la db prevname
        const data = await db.all().filter(data => data.ID.startsWith("prevname_")).sort((a, b) => b.data- a.data)
        if (data.length == 0) return message.channel.send("Aucun utilisateur n'a été enregistré dans la db `prevname`")
        const row = new MessageActionRow()
        row.addComponents(
            new MessageButton()
          .setLabel("SUPPORT")
          .setStyle("LINK")
          .setEmoji("1084532164256862408")
          .setURL("https://discord.gg/LuminaBots-fr")
        )
        const embed = new Discord.MessageEmbed()
        embed.setColor(color)
        embed.setTitle("List des utilisateurs enregistrés dans les prevnames")
        embed.setDescription(`\`${data.length}\` utilisateurs enregistrés dans la db: \`prevname\`
        \n `)
        embed.setTimestamp()
        embed.setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()})
        message.channel.send({embeds: [embed], components: [row]})
       
        

    }
}