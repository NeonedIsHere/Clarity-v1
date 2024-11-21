const Discord = require("discord.js");
const db = require('quick.db');
const cl = new db.table("Color");

module.exports = {
    name: "pp",
    aliases: ["avatar"],
    description: "Affiche l'avatar d'un utilisateur.",
    run: async (client, message, args, prefix) => {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.fetch(args[0]).catch(() => null);
        let color = cl.get(`color_${message.guild.id}`) || client.config.color;

        if (!user) {
            user = message.author;
        }

        let pp = user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 });
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`Avatar de ${user.username}`)
            .setImage(pp)
            .setFooter(`Demandé par ${message.author.username}`, client.user.displayAvatarURL());

        message.channel.send({ embeds: [embed] });
    }
};
