const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color")
module.exports = {
    name: "servleave",
    description: "Permet de faire quitter un serveur au bot",
    run: async(client, message, args) => {
        if(db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            const guildId = args[0];
            if(!guildId) return message.channel.send("Veuillez fournir un ID de serveur valide");
            const guild = client.guilds.cache.find((g) => g.id === guildId);
            if(!guild) return message.channel.send("Ce serveur n'existe pas");

            let leave = await guild.leave();
            if (leave) {
                message.channel.send(`${client.user.tag} vient de quitter le serveur : ${guild.name}`);
            }
        }
    }
}