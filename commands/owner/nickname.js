const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")
module.exports = {
    name: "rename",


run: async(client, message, args) => {
    // si l utilisateur n est pas dans les owners du bot via la db il ne peut pas utiliser cette commande

    
    if(client.config.buyer.includes(message.author.id) || db.get(`buyermd.${message.author.id}`) || client.config.dev.includes(message.author.id)) { 
    
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        
 // rename l utilisateur mentionnez avec le nom specifier en args.join(" ")

 let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase())
 if (!user) return message.channel.send(`:x: | Vous devez mentionner un utilisateur ou un ID`)


 // recupere le nom voulu en args[1]

let name = args.slice(1).join(` `);
if (!name) return message.channel.send(`:x: | Vous devez préciser un nom`)
if (name.length > 100) return message.channel.send(`:x: | Vous devez préciser un nom de moins 100 caractères`)
if (name.length < 3) return message.channel.send(`:x: | Vous devez préciser un nom de plus 3 caractères`)

// rename l user avec le name

user.setNickname(name)
message.channel.send(`:white_check_mark: | ${user} a été renommé avec succès son nouveau nom est : ${name}`)


}
}
}