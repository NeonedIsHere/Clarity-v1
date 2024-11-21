const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const db = require('quick.db')
const cl = new db.table("Color")
const ms = require("parse-ms");
module.exports = {
    name:  'rob',
    description: "Permet de prendre de l'argent à une personne",
    run: async(client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let timeout = 86400000;
        let rob = await db.fetch(`rob_${message.guild.id}_${message.author.id}`)
        if (rob !== null && timeout - (Date.now() - rob) > 0) {
            let time = ms(timeout - (Date.now() - rob));
            let timeEmbed = new MessageEmbed()
            .setColor(color)
            .setFooter({text: `LuminaBots ${client.config.version}` })
            .setDescription(`Tu as déja utiliser la commande rob aujourd'hui\n\nTu pourras de nouveau l'utiliser dans : ${time.hours}h ${time.minutes}m ${time.seconds}s `);
        message.channel.send({embeds: [timeEmbed]}) 
    } 
    else  
    {
            let user = message.mentions.users.first() || client.users.cache.get(args[0])
        if(!user) return message.channel.send("Veuillez mentionner un utilisateur")
        if(user.id === message.author.id) return message.channel.send("Vous ne pouvez pas prendre de l'argent à vous même");
        if(user.id === client.user.id) return message.channel.send("Vous ne pouvez pas prendre de l'argent au bot");
   
                // random un nombre entre 1 et 5000
                let random = Math.floor(Math.random() * 1000) + 1;
                let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
                if(money < random) return message.channel.send("Vous ne pouvez pas prendre de l'argent à cette personne car elle n'a pas assez d'argent");
                db.add(`money_${message.guild.id}_${message.author.id}`, random)
                db.subtract(`money_${message.guild.id}_${user.id}`, random)
                db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now())
                let embed = new MessageEmbed()
                embed.setColor(color)
                embed.setDescription(`${message.author.username} a prit de l'argent à ${user.username}`)
                embed.addFields({
                    name: "Somme de l'argent:",
                    value: `${random}`,
                    inline: true
                })
                embed.setTimestamp()
                message.channel.send({embeds: [embed]})
            }
        

    }
}