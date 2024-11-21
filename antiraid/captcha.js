const Discord = require ("discord.js");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
module.exports = {
    name: "captcha",
    aliases: ["captcha"],
    category: "Owner",
    description: "Permet de générer un captcha",
    usage: "captcha",
    run: async (client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            const embed = new MessageEmbed()
            .setColor(color)
            .setDescription("Config le system de captcha de ton serveur")
            .setFooter({text: `LuminaBots ${client.config.version}` })

            const capsetup = new MessageSelectMenu()
            .setCustomId("capsetup")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Option du captcha")
            .addOptions([
                {
                    label: "Channel captcha",
                    value: "capchan"
                },
                {
                    label: "Role captcha",
                    value: "caprole"
                },
                {
                    label: "Activer captcha",
                    value: "capactiver"
                },
                {
                    label: "Désactiver captcha",
                    value: "capdesactiver"
                }
            ])

            const menumsg = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([capsetup])] })

            const collector = menumsg.createMessageComponentCollector({
                filter: i => i.user.id === message.author.id,
                time: 60000
            })


            let filter2 = (m) => m.author.id === message.author.id

            let filter1 = (i) => i.user.id === message.author.id;
            const col = await message.createMessageComponentCollector({
                filter: filter1,
                componentType: "SELECT_MENU"
            })

            collector.on("collect", async i => {
                i.deferUpdate()

                    if(i.values[0] == "capchan") {
                        const ez = await message.channel.send(`Quel est le channel pour les captcha du serveur`)
                     
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        }).then(collected => {
                            ez.delete()
                        

                            if(collected.first().content.toLowerCase() === "cancel") {
                                return message.channel.send("Annulé")
                            }

                            const channel = collected.first().mentions.channels.first()
                            if(!channel) {
                                return message.channel.send("Aucun channel")
                            }
                            else {
                                db.set(`capchan_${message.guild.id}`, channel.id)
                                return message.channel.send(`Channel pour les captcha mis à jour`)
                            }

                           
                            


                        })

                    }

                    if(i.values[0] == "caprole") {
                        const ez = await message.channel.send(`Quel est le role pour les captcha du serveur`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                            }).then(collected => {
                                ez.delete()
                                if(collected.first().content.toLowerCase() === "cancel") {
                                    return message.channel.send("Annulé")
                                }
                                const role = collected.first().mentions.roles.first()
                                if(!role) {
                                    return message.channel.send("Aucun role")
                                }
                                else {
                                    db.set(`caprole_${message.guild.id}`, role.id)
                                    return message.channel.send(`Role pour les captcha mis à jour`)
                                }
                                
                               


        })
        }

        if(i.values[0] == "capactiver") {
            db.set(`captcha_${message.guild.id}`, true)
            const activate = new MessageEmbed()
            activate.setColor(color)
            activate.setTitle("Captcha activer")
            activate.setDescription(`Vous avez activer le captcha sur ${message.guild.name}`)
            activate.setTimestamp()
            activate.setFooter({text: `LuminaBots ${client.config.version}` })
            return message.channel.send({ embeds: [activate] })
            
        }
        if(i.values[0] == "capdesactiver") {
            db.set(`captcha_${message.guild.id}`, false)
            const activate = new MessageEmbed()
            activate.setColor(color)
            activate.setTitle("Captcha désactiver")
            activate.setDescription(`Vous avez désactiver le captcha sur ${message.guild.name}`)
            activate.setTimestamp()
            activate.setFooter({text: `LuminaBots ${client.config.version}` })
            return message.channel.send({ embeds: [activate] })
        }
    })   
    }

}
}