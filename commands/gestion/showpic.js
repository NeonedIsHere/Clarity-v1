const Discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const bfp = new db.table("Bfp")
const cl = new db.table("Color")
const pfp = new db.table("Pfp")

module.exports = {
    name: "showpic",
    description : "Permet de configurer les channels où seront envoyer les pp et les bannières des utilisateurs",
    run : async(client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        const templateEmbed = new Discord.MessageEmbed()
        .setColor(color)


        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [templateEmbed.setDescription("`❌` Vous n'avez pas la permission d'utiliser cette commande")]})



        let configM = new MessageSelectMenu()
        configM.setCustomId("configshow" )
        configM.setPlaceholder("Choisissez une option")
        configM.addOptions([
            {
                label: "Configurer un channel pfp",
                value: "pfpc" 
            } , {
                label: "Configurer un channel bfp",
                value: "bfpc" 
            }
            ])

            let configPfp = new MessageSelectMenu()
            configPfp.setCustomId("configpfp" )
            configPfp.setPlaceholder("Choisissez une option")
            configPfp.addOptions([
                {
                    label: "Salon:",
                    value: "channelp" ,
                    emoji: "1096052480976113674"
                } , {
                    label: "Status:",
                    value: "statusp" ,
                    emoji: "❓"
                }, {
                    label : "Retour",
                    value: "back" ,
                    emoji: "❌"
                }
            ])

                        let configBfp = new MessageSelectMenu()
                        configBfp.setCustomId("configbfp" )
                        configBfp.setPlaceholder("Choisissez une option")
                        configBfp.addOptions([{
                            label: "Salon:",
                            value: "channelb" ,
                            emoji: "1096052480976113674"}, 
                            {
                            label: "Status:",
                            value: "statusb" ,
                            emoji: "❓"
                            }, {
                                label : "Retour",
                                value: "back" ,
                                emoji: "❌"
                            }
                        ])

            let row = new MessageActionRow()
            row.addComponents(configM)

            let configE = new MessageEmbed()
            configE.setColor(color)
            configE.setDescription(`
            **Pfp :**\n
            Salon : <#${(pfp.get(`${message.guild.id}.channelpfp`) === null? "Non configuré" : pfp.get(`${message.guild.id}.channelpfp`)) }>
            Status : ${pfp.get(`${message.guild.id}.statuspfp`) === false ? "`🔴`" : "`🟢`"}
          
            **Bfp :**\n
            Salon : <#${bfp.get(`${message.guild.id}.channelbfp`) === null ? "Non configuré" : bfp.get(`${message.guild.id}.channelbfp`)}>
            Status : ${bfp.get(`${message.guild.id}.statusbfp`) === false ? "`🔴`" : "`🟢`"}
         
            `)

            let row2 = new MessageActionRow()
            row2.addComponents(configBfp)

                        let row3 = new MessageActionRow()
                        row3.addComponents(configPfp)
            
        let msg = await message.channel.send({ embeds: [configE], components: [row] })

                const collector = message.channel.createMessageComponentCollector({
        })
        collector.on("collect", async (i) => {
            if (i.user.id !== message.author.id) return i.reply({ content: "Vous ne pouvez pas utiliser ce menu", ephemeral: true })
            i.deferUpdate()
            if (i.customId === "configshow" ){
              
                if (i.values[0] === "pfpc") {
                    msg.edit({embeds: [configE], components: [row3]})
                }
                if (i.values[0] === "bfpc") {
                    msg.edit({embeds: [configE], components: [row2]})
                }
                
             


            }

            if (i.customId === "configpfp" ) {
                if (i.values[0] === "back") {
                    msg.edit({components: [new MessageActionRow().addComponents(configM)]})
                }

                if (i.values[0] === "channelp") {
                    let question = await message.channel.send({ content: "Veuillez saisir le salon du channel où les photos de profil seront envoyé"})
                    const filter2 = (i) => i.author.id === message.author.id
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {
                        if(collected.size == 0) return  message.channel.send({ embeds: [templateEmbed.setDescription("`⏲️` Le temps de **60s** s'est ecoulé !")]})

                        question.delete()
                        let msgg = collected.first().content
                        if (!msgg) return message.channel.send({ content: "Veuillez saisir le salon du channel où les photos de profil seront envoyé"})
                        let channel = message.guild.channels.cache.get(msgg) || message.mentions.channels.first() 
                        
                        pfp.set(`${message.guild.id}.channelpfp`, channel.id)
                        message.channel.send({ content: "Le salon du channel où les photos de profil seront envoyé a été mis à jour"})
                    })
                }
                if (i.values[0] === "statusp") {
                    if (pfp.get(`${message.guild.id}.statuspfp`) === false) {
                    pfp.set(`${message.guild.id}.statuspfp`, true)
                    let configE = new MessageEmbed()
                    configE.setColor(color)
                    configE.setDescription(`
                    **Pfp :**\n
                    Salon : <#${(pfp.get(`${message.guild.id}.channelpfp`) === null? "Non configuré" : pfp.get(`${message.guild.id}.channelpfp`)) }>
                    Status : ${pfp.get(`${message.guild.id}.statuspfp`) === false ? "`🔴`" : "`🟢`"}
                  
                   **Bfp :**\n
                   Salon : <#${bfp.get(`${message.guild.id}.channelbfp`) === null ? "Non configuré" : bfp.get(`${message.guild.id}.channelbfp`)}>
                     Status : ${bfp.get(`${message.guild.id}.statusbfp`) === false ? "`🔴`" : "`🟢`"}
              
                    `)
                    msg.edit({embeds: [configE]})
                    } 
                    else if (pfp.get(`${message.guild.id}.statuspfp`) === true) {
                        pfp.set(`${message.guild.id}.statuspfp`, false)
                        let configE = new MessageEmbed()
                        configE.setColor(color)
                        configE.setDescription(`
                        **Pfp :**\n
                        Salon : <#${(pfp.get(`${message.guild.id}.channelpfp`) === null? "Non configuré" : pfp.get(`${message.guild.id}.channelpfp`)) }>
                        Status : ${pfp.get(`${message.guild.id}.statuspfp`) === false ? "`🔴`" : "`🟢`"}
                      
                       **Bfp :**\n
                       Salon : <#${bfp.get(`${message.guild.id}.channelbfp`) === null ? "Non configuré" : bfp.get(`${message.guild.id}.channelbfp`)}>
                         Status : ${bfp.get(`${message.guild.id}.statusbfp`) === false ? "`🔴`" : "`🟢`"}
                  
                        `)
                        msg.edit({embeds: [configE]})
                    }
                }
            }
            if (i.customId === "configbfp" ) {
                if (i.values[0] === "back") {
                    msg.edit({components: [new MessageActionRow().addComponents(configM)]})
                }
                if (i.values[0] === "channelb") {
                    let question = await message.channel.send({ content: "Veuillez saisir le salon du channel où les photos de profil seront envoyé"})
                    const filter2 = (i) => i.author.id === message.author.id
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {
                        if(collected.size == 0) return  message.channel.send({ embeds: [templateEmbed.setDescription("`⏲️` Le temps de **60s** s'est ecoulé !")]})

                        question.delete()
                        let msgg = collected.first().content
                        if (!msgg) return message.channel.send({ content: "Veuillez saisir le salon du channel où les photos de profil seront envoyé"})
                        let channel = message.guild.channels.cache.get(msgg) || message.mentions.channels.first() 
                        
                        bfp.set(`${message.guild.id}.channelbfp`, channel.id)
                        message.channel.send({ content: "Le salon du channel où les bannières de profil seront envoyé a été mis à jour"})
                    })
                }
                if (i.values[0] === "statusb") {
                    if (bfp.get(`${message.guild.id}.statusbfp`) === false) {
                        bfp.set(`${message.guild.id}.statusbfp`, true)
                        let configE = new MessageEmbed()
                        configE.setColor(color)
                        configE.setDescription(`
                        **Pfp :**\n
                        Salon : <#${(pfp.get(`${message.guild.id}.channelpfp`) === null? "Non configuré" : pfp.get(`${message.guild.id}.channelpfp`)) }>
                        Status : ${pfp.get(`${message.guild.id}.statuspfp`) === false ? "`🔴`" : "`🟢`"}
                      
                       **Bfp :**\n
                       Salon : <#${bfp.get(`${message.guild.id}.channelbfp`) === null ? "Non configuré" : bfp.get(`${message.guild.id}.channelbfp`)}>
                         Status : ${bfp.get(`${message.guild.id}.statusbfp`) === false ? "`🔴`" : "`🟢`"}
                  
                        `)
                        msg.edit({embeds: [configE]})
                        } 
                        else if (bfp.get(`${message.guild.id}.statuspfp`) === true) {
                            bfp.set(`${message.guild.id}.statusbfp`, false)
                            let configE = new MessageEmbed()
                            configE.setColor(color)
                            configE.setDescription(`
                            **Pfp :**\n
                            Salon : <#${(pfp.get(`${message.guild.id}.channelpfp`) === null? "Non configuré" : pfp.get(`${message.guild.id}.channelpfp`)) }>
                            Status : ${pfp.get(`${message.guild.id}.statuspfp`) === false ? "`🔴`" : "`🟢`"}
                          
                           **Bfp :**\n
                           Salon : <#${bfp.get(`${message.guild.id}.channelbfp`) === null ? "Non configuré" : bfp.get(`${message.guild.id}.channelbfp`)}>
                             Status : ${bfp.get(`${message.guild.id}.statusbfp`) === false ? "`🔴`" : "`🟢`"}
                         Gifs autorisés : ${bfp.get(`${message.guild.id}.gifsauto`) === false ? "`❌`" : "`✅`"}
                            `)
                            msg.edit({embeds: [configE]})
                        }
                }
                if (i.values[0] === "gifsautob") {
                    if (bfp.get(`${message.guild.id}.gifsauto`) === false) {
                        bfp.set(`${message.guild.id}.gifsauto`, true)
                        let configE = new MessageEmbed()
                        configE.setColor(color)
                        configE.setDescription(`
                        **Pfp :**\n
                        Salon : <#${(pfp.get(`${message.guild.id}.channelpfp`) === null? "Non configuré" : pfp.get(`${message.guild.id}.channelpfp`)) }>
                        Status : ${pfp.get(`${message.guild.id}.statuspfp`) === false ? "`🔴`" : "`🟢`"}
                       **Bfp :**\n
                       Salon : <#${bfp.get(`${message.guild.id}.channelbfp`) === null ? "Non configuré" : bfp.get(`${message.guild.id}.channelbfp`)}>
                         Status : ${bfp.get(`${message.guild.id}.statusbfp`) === false ? "`🔴`" : "`🟢`"}
                        `)
                        msg.edit({embeds: [configE]})
                    } else if (bfp.get(`${message.guild.id}.gifsauto`) === true) {
                        bfp.set(`${message.guild.id}.gifsauto`, false)
                        let configE = new MessageEmbed()
                        configE.setColor(color)
                        configE.setDescription(`
                        **Pfp :**\n
                        Salon : <#${(pfp.get(`${message.guild.id}.channelpfp`) === null? "Non configuré" : pfp.get(`${message.guild.id}.channelpfp`)) }>
                        Status : ${pfp.get(`${message.guild.id}.statuspfp`) === false ? "`🔴`" : "`🟢`"}
                       **Bfp :**\n
                       Salon : <#${bfp.get(`${message.guild.id}.channelbfp`) === null ? "Non configuré" : bfp.get(`${message.guild.id}.channelbfp`)}>
                         Status : ${bfp.get(`${message.guild.id}.statusbfp`) === false ? "`🔴`" : "`🟢`"}
                        `)
                        msg.edit({embeds: [configE]})
                    }
                }
            }
        })

    }
}

