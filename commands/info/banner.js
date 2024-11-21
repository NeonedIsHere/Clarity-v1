const Discord = require("discord.js");
const db = require('quick.db');
const cl = new db.table("Color");

module.exports = {
    name: "banner",
    description: "Affiche la bannière d'un utilisateur mentionné ou celle de l'auteur du message",
    run: async(client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        
        const url = await member.user.fetch().then((user) => user.bannerURL({ format: "png", dynamic: true, size: 4096 }));

        const ERRbannerEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`❌ Pas De Bannière ❌`)
            .setDescription(`${member.user.tag} n'a pas de bannière !`)
        if (!url) return message.channel.send({ embeds: [ERRbannerEmbed] });

        const bannerEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Bannière de ${member.user.tag}`)
            .setURL(member.user.bannerURL({ format: "png", size: 4096 }))
            .setImage(`${url}`)
        await message.channel.send({ embeds: [bannerEmbed] });
    }
}
