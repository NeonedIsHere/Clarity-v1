const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
module.exports = {
    name: "setconfess",
    description:"Permet de définir un salon pour les confessions.",
    run: async(client, message, args) => {
        
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: `Tu as besoin de la permission \`ADMINISTRATOR\`.` })

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send({ content: `Merci de mentionner le channel pour les confessions.` })


        if (Channel.type === "GUILD_VOICE") return message.channel.send({ content: "merci de mentionner un channel textuel" })
        await db.set(`confession_${message.guild.id}`, Channel.id);
        
        message.channel.send({ content: `J'ai défini le channel ${Channel} en tant que channel pour les confessions` })

        
    }
}  