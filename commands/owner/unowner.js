const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const ownercount = new db.table("Ownercount")
const cl = new db.table("Color")
module.exports = {
    name: "unowner",
    run: async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || db.get(`buyermd.${message.author.id}`)){
            
            if (args[0]) {
                let member = client.users.cache.get(message.author.id);
                if (args[0]) {
                    member = client.users.cache.get(args[0]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)
                if (!owner.get(`${message.guild.id}.ownermd.${member.id}`) === member.id) {
                    let noown = new Discord.MessageEmbed()
                    noown.setColor(color)
                    noown.setDescription(`${member.username} n'est pas owner`)
                    noown.setAuthor(message.author.username , message.author.displayAvatarURL())
                    noown.setFooter({text: `LuminaBots ${client.config.version}` })
                    return message.channel.send({ embeds: [noown]})
                  
                } else {
                    owner.set(`${message.guild.id}.ownermd.${member.id}`, false)
                    let unown = new Discord.MessageEmbed()
                    unown.setColor(color)
                    unown.setAuthor(message.author.username, message.author.displayAvatarURL())
                    unown.setFooter({text: `LuminaBots ${client.config.version}` })
                    unown.setDescription(`**${member.username}** n'est plus owner`)
                    
 
                    message.channel.send({ embeds: [unown]})
                }mm
            }
        }
    }
}