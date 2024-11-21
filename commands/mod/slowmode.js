const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const alerte = new db.table("AlertePerm")
const ml = new db.table("modlog")
const p3 = new db.table("Perm3")
const fs = require('fs')
const moment = require('moment')
const ms = require("ms")
const cl = new db.table("Color")
module.exports = {
    name: 'slowmode',
    aliases: [],
    description:"permet de définir un temps d'attente entre les messages dans un salon",
    run: async (client, message, args, prefix) => {



           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
                    const currentCooldown = message.channel.rateLimitPerUser;
                    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

                    if (args[0] === 'off') {

                        message.channel.send(`Le mode lent est maintenant désactiver dans <#${channel.id}>`)

                        const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setTitle(`Modération • Type: **\`slowmode\`**`)
                            .setColor(color)
                            .setDescription(`<@${message.author.id}> a désactivé le \`slowmode\` sur le salon <#${message.channel.id}>`)
                            .setTimestamp()
                            .setFooter({ text: `LuminaBots ${client.config.version}`  })
                        client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error)

                        return message.channel.setRateLimitPerUser(0)

                    }

                    const time = ms(args[0]) / 1000;

                    if (isNaN(time)) return message.channel.send(`Aucune heure valide trouvé pour \`${args[0]}\``)

                    if (time >= 21600) return message.channel.send('Le mode lent ne peut pas être supérieur à 6h')

                    if (currentCooldown === time) return message.channel.send(`Mode lent déjà défini sur ${args[0]} dans <#${channel.id}>`);

                    message.channel.setRateLimitPerUser(time).then(m => m.send(`Le mode lent est maintenant de ${args[0]} dans <#${channel.id}>`));

                    const embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                    .setTitle(`Modération • Type: **\`slowmode\`**`)
                        .setColor(color)
                        .setDescription(`<@${message.author.id}> a mis un \`slowmode\` de ${args[0]} sur le salon <#${message.channel.id}>`)
                        .setTimestamp()
                        .setFooter({ text: `LuminaBots ${client.config.version}`  })
                    client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [embed] }).catch(console.error)


        }

            }



        }


