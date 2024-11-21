const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
    name: 'unmassiverole',
    aliases: [],
    run: async (client, message, args, prefix, color) => {


        
      if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
           
                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                if (!role) return message.channel.send(`Aucun rôle trouver pour \`${args[1] || " "}\``)
                if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
                    return message.reply(`Mon rôle n'est pas assez haut pour que j'enlève le rôle **${role.name}** !`);
                  }
          
                  if (message.member.roles.highest.comparePositionTo(role) < 0) {
                    return message.reply(`Votre rôle doit être supérieur à **${role.name}**`);
                  }
                  
                message.channel.send(`Je suis entrain d'enlevé le rôle \`<@${role.id}>\` à ${message.guild.memberCount} utilisateur...`)
                message.guild.members.cache.forEach(member => member.roles.remove(role));
        }
            

        }

    }
