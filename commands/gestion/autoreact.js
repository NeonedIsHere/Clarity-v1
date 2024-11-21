const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const ms = require("ms");
const db = require('quick.db')
const autoreact = new db.table("Autoreact")
const cl = new db.table("Color")
module.exports = {
    name: "autoreact",
    aliases: [],
    description: "<add> <salon> <émoji> Ajoute une réaction qui sera automatiquement ajoutée à tous les messages d'un salon \n <del> supprime les autoreact ",
run: async (client, message, args) => {
    if(message.member.permissions.has("ADMINISTRATOR")) {
    
    let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

     

        if (args[0] === "add") {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) 
            if (!channel) return message.channel.send("Veuillez spécifier un salon!")
            let emoji = args[2]
            if (!emoji) return message.channel.send("Veuillez spécifier un emoji!")

            
            // on ajoute le salon et le emoji dans la base de données autoreact
            autoreact.set(`autoreact_${message.guild.id}`, {
                salon: channel.id,
                emoji: emoji
            })
            message.channel.send(`L'emoji ${emoji} a été ajouté à l'autoreact dans le channel : ${channel}`)




        }

        if (args[0] === "del") {
            let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if (!channel) return message.channel.send("Veuillez spécifier un salon!")
            let emoji = args[2]
            if (!emoji) return message.channel.send("Veuillez spécifier un emoji!")
            
            
            // on va chercher le channel et l emoji dans la base de données autoreact et on les supprime
            autoreact.delete(`autoreact_${message.guild.id}`, {
                salon: channel.id,
                emoji: emoji
            })
            message.channel.send(`L'emoji ${emoji} a été supprimé de l'autoreact dans le channel : ${channel}`)

        }
        
}
}
}