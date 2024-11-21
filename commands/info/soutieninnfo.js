const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
const cl = new db.table("Color")
module.exports = {
    name: "soutien-info",
    aliases: ['soutien-i'],
    run: async(client, message, args) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`Tu as besoin de la permission \`ADMINISTRATOR\`.`)
        let roleSoutien = db.get(`srole` + message.guild.id);
        if (!roleSoutien) {
            roleSoutien = `\`Aucun rôle n'est défini\``
        }

        let soutienStatut = db.get(`status${message.guild.id}`);
        if (!soutienStatut) {
            soutienStatut = `\`Aucun\``
        }


        let soutieni = new MessageEmbed()

        .setTitle(`${message.guild.name} Soutien Info`)
        .addField(`Rôle Soutien:`, roleSoutien)
        .addField(`Statut Soutien:`, soutienStatut)
        .setColor(color)
        .setFooter(`LuminaBots ${client.config.version}` )
        .setAuthor(`${client.user.username} `, `${client.user.displayAvatarURL()}`)

        message.channel.send({embeds: [soutieni]})

        
    }
}