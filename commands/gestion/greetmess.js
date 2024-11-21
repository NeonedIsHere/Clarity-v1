const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);

module.exports = {
    name: "greetmess",
    description: "Permet de configurer les ghostpings quand un membre rejoint le serveur",
    run : async(client, message, args, prefix) => {
        if (message.member.permissions.has("ADMINISTRATOR")) {
            const guild = message.guild;
         let color = cl.fetch(`color_${message.guild.id}`)
        try {
            
                let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration du greetmessage')
                    embed.setColor(color)
                    embed.addFields({
                        name: "Salon de greet1",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    },
                    {
                        name: "Salon de greet2",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet3",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet4",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet5",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name : "__Configuration actuelle :__",
                        value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                        inline: true
                    }
                    )
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })

          
                let menuoptions = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: "Modifier le channel de greet1",
                        value: "channel",
                        emoji: "✅",
                    }, {
                        label: "Modifier le channel de greet2",
                        value: "channel2",
                        emoji: "✅",
                    },{
                        label: "Modifier le channel de greet3",
                        value: "channel3",
                        emoji: "✅",
                    },{
                        label: "Modifier le channel de greet4",
                        value: "channel4",
                        emoji: "✅",
                    }, {
                        label: "Modifier le channel de greet5",
                        value: "channel5",
                        emoji: "✅",
                    },
                    {
                        label: "Activé",
                        value: "on",
                        emoji: "✅",
                    }, {
                        label: "Désactivé",
                        value: "off",
                        emoji: "❌",
                    },
                ])

                let button = new MessageButton()
                button.setStyle("DANGER")
                button.setCustomId("delete")
                button.setEmoji("🗑️")
                let used1 = false;

                let row = new MessageActionRow()
                row.addComponents([menuoptions])

                let row2 = new MessageActionRow()
                row2.addComponents([button])

                    const romsg = await message.channel.send({ embeds: [embed], components: [row, row2] })


         

        
        const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU",
            filter: (i => i.user.id === message.author.id)
        });
        filter2 = (m) => m.author.id === message.author.id

        const collector2 = message.channel.createMessageComponentCollector({
        });

        collector2.on("collect", async i => {
            if (i.user.id!== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser ce bouton", ephemeral: true})
            i.deferUpdate()
            //retour
            if (i.customId === "delete") {
                db.set(`salonghost1_${message.guild.id}`, null)
                db.set(`salonghost2_${message.guild.id}`, null)
                db.set(`salonghost3_${message.guild.id}`, null)
                db.set(`salonghost4_${message.guild.id}`, null)
                db.set(`salonghost5_${message.guild.id}`, null)

                let m = message.channel.send({content: `${i.user} vous venez de supprimer la configuration du greetmessage de votre serveur`, ephemeral: true})

                let embed = new Discord.MessageEmbed()
                embed.setTitle('Configuration du greetmessage')
                embed.setColor(color)
                embed.addFields({
                    name: "Salon de greet1",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                    },
                    {
                        name: "Salon de greet2",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                        }, {
                        name: "Salon de greet3",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet4",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                        }, {
                        name: "Salon de greet5",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name : "__Configuration actuelle :__",
                        value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true? "✅" : "❌"}`,
                        inline: true
                    })
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })
                    romsg.edit({ embeds: [embed], components: [row, row2] })
            }
        })

        collector.on("collect", async (i) => {
            if (i.user.id !== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser ce menu", ephemeral: true})
            i.deferUpdate()
            const value = i.values[0];
            //retour

            if (value === "channel") {
                const ez = await message.channel.send(`Veuillez envoyer le channel pour le greetmessage (\`mention\` ou \`id\`)`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    ez.delete()

                    let msg = collected.first();
                    let channel = message.guild.channels.cache.get(msg.content) || message.mentions.channels.first() 
                    if (!channel) return message.channel.send("Veuillez mentionner un salon valide")
                    db.set(`salonghost1_${message.guild.id}`, channel.id)
                    collected.first().delete()

                    let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration du greetmessage')
                    embed.setColor(color)
                    embed.addFields({
                        name: "Salon de greet1",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    },
                    {
                        name: "Salon de greet2",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet3",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet4",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet5",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name : "__Configuration actuelle :__",
                        value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                        inline: true
                    }
                    )
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })

                    romsg.edit({ embeds: [embed], components: [row, row2] })
                })
            }

            if (value === "channel2") {
                const ez = await message.channel.send(`Veuillez envoyer le channel pour le greetmessage (\`mention\` ou \`id\`)`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                    }).then(collected => {
                    ez.delete()
                    let msg = collected.first();
                    let channel = message.guild.channels.cache.get(msg.content) || message.mentions.channels.first()
                    if (!channel) return message.channel.send("Veuillez mentionner un salon valide")
                    db.set(`salonghost2_${message.guild.id}`, channel.id)
                    collected.first().delete()
                    let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration du greetmessage')
                    embed.setColor(color)
                    embed.addFields({
                        name: "Salon de greet1",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    },
                    {
                        name: "Salon de greet2",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet3",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet4",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet5",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name : "__Configuration actuelle :__",
                        value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                        inline: true
                    }
                    )
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })
                    romsg.edit({ embeds: [embed], components: [row, row2] })
                })
            }

            if (value === "channel3") {
                const ez = await message.channel.send(`Veuillez envoyer le channel pour le greetmessage (\`mention\` ou \`id\`)`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    ez.delete()
                    let msg = collected.first();
                    let channel = message.guild.channels.cache.get(msg.content) || message.mentions.channels.first()
                    if (!channel) return message.channel.send("Veuillez mentionner un salon valide")
                    db.set(`salonghost3_${message.guild.id}`, channel.id)
                    collected.first().delete()
                    let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration du greetmessage')
                    embed.setColor(color)
                    embed.addFields({
                        name: "Salon de greet1",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    },
                    {
                        name: "Salon de greet2",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet3",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet4",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet5",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name : "__Configuration actuelle :__",
                        value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                        inline: true
                    }
                    )
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })

                    romsg.edit({ embeds: [embed], components: [row, row2] })
                
            })
        }

        if (value === "channel4") {
            const ez = await message.channel.send(`Veuillez envoyer le channel pour le greetmessage (\`mention\` ou \`id\`)`)
            let collected = await message.channel.awaitMessages({
                filter: filter2,
                max: 1,
                time: 60000,
                errors: ["time"]
                }).then(collected => {
                    ez.delete()
                    let msg = collected.first();
                    let channel = message.guild.channels.cache.get(msg.content) || message.mentions.channels.first()
                    if (!channel) return message.channel.send("Veuillez mentionner un salon valide")
                    db.set(`salonghost4_${message.guild.id}`, channel.id)
                    collected.first().delete()
                    let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration du greetmessage')
                    embed.setColor(color)
                    embed.addFields({
                        name: "Salon de greet1",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    },
                    {
                        name: "Salon de greet2",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet3",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet4",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet5",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name : "__Configuration actuelle :__",
                        value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                        inline: true
                    }
                    )
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })
                    romsg.edit({ embeds: [embed], components: [row, row2] })

                    
        })
    }
    
    if (value === "channel5") {
        const ez = await message.channel.send(`Veuillez envoyer le channel pour le greetmessage (\`mention\` ou \`id\`)`)
        let collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
            }).then(collected => {
                ez.delete()
                let msg = collected.first();
                let channel = message.guild.channels.cache.get(msg.content) || message.mentions.channels.first()
                if (!channel) return message.channel.send("Veuillez mentionner un salon valide")
                db.set(`salonghost5_${message.guild.id}`, channel.id)
                collected.first().delete()
                let embed = new Discord.MessageEmbed()
                embed .setTitle('Configuration du greetmessage')
                embed.setColor(color)
                embed.addFields({
                    name: "Salon de greet1",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                },
                {
                    name: "Salon de greet2",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name: "Salon de greet3",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name: "Salon de greet4",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name: "Salon de greet5",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name : "__Configuration actuelle :__",
                    value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                    inline: true
                }
                )
                embed.setFooter({text: `LuminaBots ${client.config.version}` })
                romsg.edit({ embeds: [embed], components: [row, row2] })
            })

    }
            if (value === "on") {
                
                let embed = new Discord.MessageEmbed()
                embed .setTitle('Configuration du greetmessage')
                embed.setColor(color)
                embed.addFields({
                    name: "Salon de greet1",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                },
                {
                    name: "Salon de greet2",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name: "Salon de greet3",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name: "Salon de greet4",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name: "Salon de greet5",
                    value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                    inline: true
                }, {
                    name : "__Configuration actuelle :__",
                    value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                    inline: true
                }
                )
                embed.setFooter({text: `LuminaBots ${client.config.version}` })
                db.set(`ghostsettings_${message.guild.id}`, true)
                romsg.edit({ embeds: [embed], components: [row, row2] })
        }

        if (value ==="off") {
            let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration du greetmessage')
                    embed.setColor(color)
                    embed.addFields({
                        name: "Salon de greet1",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost1_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    },
                    {
                        name: "Salon de greet2",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost2_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet3",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost3_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet4",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost4_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name: "Salon de greet5",
                        value: `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))? `${message.guild.channels.cache.get(db.get(`salonghost5_${message.guild.id}`))}` : `Non défini`}`,
                        inline: true
                    }, {
                        name : "__Configuration actuelle :__",
                        value: `Activé: ${db.get(`ghostsettings_${message.guild.id}`) === true ? "✅" : "❌"}`,
                        inline: true
                    }
                    )
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })
            db.set(`ghostsettings_${message.guild.id}`, false)
            romsg.edit({ embeds: [embed], components: [row, row2] })
        }
    
    })

    } catch (err) {
        console.log(err)
    }
}
        }
      
        
     

    }
