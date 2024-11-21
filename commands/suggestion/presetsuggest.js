const Discord = require('discord.js');
const { devNull } = require('os');
const db = require('quick.db')
const cl = new db.table("Color")

module.exports = {
    name: 'presetsuggest',
    aliases: [],
    description:"Permet de créer une catégorie et un salon de suggestions.",

    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send({ content: `Vous n\'avez pas les permissions \`MANAGE_GUILD\` ou \`MANAGE_CHANNELS\`.` });  
 



        message.channel.send({ content: `Création de la **catégorie** suggestion en cours..` }).then(msge => {
        message.guild.channels.create(`${message.guild.name}・Suggestion`, {
            type: "GUILD_CATEGORY",
            permissionsOverwrites: [{
                id: message.guild.id,
                deny: ['CONNECT', 'VIEW_CHANNEL'],
                allow: ['SEND_MESSAGES']
            }]
        }).then(c => {
           c.setPosition(0)
           c.guild.channels.create("📭・Suggestion", {
            type: "GUILD_TEXT",
            parent: c.id,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ['CONNECT'],
                    allow: ['VIEW_CHANNEL']
                },
            ],
           }).then(conf => {
            db.set(`suggestion_${message.guild.id}`, conf.id)
           
                })
           })
        })
    


           let success = new Discord.MessageEmbed()
           .setAuthor(message.guild.name)
           .setDescription(`La configuration des suggestions que vous avez demandé est terminer sur le serveur: ${message.guild.name}`)
           .setFooter(`LuminaBots ${client.config.version}` )
           .setColor(color)
           message.author.send({ embeds: [success] })

    }
}
     
   
           
    
    
   
  