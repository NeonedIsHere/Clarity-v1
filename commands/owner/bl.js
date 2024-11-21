const Discord = require("discord.js")
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")

module.exports = {
    name: "bl",
    run: async(client, message, args, prefix) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
             let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
            if (args[0]) {
                const member = message.mentions.members.first()  || message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0])

                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[0] || "rien"}\``)

                if (client.config.owner.includes(message.author.id) === member.id) {
                let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor(color)
                    .setDescription(`Vous ne pouvez pas bl ${member} car il est owner/buyer`)
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                    return message.channel.send({ embeds: [embed] })
                };
                

                if (owner.get(`${message.guild.id}.ownermd.${message.author.id}`) === member.id){
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor(color)
                    .setDescription(`Vous ne pouvez pas bl ${member} car il est owner/buyer`)
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                    return message.channel.send({ embeds: [embed] })

                };

                if (db.get(`buyermd.${message.author.id}`) === member.id) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor(color)
                    .setDescription(`Vous ne pouvez pas bl ${member} car il est owner/buyer`)
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                    return message.channel.send({ embeds: [embed] })

                };

                if(client.config.buyer.includes(message.author.id) === member.id) {
                    let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor(color)
                    .setDescription(`Vous ne pouvez pas bl ${member} car il est owner/buyer`)
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                    return message.channel.send({ embeds: [embed] })

                }


                if (db.get(`blacklist.${member.id}`) === member.id) { return message.channel.send(`${member.username} est déjà blacklist`) }
                db.push(`${client.user.id}.blacklist`, member.id)
                db.set(`blacklist.${member.id}`, member.id)
                let bl = new Discord.MessageEmbed()
                bl.setColor(color)
                bl.setDescription(`<@${member.id}> est maintenant blacklist\nBanni de **${client.guilds.cache.size}** serveur(s).`)
                bl.setFooter({text: `LuminaBots ${client.config.version}` })
                client.guilds.cache.forEach(async g => {
                    g.members.ban(member, { days: 7, reason: 'blacklisted' }).catch(err => { return })
                })
                message.channel.send({embeds: [bl]})
            

            } else if (!args[0]) {

                let own = db.get(`${client.user.id}.blacklist`)
                let p0 = 0;
                let p1 = 30;
                let page = 1;

                let embed = new Discord.MessageEmbed()
                    .setTitle("Blacklist")
                    .setColor(color)
                    .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n"))
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                message.channel.send({ embeds: [embed] })


            } 
        }
        }
    }
