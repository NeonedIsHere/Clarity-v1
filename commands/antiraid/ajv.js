const db = require("quick.db");
const Discord = require("discord.js")
const { Message } = require('discord.js');
const owner = new db.table("Owner")
const wl = new db.table("Whitelist")
module.exports = {
   name: "antijoinvoc",
   description : "permet d'interdire un accès à un salon vocal",
   aliases: ["ajv"],
   /**
     * @param {Message} message
    */
    run : async(client, message, args) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id))  {
            if (args[0] == 'add') {

                const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1] || message.channelId);
                if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
                if (db.get(`${message.guild.id}.antivoc.${newChannel.id}`) === newChannel) return message.channel.send(`Le salon <#${db.get(`${message.guild.id}.antivoc.${newChannel}`)}> est désormais interdit\n**`)
                else {
                    db.set(`${message.guild.id}.antivoc.${newChannel.id}`, newChannel.id)
                    message.channel.send(`Le salon ${newChannel} est désormais interdit\n`)

                }
            }

            if (args[0] == 'remove') {

                const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1] || message.channelId);
                db.set(`${message.guild.id}.antivoc.${newChannel.id}`, null)
                message.channel.send({ content: `Le salon ${newChannel} n'est plus interdit` })

            }

            if (args[0] == 'clear') {

                db.delete(`${message.guild.id}.antivoc`)
                message.channel.send({ content: `Tous les salons interdit sont de nouveau autorisé` })

            }
        }
    }
}