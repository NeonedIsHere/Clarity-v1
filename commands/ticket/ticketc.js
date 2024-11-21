const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const ct = new db.table("CategorieTicket")
const { MessageActionRow, MessageSelectMenu } = require('discord.js')
const fs = require("fs")
const ms = require("ms")

module.exports = {
    name: "ticketc",
    run: async (client, message, args, prefix, color) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ) {
            const funny = message.guild.channels.cache.filter(x => x.type === "GUILD_CATEGORY")

            const newCategorie = message.guild.channels.cache.get(args[0] || funny.id);
            if (!newCategorie) return message.channel.send({ content: "Aucun catégorie trouvé !" })
            if (ct.get(`${message.guild.id}.categorie`) === newCategorie) return message.channel.send(`📧 | __Nouvelle catégorie :__ \`${ct.get(`${message.guild.id}.categorie`)}\``)
            else {
                ct.set(`${message.guild.id}.categorie`, args[0])
                message.channel.send(`📧 | __Nouvelle catégorie :__ ${newCategorie.name}`)
            }
     }

        }
    }
