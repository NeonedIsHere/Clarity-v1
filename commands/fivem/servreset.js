const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const db = require('quick.db');
const fivem = require("discord-fivem-api");
const cl = new db.table('Color')
module.exports = {
    name: "servreset",
    description: "Définir l ip et le port du serveur fivem",
    category: "fivem",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande!");

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
      
            
           db.delete('server')
            let embed = new MessageEmbed()
            embed.setTitle("Fivem")
            embed.setDescription(`Le serveur a été réinitialisé avec succès`)
            embed.setColor(color)
            embed.setTimestamp()
            embed.setFooter({text: `LuminaBots ${client.config.version}` })
            message.channel.send({embeds: [embed]})
        
    }
}