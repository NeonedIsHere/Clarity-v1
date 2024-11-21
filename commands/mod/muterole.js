const Discord = require("discord.js")
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
module.exports = {
    name: "muterole",
    description:"permet de créer ou vérifier un rôle muet",
    run: async(client, message, args , prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {

            let muted = await db.fetch(`muterole_${message.guild.id}`)

            let muterole = await message.guild.roles.cache.get(muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
            if (muterole) {
                const embed = new Discord.MessageEmbed()
                embed.setColor(color)
                embed.setDescription(`**Il existe déjà un rôle muet : <@&${muterole.id}>**\nVérification des permissions du rôle muet en cours`)
                message.channel.send({ embeds: [embed] }).then(async mm => {
                    const embed2 = new Discord.MessageEmbed()
                    embed2.setTitle("Les permissions du rôle muet ont été mises à jour")
                    embed2.setColor(color)

                    const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
                    channels.forEach(channel => {


                        channel.permissionOverwrites.edit(muterole, {
                            SEND_MESSAGES: false,
                            CONNECT: false,
                            ADD_REACTIONS: false
                        }, "Muterole")
                        embed2.setDescription(`**D'autres permission déjà existantes peuvent rendre innefficace le mute pour certains rôles dans les salons suivants :**\n\n**${channel.name}**\n- ${muterole.name}\n`, true)
                        embed2.setFooter({ text: "Tous les rôles ayant la permissons \"envoyer des messages\" en vert seront insensible au mute" })

                    })

                    mm.edit({ embeds: [embed2] })
                })
                return;
            }
            if (!muterole) {
                const embed = new Discord.MessageEmbed()
                embed.setColor(color)
                embed.setTitle(`Création d'un rôle muet en cours`)
                message.channel.send({ embeds: [embed] }).then(async m => {
                    muterole = await message.guild.roles.create({

                            name: 'muet'

                    })
                    message.guild.channels.cache.forEach(channel => channel.permissionOverwrites.edit(muterole, {
                        SEND_MESSAGES: false,
                        CONNECT: false,
                        ADD_REACTIONS: false
                    }, "Muterole"))
                    db.set(`muterole_${message.guild.id}`, `${muterole.id}`)
                    const e = new Discord.MessageEmbed()
                    e.setColor(color)
                    e.setDescription(`***Rôle muet créé :*** ${muterole}`)
                    return m.edit({ embeds: [e] });
                })
        }
    }
}
}