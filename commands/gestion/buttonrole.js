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
    name: "buttonrole",
    description: "Ajoute un bouton à un message.",
    run: async(client, message, args, prefix) => {
        const msg = message
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){
        
        const bttcolor = (color) => {
            switch(color){
                  case 'PRIMARY':
                      return "Bleu"
                  case "SECONDARY":
                      return "Gris"
                  case "DANGER":
                      return "Rouge"
                  case "SUCCESS":
                      return "Vert"
            }
        }
        
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
            try {
            
        if(db.get(`rolemenustyle_${message.guild.id}`) === "Boutons" || db.get(`rolemenustyle_${message.guild.id}`) === null) {
            let embed = new Discord.MessageEmbed()
            embed.setTitle(`Configuration Buttonrole`)
            embed.setColor(color)
            embed.addFields({name: "Message", value: db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`})
            embed.addFields({name: "Channel", value: `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`})
            embed.addFields({name: "Rôle", value: db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`})
            embed.addFields({name: "Couleur", value: db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`})
            embed.addFields({name: "Text", value: db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`})
            embed.addFields({name: "Emoji", value: db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`})
            
            let menuoptions = new MessageSelectMenu()
            .setCustomId(message.id + 'MenuSelection')
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Choisis une option")
            .addOptions([
                {
                    label: "Modifier le message",
                    value: `mdfm`,
                    emoji: "📝",
                },
                {
                    label: "Modifier le salon",
                    value: `mdfs`,
                    emoji: "📖",
                },
                {
                    label: "Modifier le rôle",
                    value: "mdfr",
                    emoji: "👤"
                },   {
                    label: "Modifier la couleur",
                    value: "mdfc",
                    emoji: "🎨"
                },{
                    label: "Modifier le texte",
                    value: "mdft",
                    emoji: "📄"
                },{
                    label: "Supprime le texte",
                    value: "spt",
                    emoji: "🎨"
                },{
                    label: "Modifier l'emoji",
                    value: "mdfe",
                    emoji: "📜"
                },
                {
                    label: "Supprimer l'emoji",
                    value: "mdfi",
                    emoji: "🌟"
                },
                {
                    label: "Validé",
                    value: "confirm",
                    emoji: "✅",
                }, {
                    label: "Reformulé Votre Choix",
                    value: "cancel",
                    emoji: "❌",
                },
               
            ])

            const romsg = await message.reply({ embeds: [embed], components: [new MessageActionRow().addComponents(menuoptions)] })
            
            filter2 = (m) => m.author.id === message.author.id

            const collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU"
            });

            collector.on("collect", async (i) => {
                if (i.user.id !== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser ce menu", ephemeral: true})
                if (i.customId !== message.id + "MenuSelection") return
                i.deferUpdate()
                const value = i.values[0];

                if (value === "mdfm") {
                    const ez = await message.channel.send(`Quel est le message du button role?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(async collected => {
                        ez.delete()
                        collected.first().delete()

                        let msg = collected.first()
                        let roleid = db.get(`buttonrolemenusalon_${message.guild.id}`) || message.channel
                        let role =  message.guild.channels.cache.get(roleid)
                        if (!role) return message.channel.send(`Aucun salon de définie.`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                        let rolee = await role.messages.fetch(msg.content);
    
                        if (!rolee) return message.channel.send(`Aucun message trouvé pour \`${msg.content}\`.`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                        if (rolee.author.id !== client.user.id) return message.channel.send(`Je dois être l'auteur du message pour pouvoir ajouter les boutons`).then(m => setTimeout(() => m.delete().catch(() => false), 3500));
                        db.set(`buttonrolemenumsg_${message.guild.id}`, msg.content)
    
                        let embed = new Discord.MessageEmbed()
                        embed.setTitle(`Configuration Buttonrole`)
                        embed.setColor(color)
                        embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
                        embed.addField("Channel", `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`)
                        embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
                        embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                        embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
                        embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
                        embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
    
                        romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                    })
                }

                if (value === "mdfs") {
                    const ez = await message.channel.send(`Quel est le channel du button role?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {
                        ez.delete()
    
                        let msg = collected.first();
    
                        let ch = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
                        if (!ch) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                        db.set(`buttonrolemenusalon_${message.guild.id}`, ch.id)
    
    
                        collected.first().delete()
    
                        let embed = new Discord.MessageEmbed()
                        embed.setTitle(`Configuration Buttonrole`)
                        embed.setColor(color)
                        embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
            embed.addField("Channel", `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`)
            embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
            embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
            embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
            embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
            embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
    
                        romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
    
    
                    })
                }

                if (value === "mdfr") {
                    const ez = await message.channel.send(`Quel est le role du reaction role?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {
                        ez.delete()
                        collected.first().delete()
    
                        let msg = collected.first();
                        let role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                        if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${msg.content}\``).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                        db.set(`buttonrolemenurole_${message.guild.id}`, role.id)
    
                        let embed = new Discord.MessageEmbed()
                        embed.setTitle(`Configuration Buttonrole`)
                        embed.setColor(color)
                        embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
            embed.addField("Channel", `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`)
            embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
            embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
            embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
            embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
            embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
    
                        romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                    })
                }

                if (value === "mdfc"){
                    const embed2 = new Discord.MessageEmbed()
                    embed2.setTitle("Configuration Buttonrole")
                    embed2.setColor(color)
                    embed2.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                
                    let menuoption = new MessageSelectMenu()
                    .setCustomId(message.id + 'MenuSelection2')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("Choisis une option")
                    .addOptions([
                    {
                        label: "Gris",
                        value: `gris`,
                    },
                    {
                        label: "Vert",
                        value: "vert"
                    },
                    {
                        label: "Rouge",
                        value: "rouge"
                    },
                    {
                        label: "Bleu",
                        value: "bleu"
                    },
                    {
                        label: "Retour",
                        value: "retour"
                    }])

                    romsg.edit({embeds: [embed2], components: [new MessageActionRow().addComponents(menuoption)]})
                    const collector = message.channel.createMessageComponentCollector({
                        componentType: "SELECT_MENU"
                    });
                    
                    collector.on('collect', async i => {
                        if (i.customId !== message.id + 'MenuSelection2') return
                        if (i.user.id !== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser ce menu", ephemeral: true})
                        i.deferUpdate()
                        const value = i.values[0];

                        if (value === "gris"){
                            db.set(`buttonrolemenucolor_${msg.guild.id}`, "SECONDARY")
                            message.channel.send("La couleur du bouton sera \`GRIS\`").then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                            
                            const embed2 = new Discord.MessageEmbed()
                            embed2.setTitle("Configuration Buttonrole")
                            embed2.setColor(color)
                            embed2.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                            romsg.edit({embeds: [embed2], components: [new MessageActionRow().addComponents(menuoption)]})
                        }

                        if (value === "vert"){
                            db.set(`buttonrolemenucolor_${msg.guild.id}`, "SUCCESS")
                            message.channel.send("La couleur du bouton sera \`VERT\`").then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                            
                            const embed2 = new Discord.MessageEmbed()
                            embed2.setTitle("Configuration Buttonrole")
                            embed2.setColor(color)
                            embed2.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                            romsg.edit({embeds: [embed2], components: [new MessageActionRow().addComponents(menuoption)]})
                        }

                        if (value === "rouge"){
                            db.set(`buttonrolemenucolor_${msg.guild.id}`, "DANGER")
                            message.channel.send("La couleur du bouton sera \`ROUGE\`").then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                            
                            const embed2 = new Discord.MessageEmbed()
                            embed2.setTitle("Configuration Buttonrole")
                            embed2.setColor(color)
                            embed2.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                            romsg.edit({embeds: [embed2], components: [new MessageActionRow().addComponents(menuoption)]})
                        }

                        if (value === "bleu"){
                            db.set(`buttonrolemenucolor_${msg.guild.id}`, "PRIMARY")
                            message.channel.send("La couleur du bouton sera \`BLEU\`").then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                            
                            const embed2 = new Discord.MessageEmbed()
                            embed2.setTitle("Configuration Buttonrole")
                            embed2.setColor(color)
                            embed2.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                            romsg.edit({embeds: [embed2], components: [new MessageActionRow().addComponents(menuoption)]})
                        }

                        if (value === "retour"){   
                            let embed = new Discord.MessageEmbed()
                            embed.setTitle(`Configuration Buttonrole`)
                            embed.setColor(color)
                            embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
                            embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
                            embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                            embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
                            embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
                            embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
    
                            romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                        }
                    })
                }

                if (value === "mdft"){
                    const ez = await message.channel.send(`Quel est le texte ?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {
                        ez.delete()
                        collected.first().delete()
                        
                        db.set(`buttonrolemenutext_${msg.guild.id}`, collected.first().content)

                        let embed = new Discord.MessageEmbed()
                        embed.setTitle(`Configuration Buttonrole`)
                        embed.setColor(color)
                        embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
            embed.addField("Channel", `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`)
            embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
            embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
            embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
            embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
            embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
                        romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                    })
                }

                if (value === "spt"){
                    db.delete(`buttonrolemenutext_${msg.guild.id}`)
                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Buttonrole`)
                    embed.setColor(color)
                    embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
                    embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
                    embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                    embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
                    embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
                    embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
                    romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })          
                }

                if (value === "mdfi"){
                    db.delete(`buttonrolemenuemoji_${msg.guild.id}`)
                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Buttonrole`)
                    embed.setColor(color)
                    embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
                    embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
                    embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                    embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
                    embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
                    embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
                    romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })          
                }

                if (value === "mdfe"){
                    const ez = await message.channel.send(`Quel est l'emoji?`)
                    let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    ez.delete()

                    collected.first().react(msg.content).then(() => {
                        db.set(`buttonrolemenuemoji_${message.guild.id}`, msg.content)
                        ez.delete()
                        collected.first().delete()
                        let embed = new Discord.MessageEmbed()
                        embed.setTitle(`Configuration Buttonrole`)
                        embed.setColor(color)
                        embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
                        embed.addField("Channel", `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`)
                        embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
                        embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                        embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
                        embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
                        embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
                
                        romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                    }).catch((e) => {
                        console.log(e)
                        ez.delete()
                        collected.first().delete()
                        return message.channel.send(`Je n'est pas accès à cette emoji`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                    })
                })
                }

                if (value === "confirm"){
                    let channel = message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) || message.channel
                    channel.messages.fetch(db.get(`buttonrolemenumsg_${message.guild.id}`)).then(async mmm => {
                      
                        if (!mmm) return message.channel.send(`Aucun **message** valide n'est configuré !`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))

                        let role = message.guild.roles.cache.get(db.get(`buttonrolemenurole_${message.guild.id}`))
                        if (!channel) return message.channel.send(`Aucun **salon** valide n'est configuré !`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                        if (!role) return message.channel.send(`Aucun **rôle** valide n'est configuré !`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                        if (!db.get(`buttonrolemenutext_${msg.guild.id}`) && db.get(`rolemenubuttonemoji_${msg.guild.id}`)) 
                            return message.channel.send("Veuillez mettre une emote ou un texte")
                        if (!db.get(`buttonrolemenucolor_${msg.guild.id}`)) return message.channel.send(`Veuillez choisir une couleur de bouton`).then(m => setTimeout(() => m.delete().catch(() => false), 3500))
                        const cc = new MessageButton()
                            .setCustomId("buttonrole")
                            if (db.get(`rolemenubuttonemoji_${msg.guild.id}`)) cc.setEmoji(db.get(`rolemenubuttonemoji_${msg.guild.id}`))
                            if (db.get(`buttonrolemenutext_${msg.guild.id}`)) cc.setLabel(db.get(`buttonrolemenutext_${msg.guild.id}`))
                            cc.setStyle(db.get(`buttonrolemenucolor_${msg.guild.id}`))
                        
                        mmm.edit({components: [new MessageActionRow().addComponents(cc)]})
                        .then(() => {
                            db.set(`buttonrole_${db.get(`buttonrolemenu_${msg.guild.id}`)}`, db.get(`buttonrolemenurole_${msg.guild.id}`))

                            db.delete(`buttonrolemenumsg_${msg.guild.id}`)
                            db.delete(`buttonrolemenusalon_${msg.guild.id}`)
                            db.delete(`buttonrolemenurole_${msg.guild.id}`)
                            db.delete(`buttonrolemenucolor_${msg.guild.id}`)
                            db.delete(`buttonrolemenutext_${msg.guild.id}`)
                            db.delete(`rolemenubuttonemoji_${msg.guild.id}`)

                            
                            let embed = new Discord.MessageEmbed()
                            embed.setTitle(`Configuration Buttonrole`)
                            embed.setColor(color)
                            embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
                            embed.addField("Channel", `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`)
                            embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
                            embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                            embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
                            embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
                            embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
                
                            romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                        })
                    })
                }

                if (value === "cancel"){
                    db.delete(`buttonrolemenumsg_${msg.guild.id}`)
                    db.delete(`buttonrolemenusalon_${message.guild.id}`)
                    db.delete(`buttonrolemenurole_${msg.guild.id}`)
                    db.delete(`buttonrolemenucolor_${msg.guild.id}`)
                    db.delete(`buttonrolemenutext_${msg.guild.id}`)
                    db.delete(`rolemenubuttonemoji_${msg.guild.id}`)

                    let embed = new Discord.MessageEmbed()
                    embed.setTitle(`Configuration Buttonrole`)
                    embed.setColor(color)
                    embed.addField("Message", db.get(`buttonrolemenumsg_${msg.guild.id}`) === null ? `Le dernier du salon (${message.channel})` : `[${db.get(`buttonrolemenumsg_${message.guild.id}`)}](https://discord.com/channels/${message.guild.id}/${db.get(`buttonrolemenusalon_${message.guild.id}`)}/${db.get(`rolemenumsg_${message.guild.id}`)}) (<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>)`)
                    embed.addField("Channel", `${message.guild.channels.cache.get(db.get(`buttonrolemenusalon_${message.guild.id}`)) ? `<#${db.get(`buttonrolemenusalon_${message.guild.id}`)}>` : "❌"}`)
                    embed.addField("Rôle", db.get(`buttonrolemenurole_${msg.guild.id}`) === null ? "❌" : `<@&${db.get(`buttonrolemenurole_${msg.guild.id}`)}> (${db.get(`rolemenurole_${msg.guild.id}`)})`)
                    embed.addField("Couleur", db.get(`buttonrolemenucolor_${msg.guild.id}`) === null ? "GRIS" : `${bttcolor(db.get(`buttonrolemenucolor_${msg.guild.id}`))}`)
                    embed.addField("Text", db.get(`buttonrolemenutext_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenutext_${msg.guild.id}`)}`)
                    embed.addField("Emoji", db.get(`rolemenubuttonemoji_${msg.guild.id}`) === null ? "❌" : `${db.get(`buttonrolemenubuttonemoji_${msg.guild.id}`)}`)
                    embed.setFooter({text: `${client.config.footer} ${client.config.version}` })
                
                    romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] }) 
                }
            })
        }

    } catch (err) {
        console.log(err)
    }
}
}
}