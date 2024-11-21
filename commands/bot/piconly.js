const db = require("quick.db");
const cl = new db.table("Color");
const Discord = require("discord.js");
module.exports = {
    name: "piconly",
    
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Tu n'as pas les permissions d'utiliser cette commande !");
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send(`Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.`);  
 
        let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(args[0] === "on") {
        const channel = message.channel

        db.set(`${message.guild.id}.piconly`, channel.id)
        message.channel.send(`Le salon ${channel} sera maintenant utilisé en tant que channel PicOnly`)

        
    }

    else if(args[0] === "off") {
        db.set(`${message.guild.id}.piconly`,null)
        message.channel.send(`PicOnly désactivé`)
        
    } else 
         if(ss) {
        db.set(`${message.guild.id}.piconly`, ss.id)
        message.channel.send(`Le salon ${ss} sera maintenant utilisé en tant que channel PicOnly`)


        const logs = db.get(`${message.guild.id}.piconly`)

        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.author.tag} à défini ce salon comme salon PicOnly`)
        .setDescription(` Ce salon est désormais un salon **PicOnly** du serveur\n Executeur : <@${message.author.id}>`)
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)
         }

    }
}