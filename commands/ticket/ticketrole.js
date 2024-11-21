const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const rolestaff = new db.table("Rolestaff")
const fs = require("fs")
const ms = require("ms")
const cl = new db.table("Color")
module.exports = {
    name: "ticketrole",
    run : async(client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ) {
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            if (!role) return message.channel.send({ content: `Merci de spécifiez le rôle à ajouter` })


            let succes = new Discord.MessageEmbed()
            
            .setColor(color)
            .setDescription(`Le rôle \`${role.name}\` a été ajouté à la liste des rôles ayant la perm ticket`)
            .setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL({dynamic: true})})
            message.channel.send({embeds: [succes]})
            rolestaff.set(`rolestaff_${message.guild.id}`, role.id)

        }
    }
}