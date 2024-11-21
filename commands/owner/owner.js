const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const ownercount = new db.table("Ownercount")
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const cl = new db.table("Color")
module.exports = {
    name: 'owner',
    aliases: [],
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || db.get(`buyermd.${message.author.id}`)) {
 
     
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

                if (owner.get(`${message.guild.id}.ownermd.${member.id}}`) === member.id) {
                    let owneral = new MessageEmbed()
                    ownera.setColor(color)
                    ownera.setDescription(`${member.username} est déja owner`)
                    ownera.setFooter({text: `LuminaBots ${client.config.version}` })
                    message.channel.send({ embeds : [owneral]})
                } else {
                    owner.set(`${message.guild.id}.ownermd.${member.id}`, member.id)
                    let ownera = new MessageEmbed()
                    ownera.setColor(color)
                    ownera.setDescription(`${member.username} est désormais owner`)
                    ownera.setFooter({text: `LuminaBots ${client.config.version}` })
                    message.channel.send({ embeds : [ownera]})
                }


            } else if (!args[0]) {

                let list = message.guild.members.cache.filter(u => owner.get(`${message.guild.id}.ownermd.${u.id}`) === u.id).map(a => "<@" + a.user.id + ">")

                const embed = new Discord.MessageEmbed()
                .setTitle(`${client.user.username} Liste des Owners`)
                .setDescription(list.join("\n"))
                .setColor(color)
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
                message.channel.send({ embeds: [embed] })

            }
        }

   
}
}
