const Discord = require("discord.js")
const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
module.exports = {
    name: 'annonce',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
       
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = client.config.color

            message.delete()

            if (!args.join(" ")) return message.reply("Rentrez votre message !");


            let embed = new MessageEmbed()

                .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024, }))
                .setImage(message.guild.bannerURL({ dynamic: true, size: 512 }))
                .setColor(color)
                .setDescription(`**Message de l'administration :** \n \`\`\`\n${args.join(" ")}\n\`\`\``)
                .setFooter({text: `LuminaBots ${client.config.version}` })
            message.channel.send({ content: '@everyone', embeds: [embed] })
        }
    }
}