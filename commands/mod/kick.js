const Discord = require("discord.js"),
 {MessageEmbed} = require("discord.js")
const db = require("quick.db");
 module.exports = {
    name: "kick",
    description: "Permet de kick un utilisateur du serveur",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande - [KICK_MEMBERS] !");
        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return  message.channel.send({ content: `Aucun membre trouvée pour: \`${args[0]}\`` })

        if (user.id === message.author.id) {
            return message.channel.send({ content: `Vous n'avez pas la permission de **kick** <@${user.id}>` });
          }
          let antikickr = db.get(`antikickrole_${message.guild.id}`)
          if(user.roles.cache.has(antikickr)) return message.channel.send({ content: `Vous n'avez pas la permission de **kick** <@${user.id}>` })
          if(user.roles.highest.position > client.user.id) return message.channel.send({ content: `Je n'ai pas les permissions nécessaires pour **kick** <@${user.id}>` });
          if(user.roles.highest.position > message.member.roles.highest.position) return message.channel.send({ content: `Vous n'avez pas les permissions nécessaires pour **kick** <@${user.id}>` });
          if( db.get(`ownermd.${message.author.id}`) === true) return message.channel.send({ content: `Vous n'avez pas la permission de **kick** <@${user.id}>` });
          if( db.get(`buyermd.${message.author.id}`) === true) return message.channel.send({ content: `Vous n'avez pas la permission de **kick** <@${user.id}>` });
          if(client.config.owner.includes(user.id)) return message.channel.send({ content: `Vous n'avez pas la permission de **kick** <@${user.id}>` });
          if(client.config.buyer.includes(user.id)) return message.channel.send({ content: `Vous n'avez pas la permission de **kick** <@${user.id}>` });

          if(user.id === message.guild.ownerID) {
            return message.channel.send({ content: `Vous n'avez pas la permission de **kick** <@${user.id}>` });
          }

                    if(user.id === client.user.id) {
            return message.channel.send({ content: `Je ne peux pas **kick** cet utilisateur` });

          

    }

    if(user.id === message.guild.ownerID) {
        return message.channel.send({ content: `Je ne peux pas **kick** cet utilisateur` });
    }
    if(user.id === client.user.id) {
        return message.channel.send({ content: `Je ne peux pas **kick** cet utilisateur` });
    }
    
    let reason = args.slice(1).join(" ") || "Aucune raison spécifiée"

    message.reply({ content: `**${user.user.tag}** a été kick pour la raison : \`${reason}\``})
    user.kick(`${reason}`).catch(() => false)
    
}
 }