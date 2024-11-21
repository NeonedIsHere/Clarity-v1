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
    name: "autorole",
    description:"permet aux propriétaires de serveurs ou au personnel désigné de configurer la fonction de rôle d'attribution automatique des rôles",
    run : async(client, message, args, prefix) => {
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){
            const guild = message.guild;
         let color = cl.fetch(`color_${message.guild.id}`)
        try {
            
                let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration de l\'autorôle')
                    embed.setColor(color)
                    embed.setDescription(`__Configuration actuelle :__\nActivé : ${db.get(`autoroleenable_${message.guild.id}`) === true ? "✅" : "❌"}\nRôle : ${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`)) ? `${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`))}` : `Non défini`}\n\n :one: Activer l\'autorôle\n\n:two: Désactiver l\'autorôle\n\n:three: Changer le rôle`)
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })

                let menuoptions = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
             
                    {
                        label: "Modifier le rôle",
                        value: "mdfr",
                        emoji: "👤"
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
                let used1 = false;

                    const romsg = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })


         

        
        const collector = message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU",
            filter: (i => i.user.id === message.author.id)
        });
        filter2 = (m) => m.author.id === message.author.id

        collector.on("collect", async (i) => {
            i.deferUpdate()
            const value = i.values[0];
            //retour

            if (value === "mdfr") {
                const ez = await message.channel.send(`Veuillez envoyer le rôle pour l\'autorôle (\`mention\` ou \`id\`)`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {
                    ez.delete()

                    let msg = collected.first();
                    let role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                    if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${msg.content}\``);
                    db.set(`autorole_${message.guild.id}`, role.id)
                    collected.first().delete()

                    let embed = new Discord.MessageEmbed()
                    embed .setTitle('Configuration de l\'autorôle')
                    embed.setColor(color)
                    embed.setDescription(`__Configuration actuelle :__\nActivé : ${db.get(`autoroleenable_${message.guild.id}`) === true ? "✅" : "❌"}\nRôle : ${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`)) ? `${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`))}` : `Non défini`}\n\n :one: Activer l\'autorôle\n\n:two: Désactiver l\'autorôle\n\n:three: Changer le rôle`)
                    embed.setFooter({text: `LuminaBots ${client.config.version}` })

                    romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
                })
            }


            if (value === "on") {
                let embed = new Discord.MessageEmbed()
                embed .setTitle('Configuration de l\'autorôle')
                embed.setColor(color)
                embed.setDescription(`__Configuration actuelle :__\nActivé : ${db.get(`autoroleenable_${message.guild.id}`) === true ? "✅" : "❌"}\nRôle : ${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`)) ? `${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`))}` : `Non défini`}\n\n :one: Activer l\'autorôle\n\n:two: Désactiver l\'autorôle\n\n:three: Changer le rôle`)
                embed.setFooter({text: `LuminaBots ${client.config.version}` })
                db.set(`autoroleenable_${message.guild.id}`, true)
                romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
        }

        if (value ==="off") {
            let embed = new Discord.MessageEmbed()
            embed .setTitle('Configuration de l\'autorôle')
            embed.setColor(color)
            embed.setDescription(`__Configuration actuelle :__\nActivé : ${db.get(`autoroleenable_${message.guild.id}`) === true ? "✅" : "❌"}\nRôle : ${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`)) ? `${message.guild.roles.cache.get(db.get(`autorole_${message.guild.id}`))}` : `Non défini`}\n\n :one: Activer l\'autorôle\n\n:two: Désactiver l\'autorôle\n\n:three: Changer le rôle`)
            embed.setFooter({text: `LuminaBots ${client.config.version}` })
            db.set(`autoroleenable_${message.guild.id}`, false)
            romsg.edit({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })
        }
    
    })

    } catch (err) {
        console.log(err)
    }
}
        }
      
        
     

    }
