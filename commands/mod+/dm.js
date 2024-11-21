const Discord = require("discord.js")
const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
module.exports = {
    name: 'dm',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    aliases: ['mp'],
    description:"permet d\'envoyer un dm à quelqu'un via le bot",
    run: async(client, message, args) => {
       
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = client.config.color
            const user = message.mentions.users.first()
            const msg = args.slice(1).join(" ")

            if (!user) return message.reply(`Veuillez mentionner la personne à qui vous souhaitez envoyé un message privé`)
            if (!msg) return message.reply(`Veuillez écrire le message qui sera envoyé`)

            user.send(`${msg}`).then(() => {
                return message.reply("Le MP à bien été envoyé")
            }).catch(() => {
                return message.reply("Les MP de l'utilisateur sont fermé ")
            })
        }
    }
}