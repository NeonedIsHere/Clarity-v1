const Discord = require("discord.js"),
 {MessageEmbed} = require("discord.js")
const db = require("quick.db");
 module.exports = {
    name: "ban",
    description: "Permet de ban un utilisateur du serveur",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande - [BAN_MEMBERS] !");
        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return  message.channel.send({ content: `Aucun membre trouvée pour: \`${args[0]}\`` })

        if (user.id === message.author.id) {
            return message.channel.send({ content: `Vous n'avez pas la permission de **ban** <@${user.id}>` });
          }
          let antibanr = db.get(`antibanrole_${message.guild.id}`)
          if(user.roles.cache.has(antibanr)) return message.channel.send({ content: `Vous n'avez pas la permission de **ban** <@${user.id}>` })
          if(user.roles.highest.position > client.user.id) return message.channel.send({ content: `Je n'ai pas les permissions nécessaires pour **ban** <@${user.id}>` });
          if(user.roles.highest.position > message.member.roles.highest.position) return message.channel.send({ content: `Vous n'avez pas les permissions nécessaires pour **ban** <@${user.id}>` });
          if( db.get(`ownermd.${message.author.id}`) === true) return message.channel.send({ content: `Vous n'avez pas la permission de **ban** <@${user.id}>` });
          if( db.get(`buyermd.${message.author.id}`) === true) return message.channel.send({ content: `Vous n'avez pas la permission de **ban** <@${user.id}>` });
          if(client.config.owner.includes(user.id)) return message.channel.send({ content: `Vous n'avez pas la permission de **ban** <@${user.id}>` });
          if(client.config.buyer.includes(user.id)) return message.channel.send({ content: `Vous n'avez pas la permission de **ban** <@${user.id}>` });

          if(user.id === message.guild.ownerID) {
            return message.channel.send({ content: `Vous n'avez pas la permission de **ban** <@${user.id}>` });
          }

                    if(user.id === client.user.id) {
            return message.channel.send({ content: `Je ne peux pas **ban** cet utilisateur` });

          

    }

    if(user.id === message.guild.ownerID) {
        return message.channel.send({ content: `Je ne peux pas **ban** cet utilisateur` });
    }
    if(user.id === client.user.id) {
        return message.channel.send({ content: `Je ne peux pas **ban** cet utilisateur` });
    }
    
    let reason = args.slice(1).join(" ") || "Aucune raison spécifiée"

    message.reply({ content: `**${user.user.tag}** a été ban pour la raison : \`${reason}\``})
    user.ban(`${reason}`).catch(() => false)
    
}
 }