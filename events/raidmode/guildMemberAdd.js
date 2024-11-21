const Discord = require('discord.js')
const db = require("quick.db")
const cl = new db.table("Color")
const rlog = new db.table("raidlog")
const rm = new db.table("raidmode")
module.exports = async (client, member) => {

    if (rm.get(`raidmode_${member.guild.id}`) === "on") {
        let color = cl.fetch(`color_${member.guild.id}`)
        member.kick("RaidMode du serveur activé")
        const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${member} à été **kick** pour avoir \`rejoint pendant que le serveur était en RaidMode\``)
            .setFooter({text: `LuminaBots ${client.config.version}` })
        client.channels.cache.get(rlog.fetch(`${member.guild.id}.lograid`)).send({ embeds: [embed] }).catch(console.error)
    }

}