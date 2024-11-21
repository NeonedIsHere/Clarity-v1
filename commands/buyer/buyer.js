const db = require("quick.db")
const buyer = new db.table("Buyer")
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const cl = new db.table("Color")

module.exports = {
    name: "buyer",
    run: async(client, message, args , prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.buyer.includes(message.author.id)) {

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

                if (db.get(`buyermd.${member.id}`) === member.id) {
                    let buyeral = new MessageEmbed()
                    buyeral.setColor(color)
                    buyeral.setDescription(`${member.username} est déja buyer`)
                    buyeral.setFooter({text: `LuminaBots ${client.config.version}` })
                    message.channel.send({ embeds : [buyeral]})
                } else {
                    db.push(`${client.user.id}.buyermd`, member.id)
                    db.set(`buyermd.${member.id}`, member.id)
                    let buyera = new MessageEmbed()
                    buyera.setColor(color)
                    buyera.setDescription(`${member.username} est désormais buyer`)
                    buyera.setFooter({text: `LuminaBots ${client.config.version}` })
                    message.channel.send({ embeds : [buyera]})
                }


            } else if (!args[0]) {
                
                let list = message.guild.members.cache.filter(u => db.get(`buyermd.${u.id}`) === u.id).map(a => "<@" + a.user.id + ">")

                const embed = new MessageEmbed()
                .setTitle(`${client.user.username} Liste des buyers`)
                .setDescription(list.join("\n"))
                .setColor(color)
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
                message.channel.send({ embeds: [embed] })

            }


        }
    }
}