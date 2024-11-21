const Discord = require('discord.js');
module.exports = {
    name: "vkick",
    aliases: ["vk"],
    description : "Kick un utilisateur du vocal",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande!");

        // commande pour deconnecter un utilisateur d un vocal

                const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                
                if (!member) return message.channel.send("Vous devez mentionner un utilisateur ou un ID!");
                
                if (!member.voice.channel) return message.channel.send("Le membre n est pas en vocal!");

                if (!member.voice.channelId) {
                    return message.channel.send(`L'utilisateur ${user.tag} n'est pas connecté à un salon vocal.`);
                  }
              
                  if (member.roles.highest.position >= message.member.roles.highest.position) {
                    return message.channel.send("Vous ne pouvez pas kick un utilisateur qui a un rôle plus haut ou égal au vôtre !");
                  }

                  if (member.id === message.author.id) {
                    return message.channel.send("Vous ne pouvez pas vous kick vous-même !");
                  }

                  await member.voice.disconnect();
    
                  message.channel.send(`${member.tag} a été expulsé par ${message.author.tag} !`);
    }
}