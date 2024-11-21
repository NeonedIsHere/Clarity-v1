const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const blv = new db.table("blvoc")

module.exports = {
    name: "blvoc",
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
                if (blv.get(`${message.guild.id}.${member.id}.blv`) === true) { return message.channel.send(`${member.username} est déjà Blacklist vocal`) }
                blv.add(`${message.guild.id}.blvcount`, 1)
                blv.push(`${message.guild.id}.blv`, member.id)
                blv.set(`${message.guild.id}.${member.id}.blv`, member.id)

               

                let unbl = new Discord.MessageEmbed()
                unbl.setColor(color)
                unbl.setDescription(`${member.username} est maintenant dans la Blacklist vocal`)
                unbl.setFooter({text: `LuminaBots ${client.config.version}` })
              message.channel.send({embeds: [unbl]})

            } else if (!args[0]) {
                let own = blv.get(`${message.guild.id}.blv`)
                let ownc = blv.get(`${message.guild.id}.blvcount`)
                if (ownc === null || "Nan") ownc = 1
                let p0 = 0;
                let p1 = 30;
                let page = 1;

                let embed = new Discord.MessageEmbed()
                embed.setTitle("Blacklist Vocal")
                    .setColor(color)
                    .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n")
                    )
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                message.channel.send({ embeds: [embed] })
            }
        } else { }  
        }
    }
