const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: "dero",
    aliases: [],
    description:"permet de masquer temporairement l'accès à tous les salons en appliquant des autorisations spécifiques",
    run: async (client, message, args, prefix) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        if (!args[0]) {
            const channels = message.guild.channels.cache;
            channels.forEach(channel => {
                channel.edit({
                    permissionOverwrites: [{
                        id: message.guild.id,
                        deny: 'VIEW_CHANNEL'
                    }]
                });
            });

            const success = await message.channel.send({ content: "Toutes les dérogations ont été mises à jour." });
            setTimeout(() => {
                success.delete();
            }, 5000);

        } else if (args[0] && args[0].toLowerCase() === "off") {
            const channels = message.guild.channels.cache;
            channels.forEach(channel => {
                channel.edit({
                    permissionOverwrites: [{
                        id: message.guild.id,
                        allow: 'VIEW_CHANNEL'
                    }]
                });
            });

            const success = await message.channel.send({ content: "Toutes les dérogations ont été mises à jour." });
            setTimeout(() => {
                success.delete();
            }, 5000);
        }
    }
};
