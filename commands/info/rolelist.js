const { MessageEmbed } = require('discord.js');
const permissions = require('../../util/perms.json');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const db = require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name: 'rolelist',
    aliases: ['rl'],
    description: '',
    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
          const embed = new MessageEmbed()
          .setTitle(`Liste des rôles du serveur ${message.guild.name}`)
          .setDescription(message.guild.roles.cache.map(r => `${r}`).join(" | "))
            .setFooter(`LuminaBots ${client.config.version}` )
        .setColor(color);
        
        message.channel.send({ embeds: [embed] })
    
        }
    }  