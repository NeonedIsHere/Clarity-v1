const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const ms = require("ms");
const db = require('quick.db')
const owner = new db.table("Owner")
const pga = new db.table("PermGa")
const cl = new db.table("Color")
module.exports = {
    name: "giveaway",
    aliases: ["gstart", "gw"],
    category: "giveaways",
    description: "Créer un giveaway",
    run: async(client, message, args, prefix) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`)  || message.member.roles.cache.has(pga.fetch(`permga_${message.guild.id}`))) {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!args[0] || isNaN(ms(args[0]))) return message.channel.send("Veuillez fournir une durée!")
        let time = ms(args[0])
        let prize = args.slice(1).join(" ")
        if (!prize) return message.channel.send("Veuillez fournir un prix!")
        if (isNaN(time)) return message.channel.send("Veuillez fournir une durée valide!")
        if (time < 0) return message.channel.send("Veuillez fournir une durée valide!")
        if (time > 21600000) return message.channel.send("Veuillez fournir une durée valide!")
       

                let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[3])
                if (!channel) return message.channel.send("Veuillez mentionner un salon valide!")

                // creation du giveaway

                                let giveaway = client.giveawaysManager.giveaways.find(g => g.prize === prize && g.guildID === message.guild.id)
                                if (!giveaway) {
                                    db.add(`giveawaysCount_${message.guild.id}`, 1)
                                    let embed = new MessageEmbed()
                                  .setColor(color)
                                  .setTitle(`${client.user.username} - Giveaways lancé par ${message.author.username}`)
                                  .setDescription(`**${prize}**`)
                                  .setFooter(`Un total de ${db.fetch(`giveawaysCount_${message.guild.id}`) === null? "0": `${db.fetch(`giveawaysCount_${message.guild.id}`)}`} giveaways sont en cours`)
                                  .setAuthor({name: `Giveaway créé par ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                                  .setTimestamp()
                                  giveaway.start(channel, {
                                    prize: prize,
                                    duration : time,
                                    hostedBy: message.author.username,
                                    messages: {
                                        giveaway: `${client.user.username} - Giveaways lancé par ${message.author.username}`,
                                        giveawayEnded: `${client.user.username} - Giveaways lancé par ${message.author.username} terminé`
                                    }
                                  })
                                }
                

        }
    }
}