const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ms = require('ms'),
    { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = {
  name: "embed",
  aliases: ["emb"],
  description:"permet de modifier diverses parties de l'embed, telles que le titre, la description, l'auteur, le footer, la couleur, etc",
  run: async(client, message, args, prefix) => {
    if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id))
    {
         let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let selectMenuOptions = [
            {
                label: "Modifier le Titre",
                value: "embedtitle", emoji: "📝"
            }, {
                label: "Modifier la Description",
                value: "embeddescription", emoji: "💬"
            }, {
                label: "Modifier l'Auteur",
                value: "embedauthor", emoji: "🕵️‍♂️"
            }, {
                label: "Modifier le Footer",
                value: "embedfooter", emoji: "🔻"
            }, {
                label: "Modifier le Thumbnail",
                value: "embedthumbnail", emoji: "🔳"
            }, {
                label: "Modifier le Timestamp",
                value: "embedtimestamp", emoji: "🕙"
            }, {
                label: "Modifier l'Image",
                value: "embedimage", emoji: "🖼"
            }, {
                label: "Modifier l'URL",
                value: "embedurl", emoji: "🌐"
            }, {
                label: "Modifier la Couleur",
                value: "embedcolor", emoji: "🔴"
            }
        ]
        var selectMenu = new MessageSelectMenu()
            .setCustomId("embedbuilder")
            .setPlaceholder("Choisissez une option")
            .addOptions([selectMenuOptions])
        var embedBuilderActionRow = new MessageActionRow()
            .addComponents([selectMenu])
        let embed = (new MessageEmbed({ color: `${color}`, description: '\u200B' }))

        var actionRow = new MessageActionRow()
        actionRow.addComponents([
            new MessageButton()
            .setCustomId("embedsend")
            .setLabel("Envoyer l'embed")
            .setStyle("PRIMARY")
            .setEmoji("✅")
        ])

        let msg = await message.channel.send({ embeds: [embed], components: [embedBuilderActionRow, actionRow]})
        var collector = msg.createMessageComponentCollector({
            
        })
        collector.on("collect", async (i) => {
            i.deferUpdate()
            if(i.customId == "embedbuilder") {
                if(i.values[0] == "embedtitle") {
                    let question = await message.channel.send({ content: "Veuillez saisir le titre de l'embed" })
                    let collected = await question.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1 }).then(collected => {
                        let msgg = collected.first()
                        embed.setTitle(msgg.content)
                        msg.edit({ embeds: [embed]})
                    })
                }
                if(i.values[0] == "embeddescription") {
                    let question = await message.channel.send({ content: "Veuillez saisir la description de l'embed" })
                    let collected = await question.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1 }).then(collected => {
                        let msgg = collected.first()
                        embed.setDescription(msgg.content)
                        msg.edit({ embeds: [embed]})
                        
                    })
                }
                if(i.values[0] == "embedauthor") {
                    let question = await message.channel.send({ content: "Veuillez saisir l'auteur de l'embed" })
                    let collected = await question.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1 }).then(collected => {
                        let msgg = collected.first()
                        embed.setAuthor(msgg.content)
                        msg.edit({ embeds: [embed]})
                    })
                }
                if(i.values[0] == "embedfooter") {
                    let question = await message.channel.send({ content: "Veuillez saisir le footer de l'embed" })
                    let collected = await question.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1 }).then(collected => {
                        let msgg = collected.first()
                        embed.setFooter(msgg.content)
                        msg.edit({ embeds: [embed]})
                    })
                }
                if(i.values[0] == "embedthumbnail") {
                    var yx = await message.channel.send({ content: "Quel sera le **Thumnail** de l'embed ?" })
                      let collected = await  message.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"] })
                            .then(async (collected) => {
                                var a;

                                if (collected.first().attachments.size > 0) {
                                    collected.first().attachments.forEach(async at => {
                                        a = at.url
                                    })

                                } else if (/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi.test(collected.first().content) === true) {
                                    a = collected.first().content
                                } else {
                                    a = false
                                }

                                collected.first().delete().catch(() => false)
                                yx.delete().catch(() => false)

                                if (a === false) {
                                    return collected.message.channel.send({ content: "L'image voulue est Invalide." })
                                } else if (a !== false) {
                                    embed.setThumbnail(a.toString());
                                }
                                msg.edit({ embeds: [embed] })
                            })
                }
                if(i.values[0] == "embedtimestamp") {
                    embed.setTimestamp(Date.now())
                    msg.edit({ embeds: [embed]})   
            }
            if(i.values[0] == "embedimage") {
                var yx = await message.channel.send({ content: "Quelle sera l'**Image** de l'embed ?" })
                let collected = await  message.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"] })
                    .then(async (collected) => {
                        var a;

                        if (collected.first().attachments.size > 0) {
                            collected.first().attachments.forEach(async at => {
                                a = at.url
                            })

                        } else if (/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg|svg)\??.*$/gmi.test(collected.first().content) === true) {
                            a = collected.first().content
                        } else {
                            a = false
                        }

                        collected.first().delete().catch(() => false)
                        yx.delete().catch(() => false)

                        if (a === false) {
                            return collected.message.channel.send({ content: "L'image voulue est Invalide." })
                        } else if (a !== false) {
                            embed.setImage(a.toString());
                        }
                        msg.edit({ embeds: [embed] })
                        
                })
            }
            if(i.customId == "embedurl") {
                let question = await message.channel.send({ content: "Veuillez saisir l'URL de l'embed" })
                let collected = await question.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1 }).then(collected => {
                    let msgg = collected.first()
                    embed.setURL(msgg.content)
                    msg.edit({ embeds: [embed]})
                        
                })
            }
            if(i.customId == "embedcolor") {
                let question = await message.channel.send({ content: "Veuillez saisir la couleur de l'embed" })
                let collected = await question.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1 }).then(collected => {
                    let msgg = collected.first()
                    embed.setColor(msgg.content)
                    msg.edit({ embeds: [embed]})
                        
                })
            }
            
        }

        if (i.customId == "embedsend") {
            let question = await message.channel.send({ content: "Dans quel channel voulez-vous envoyer l'embed?" })
            let collected = await question.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1 }).then(collected => {
                let msgg = collected.first()
                let channel = message.guild.channels.cache.get(msgg.content) || msgg.mentions.channels.first() 
                channel.send({ embeds: [embed]})
            })
        }
    })

    }
    }
  }
