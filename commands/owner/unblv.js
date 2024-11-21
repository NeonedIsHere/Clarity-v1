const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const blv = new db.table("blvoc")

module.exports = {
    name: "unblvoc",
    run: async(client, message, args, prefix) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
             let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = client.config.color
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
                
                let nobl = new Discord.MessageEmbed()
                nobl.setColor(color)
                nobl.setDescription(`**${member.username}** n'est pas blacklist vocal`)
                nobl.setFooter({text: `LuminaBots ${client.config.version}` })
          
                if (blv.get(`${message.guild.id}.${member.id}.blv`) === null) { return message.channel.send({embeds: [nobl]})}
                blv.subtract(`${message.guild.id}.blvcount`, 1)
                blv.delete(`${message.guild.id}.${member.id}.blv`, member.id)

                let unbl = new Discord.MessageEmbed()
                unbl.setColor(color)
                unbl.setDescription(`**${member.username}** est maintenant unblacklist vocal`)
                unbl.setFooter({text: `LuminaBots ${client.config.version}` })
              message.channel.send({embeds: [unbl]})

            } else if (!args[0]) {
                return
            }
        } else { }  
        }
    }
