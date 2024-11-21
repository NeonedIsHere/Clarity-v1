const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const fs = require("fs")
const ms = require("ms")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")
module.exports = {
    name: "soutien",
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`ownermd.${message.author.id}`) ) {
        try {
            first_layer()
            async function first_layer() {
                let menuoptions = new MessageSelectMenu()
                    .setCustomId('MenuSelection')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("Choisis une option")
                    .addOptions([
                        {
                            label: "Role",
                            value: `Role`,
                            emoji: "👥",
                        },
                        {
                            label: 'Statut',
                            value: `Statut`,
                            emoji: "💬",
                        },
                        {
                            label: 'Configuration',
                            value: "Settings",
                            emoji: "⚙️"
                        },
                        {
                            label: "Activé le soutien",
                            value: "activemodule",
                            emoji: "✅",
                        },
                        {
                            label: "Désactivé le soutien",
                            value: "desactivemodule",
                            emoji: "❌",
                        },
                        {
                            label: 'Annulé',
                            value: "Cancel",
                            emoji: '❌',
                        },
                    ])


                let MenuEmbed = new MessageEmbed()
                    .setColor(color)
                    .setTitle("Soutien")
                    .setImage('https://media.discordapp.net/attachments/852264599821877248/857999322455867402/21.gif')
                    .setDescription(`**Choississez une option pour configurer le rôle soutien et son statut**`)
                let used1 = false;

                const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })

                function menuselection(i) {
                    used1 = true;
                }

                //Event
                let msg = menumsg

                const antichannel = new MessageEmbed()
                    .setTitle(`Configuré le rôle`)
                    .setDescription("**Séléctionnez l'option qui vous correspond**")
                    .setColor(color)
                    .setImage('https://media.discordapp.net/attachments/852264599821877248/857999322455867402/21.gif')

                const antichanneldelete = new MessageEmbed()
                    .setTitle(`Configuré le statut`)
                    .setDescription("**Indiquez le statut à avoir pour obtenir le role soutien**")
                    .setColor(color)
                    .setImage('https://media.discordapp.net/attachments/852264599821877248/857999322455867402/21.gif')


                let options = new MessageSelectMenu()
                    .setCustomId('MenuOn')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("Choisis une option")
                    .addOptions([
                        {
                            label: "Définir un rôle",
                            value: `active`,
                            emoji: '✅',
                        },
                        {
                            label: 'Réinitialiser',
                            value: `desactive`,
                            emoji: '❌',
                        },
                        {
                            label: 'Retour',
                            value: "Retour",
                            emoji: "↩️",
                        },
                    ])




                let AntiChannelDelete = new MessageSelectMenu()
                    .setCustomId('MenuOn')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("Choisis une option")
                    .addOptions([
                        {
                            label: "Définir un statut",
                            value: `activedel`,
                            emoji: '✅',
                        },
                        {
                            label: 'Réinitialiser',
                            value: `desactivedel`,
                            emoji: '❌',
                        },
                        {
                            label: 'Retour',
                            value: "Retourdel",
                            emoji: "↩️",
                        },
                    ])


                let filter2 = (m) => m.author.id === message.author.id
                let filter3 = m => {
                    if (m.mentions.roles.size == 0) return message.channel.send('Rôle invalide')
                }
                let filter1 = (i) => i.user.id === message.author.id;
                const col = await msg.createMessageComponentCollector({
                    filter: filter1,
                    componentType: "SELECT_MENU"
                })

                col.on("collect", async (i) => {
                    if (i.values[0] == "Cancel") {
                        menumsg.delete()
                    }
                    else if (i.values[0] === "Role") {
                        menumsg.edit({ embeds: [antichannel], components: [new MessageActionRow().addComponents([options])] })
                        await i.deferUpdate()
                    }
                    if (i.values[0] == "active") {
                        let link = db.fetch("srole" + message.guild.id)
                        if (link == true) {
                            message.channel.send(`✅ |\`Un rôle \` est déjà setup`).then(msg => {
                                setTimeout(() => msg.delete(), 10000)
                            })
                                .catch(console.error);
                            await i.deferUpdate()
                        }
                        else {
                            await i.deferUpdate()
                            const oui = await message.channel.send('Quel rôle doit être attribué ?')
                            let collected = message.channel.awaitMessages({
                                filter: m => m.author.id === message.author.id,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            })
                                .then(collected => {
                                    oui.delete()
                                    var coll = collected.first();
                                    let role =
                                        coll.mentions.roles.first()
                                    // db.set('support' + message.guild.id,true)
                                    collected.first().delete()
                                    if (!role) return message.channel.send('Role invalide')
                                    

                                    db.set('srole' + message.guild.id, role.id)

                                    message.channel.send(`✅ |\`Le module soutien \` a été activé avec succès, rôle soutien : **${role.name}**`).then(msg => {
                                        setTimeout(() => msg.delete(), 3000)
                                    }).catch(console.error);
                                })
                        }

                    } else if (i.values[0] == "Retour") {
                        menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                        await i.deferUpdate()

                    } else if (i.values[0] == 'desactive') {
                        let link = db.fetch("support" + message.guild.id)
                        if (link == true) {
                            //     db.set("support"+ message.guild.id , null)
                            db.delete("srole" + message.guild.id)
                            message.channel.send(`❌ |\`Le rôle de soutien \` vient d'être reset`).then(msg => {
                                setTimeout(() => msg.delete(), 10000)
                            })
                                .catch(console.error);
                            await i.deferUpdate()

                        } else if (link == null) {
                            message.channel.send(`❌ |\`Le rôle de soutien \` est déjà reset`).then(msg => {
                                setTimeout(() => msg.delete(), 10000)
                            })
                                .catch(console.error);
                            await i.deferUpdate()
                        }

                    }

                    //Statut
                    else if (i.values[0] === "Statut") {
                        menumsg.edit({ embeds: [antichanneldelete], components: [new MessageActionRow().addComponents([AntiChannelDelete])] })
                        await i.deferUpdate()
                    } if (i.values[0] == "activedel") {
                        await i.deferUpdate()
                        let link = db.fetch(`status${message.guild.id}`)
                        if (link == true) {
                            message.channel.send(`✅ |\`Le module de statut \` est déjà activé`).then(msg => {
                                setTimeout(() => msg.delete(), 10000)
                            })
                                .catch(console.error);
                        } else {

                            const ez = await message.channel.send('Quelle doit être dans le statut?(*Les espaces ne seront pas comptés*)')
                            let collected = await message.channel.awaitMessages({
                                filter: filter2,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            }).then(collected => {
                                ez.delete()

                                const status = collected.first().content
                                db.set("status" + message.guild.id, status)
                                //  db.set("support"+ message.guild.id , true)
                                message.channel.send(`✅ |\`Le statut à été set up \` avec comme statut ${status}`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                collected.first().delete()
                                    .catch(console.error);
                            })
                        }
                    } else if (i.values[0] == "Retourdel") {
                        menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                        await i.deferUpdate()

                    } else if (i.values[0] == 'desactivedel') {
                        let link = db.fetch(`support${message.guild.id}`)
                        if (link == true) {
                            db.delete('status' + message.guild.id)
                            message.channel.send(`❌ |\`Le statut \` vien d'être reset`).then(msg => {
                                setTimeout(() => msg.delete(), 10000)
                            })
                                .catch(console.error);
                            await i.deferUpdate()


                        } else {
                            message.channel.send(`❌ |\`Le statut \` est déjà reset`).then(msg => {
                                setTimeout(() => msg.delete(), 10000)
                            })
                                .catch(console.error);
                            await i.deferUpdate()
                        }
                    }


                    //activé
                    if (i.values[0] === "activemodule") {
                        await i.deferUpdate()
                        let soutien = db.fetch("support" + message.guild.id)
                        if (soutien === true) {
                            return message.channel.send("Le module de soutien est déjà activé").then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        } else {
                            db.set("support" + message.guild.id, true)
                            return message.channel.send("✅ |Le module de soutien vient d'être activé.").then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        }
                    } else if (i.values[0] === "desactivemodule") {
                        await i.deferUpdate()
                        let soutien = db.fetch("support" + message.guild.id)
                        if (soutien == true) {
                            db.set("support" + message.guild.id, null)
                            return message.channel.send("❌ |Le module de soutien vient d'être désactivé.").then(msg => {
                                setTimeout(() => msg.delete(), 60000)
                            })
                        } else return message.channel.send('✅ |Le module de soutien est déjà désactivé.').then(msg => {
                            setTimeout(() => msg.delete(), 60000)
                        })
                    }


                    let role = await db.fetch("srole" + message.guild.id)
                    let statut = await db.fetch("status" + message.guild.id)
                    //remove
                    if (i.values[0] === "Settings") {
                        await i.deferUpdate()
                        const paramètre = new MessageEmbed()
                            .setTitle('Soutien')
                            .setColor(color)
                            .setDescription(`**Voici la configuration du soutien**\n\n**Rôle Soutien:** <@&${role}>\n**Statut à avoir**: __${statut}__`)

                        menumsg.edit({ embeds: [paramètre], components: [new MessageActionRow().addComponents([menuoptions])] })

                    }

                })
        }
        } catch (e) {
            console.log(e)
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(color)
                    .setTitle("Une erreur est survenu")
                    .setDescription('Erreur intattenudu')
                ]
            });
    }
}
    }
}

