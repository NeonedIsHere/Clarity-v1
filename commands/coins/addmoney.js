const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const db = require('quick.db')
const cl = new db.table("Color")
module.exports = {
    name: 'addmoney',
    aliases: [],
    run: async (client, message, args, prefix) => {

        
        



       
        
 
               let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
           
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("**Perm requise - [ADMINISTRATOR]**")

        if (!args[0]) return message.channel.send("**S'il vous plait renseigner un utilisateur!**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Entrez un utilisateur valide!**")
        if (!args[1]) return message.channel.send("**Entrez un montant!**")
        if (isNaN(args[1])) return message.channel.send(`**❌ Votre montant n'est pas un nombre!**`);
       
        db.add(`money_${message.guild.id}_${user.id}`, args[1])
        let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor(color)
            .setDescription(`Ajout de : ${args[1]} coins\nNouvelle Balance: ${bal}\nUtilisateur: ${user}`)
            .setFooter({text: `LuminaBots ${client.config.version}` })
        message.channel.send({embeds: [moneyEmbed]})
            }

        }

    

