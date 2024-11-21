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
    name: "joinconf",
    run : async(client, message, args, prefix) => {

      
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){
                let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
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
                                    label: "Message Personnalisé",
                                    value: `msgperso`,
                                    emoji: "🈴",
                                },
                                {
                                    label: "Variable pour le mess de bienvenue",
                                    value: "varm"
                                },
                                {
                                    label: 'MP Personnalisé',
                                    value: `mpperso`,
                                    emoji: "💬",
                                },
                                {
                                    label: "Activé le message de bienvenue",
                                    value: "activemodule",
                                    emoji: "✅",
                                },
                                {
                                    label: "Désactivé le message de bienvenue",
                                    value: "desactivemodule",
                                    emoji: "❌",
                                },
                                {
                                    label: "Activé le mp de bienvenue",
                                    value: "activemodulemp",
                                    emoji: "➰",
                                },
                                {
                                    label: "Désactivé le mp de bienvenue",
                                    value: "desactivemodulemp",
                                    emoji: "✖",
                                },
                                {
                                    label: "Channel de bienvenue",
                                    value: "joinchan",
                                    emoji: "🎀"
                                },
                                {
                                    label: 'Annulé',
                                    value: "Cancel",
                                    emoji: '〰',
                                },
                            ])

                            // jv le rework car pas beau et il est bof

                        
                     

                        let onoffjoin = db.get(`joinsettings_${message.guild.id}`)
                        if (onoffjoin == true) onoffjoin = "Activé"
                        if (onoffjoin == false) onoffjoin = "Désactivé"
                        if (onoffjoin == null) onoffjoin = "Désactivé"


                        let onoffjoinmp = db.get(`joinsettingsmp_${message.guild.id}`)
                        if (onoffjoinmp == true) onoffjoinmp = "Activé"
                        if (onoffjoinmp == false) onoffjoinmp = "Désactivé"
                        if (onoffjoinmp == null) onoffjoinmp = "Désactivé"

                        let messagebvnn = db.get(`messagebvn_${message.guild.id}`)
                        if (messagebvnn == '[object Object]') messagebvnn = "Non configuré"
                        if (messagebvnn == null) messagebvnn = "Non configuré"

                        let mpjoin = db.get(`messagebvnmp_${message.guild.id}`)
                        if (mpjoin == '[object Object]') mpjoin = "Non configuré"
                        if (mpjoin == null) mpjoin = "Non configuré"


                        let salonbvn = `<#${db.get(`salonbvn_${message.guild.id}`)}>`
                        if (salonbvn == "<#null>") salonbvn = "Non configuré"

                        const MenuEmbed = new Discord.MessageEmbed()
                            .setTitle('Paramètres de Bienvenue')
                            .setDescription(`**Choisissez les options lorsqu'un membre rejoindra le serveur**`)

                            .addFields(
                                { name: 'Activé/Désactivé', value: `Message de Bienvenue: **${onoffjoin}**\n MP de Bienvenue: **${onoffjoinmp}**` },
                                { name: 'Salon de bienvenue', value: salonbvn },
                            )
                            .addFields(
                                { name: 'MP de bienvenue', value: mpjoin, inline: false },
                                { name: 'Message de bienvenue', value: `${messagebvnn}`, inline: false },
                            )

                            .setColor(color)
                            .setFooter({ text: `LuminaBots ${client.config.version}`  })

                        let used1 = false;

                        const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })

                        function menuselection(i) {
                            used1 = true;
                        }

                        //Event
                        let msg = menumsg

                        const antichannel = new MessageEmbed()
                            .setTitle(`Configuré le message de bienvenue`)
                            .setDescription("**Séléctionner l'option qui vous correspond**")
                            .setColor(color)
                          

                        const antichanneldelete = new MessageEmbed()
                            .setTitle(`Configuré le MP de bienvenue`)
                            .setDescription("**Indiquer quel message sera envoyé aux nouveau membres qui rejoindront le serveur**")
                            .setColor(color)
                          


                        let options = new MessageSelectMenu()
                            .setCustomId('MenuOn')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Définir un Message",
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
                                    label: "Définir un Message",
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

                        let filter1 = (i) => i.user.id === message.author.id;
                        const col = await msg.createMessageComponentCollector({
                            filter: filter1,
                            componentType: "SELECT_MENU"
                        })

                        col.on("collect", async (i) => {
                            if (i.values[0] == "Cancel") {
                                menumsg.delete()
                            }


                            if (i.values[0] === "varm"){
                                const premiumTier = {
                                    NONE: 0,
                                    TIER_1: 1,
                                    TIER_2: 2,
                                    TIER_3: 3,
                                };
                    
                                const embed = new Discord.MessageEmbed()
                                    .setTitle(`Arguments de messages`)
                                    .setDescription(`Exemple de message simple: \`{MemberMention} nous a rejoint,  nous sommes maintenant {MemberCount} sur {Server}\``)
                                    .addFields(
                                        { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Funny`'},
                                        { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`},
                                        { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Funny#0666`'},
                                    )
                                    .addFields(
                                        { name: '{MemberID}', value: `L'ID du membre concerné\n\`Exemple: ${message.author.id}\``},
                                        { name: '{MemberCount}', value: `Le nombre total de membres sur le serveurn\n\`Exemple: ${message.guild.memberCount}\``},
                                        { name: '{Server}', value: `Le nom du serveur\n\`Exemple: ${message.guild.name}\``},
                                    )
                                    .addFields(
                                        { name: '{ServerBoostsCount}', value: `Le nombre de boost du serveur\n\`Exemple: ${message.guild.premiumSubscriptionCount || '0'}\``},
                                        { name: '{ServerLevel}', value: `Le niveau actuel du serveur\n\`Exemple: ${premiumTier[message.guild.premiumTier]}\``},
                                        { name: '{VocalMembersCount}', value: `Le nombre total de membres en vocal sur le serveur\n\`Exemple: ${message.guild.members.cache.filter(m => m.voice.channel).size}\``},
                                    )
                                    .addFields(
                                        { name: '{OnlineMembersCount}', value: `Le nombre total de membres en ligne sur le serveur\n\`Exemple: ${message.guild.presences.cache.filter((presence) => presence.status !== "offline").size}\``},
                                    )
                                    .setColor(color)
                                    .setFooter({text: `LuminaBots ${client.config.version}` })
                    
                                message.channel.send({ embeds: [embed] })
                                return
                            }

                            else if (i.values[0] == "joinchan") {

                                const ez = await message.channel.send(`Quel est le channel de bienvenue?(id)`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        }).then(collected => {

                          
                            var msg = collected.first();

                            const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(msg.content || message.channelId);
                if (msg.content == undefined) msg.content = `<#${message.channel.id}>`

                           
                            if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
                            if (db.get(`salonbvn_${message.guild.id}`) === newChannel) return message.channel.send(`Nouveau salon de bienvenue : \`${db.get(`salonbvn_${message.guild.id}`)}\``)
                            else {
                                db.set(`salonbvn_${message.guild.id}`, newChannel.id)
                                message.channel.send(`Nouveau salon de bienvenue : ${msg.content}`)
            
                                const logs = db.get(`salonbvn_${message.guild.id}`)
            
                                const embed = new Discord.MessageEmbed()
                                    .setColor(color)
                                    .setTitle(`${message.author.tag} à défini ce salon comme salon de bienvenue`)
                                    .setDescription(` Ce salon est désormais utilisé pour toutes les **arrivées** du serveur\n Executeur : <@${message.author.id}>`)
                                    .setTimestamp()
                                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                                client.channels.cache.get(logs).send({ embeds: [embed] }).catch(console.error)


                                
                            }

                            ez.delete()
                            collected.first().delete()
                        })
                            }
                            else if (i.values[0] === "msgperso") {
                                menumsg.edit({ embeds: [antichannel], components: [new MessageActionRow().addComponents([options])] })
                              
                            }
                            if (i.values[0] == "active") {
                                let link = db.fetch(`messagebvn_${message.guild.id}`)
                                if (link == true) {
                                    message.channel.send(`✅ |\`Un message \` est déjà setup`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);
                                  
                                }
                                else {
                                  
                                    const oui = await message.channel.send(`Quel message doit être envoyé dans le salon de bienvenue lorsqu'un membre rejoindra le serveur (${prefix}hm pour afficher les variables)`)
                                    let collected = message.channel.awaitMessages({
                                        filter: m => m.author.id === message.author.id,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    })
                                        .then(collected => {
                                            oui.delete()

                                            const status = collected.first().content
                                            db.set(`messagebvn_${message.guild.id}`, status)
                                            collected.first().delete()

                                            message.channel.send(`✅ |\`Le module message de bienvenue \` a été activé avec succès`).then(msg => {
                                                setTimeout(() => msg.delete(), 60000)
                                            }).catch(console.error);
                                        })
                                }

                            } else if (i.values[0] == "Retour") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                              

                            } else if (i.values[0] == 'desactive') {
                                let link = db.fetch("msgperso_" + message.guild.id)
                                if (link == true) {
                                    //     db.set("support"+ message.guild.id , null)
                                    db.delete("messagebvn_" + message.guild.id)
                                    message.channel.send(`❌ |\`Le message de bienvenue \` vient d'être reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);
                                  

                                } else if (link == null) {
                                    message.channel.send(`❌ |\`Le message de bienvenue \` est déjà reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);
                                  
                                }

                            }

                            //Statut
                            else if (i.values[0] === "mpperso") {
                                menumsg.edit({ embeds: [antichanneldelete], components: [new MessageActionRow().addComponents([AntiChannelDelete])] })
                              
                            } if (i.values[0] == "activedel") {
                              
                                let link = db.fetch(`messagebvnmp_${message.guild.id}`)
                                if (link == true) {
                                    message.channel.send(`✅ |\`Les de mp de bienvenue \` sont déjà activés`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);
                                } else {

                                    const ez = await message.channel.send(`Quel message doit être envoyé aux membres qui rejoindront le serveur (${prefix}hm pour afficher les variables)`)
                                    let collected = await message.channel.awaitMessages({
                                        filter: filter2,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    }).then(collected => {
                                        ez.delete()

                                        const status = collected.first().content
                                        db.set(`messagebvnmp_${message.guild.id}`, status)
                                        //  db.set("support"+ message.guild.id , true)
                                        message.channel.send(`✅ |\`Le mp de bienvenue à été set up \`Message: ${status}`).then(msg => {
                                            setTimeout(() => msg.delete(), 10000)
                                        })
                                        collected.first().delete()
                                            .catch(console.error);
                                    })
                                }
                            } else if (i.values[0] == "Retourdel") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                              

                            } else if (i.values[0] == 'desactivedel') {
                                let link = db.fetch(`support${message.guild.id}`)
                                if (link == true) {
                                    db.delete('status' + message.guild.id)
                                    message.channel.send(`❌ |\`Le mp de bienvenue \` vien d'être reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);
                                  


                                } else {
                                    message.channel.send(`❌ |\`Le mp de bienvenue \` est déjà reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(console.error);
                                  
                                }
                            }


                            //activé MSG
                            if (i.values[0] === "activemodule") {
                              
                                let soutien = db.fetch("joinsettings_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le module de join est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else {
                                    db.set("joinsettings_" + message.guild.id, true)
                                    return message.channel.send("✅ |Le module de join vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodule") {
                              
                                let soutien = db.fetch("joinsettings_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("joinsettings_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le module de join vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else return message.channel.send('✅ | Le module de join est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 60000)
                                })
                            }

                            //activé mp
                            if (i.values[0] === "activemodulemp") {
                              
                                let soutien = db.fetch("joinsettingsmp_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le module de join est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else {
                                    db.set("joinsettingsmp_" + message.guild.id, true)
                                    return message.channel.send("✅ |Le module de join vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodulemp") {
                              
                                let soutien = db.fetch("joinsettingsmp_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("joinsettingsmp_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le module de join vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 60000)
                                    })
                                } else return message.channel.send('✅ | Le module de join est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 60000)
                                })
                            }

                        })
                    }
                } catch (err) {
                    console.log(err)
                }
            
        }
    }
}