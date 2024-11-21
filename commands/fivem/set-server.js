const {MessageActionRow, MessageButton, MessageEmbed} = require('discord.js');
const db = require('quick.db');
const fivem = require("discord-fivem-api");
const cl = new db.table('Color')

module.exports = {
    name: "set-server",
    description: "Définir l'ip et le port du serveur fivem",
    category: "fivem",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande!");

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (args.length !== 2) {
            message.reply("Utilisation: set-server IP_DU_SERVEUR PORT_DU_SERVEUR")
        } else {
            let ip = args[0];
            let port = args[1];
            const server = new fivem.DiscordFivemApi(ip, port);
            db.set('server', {
                ip: ip,
                port: port,
            });
            let embed = new MessageEmbed()
            embed.setTitle("Fivem")
            embed.setDescription(`Le serveur a été configuré avec succès`)
            embed.addFields({
                name: "IP",
                value: ip,
                
            }, {
                name: "Port",
                value: port,
            })
            embed.setColor(color)
            embed.setTimestamp()
            embed.setFooter({text: `LuminaBots ${client.config.version}` })
            message.channel.send({embeds: [embed]})
        }
    }
}