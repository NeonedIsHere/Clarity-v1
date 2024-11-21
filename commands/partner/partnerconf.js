const Discord = require ("discord.js");
const { MessageEmbed , MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const db = require('quick.db');
const cl = new db.table('Color')

module.exports = {
    name: "partnerconf",
    aliases: ["partner-conf"],
    description: "Configurer le systeme de partenariat",
    run: async (client, message, args) => {
        const PERMISSION_ERROR_MESSAGE = "Vous n'avez pas les permissions nécessaires pour exécuter cette commande.";
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(PERMISSION_ERROR_MESSAGE);
          }
          let color = cl.fetch(`color_${message.guild.id}`)
          if (color == null) color = client.config.color
         // recupere tout les channels du serveur et les stocks dans la variable channels avec une limite de 25 channels

         const partnerlog = db.get(`partnerlog_${message.guild.id}`)


         const menu = new MessageActionRow()
           .addComponents(
             new MessageSelectMenu()
             .setCustomId('partnerconf')
             .setPlaceholder('Sélectionne un channel')
             .setMinValues(1)
             .setMaxValues(1)
             .addOptions([{
                label: "Changer le channel de partenariat",
               value: "partnerconfc"
             }])
           );


                                        const but = new MessageActionRow()
                                        .addComponents(
                                              new MessageButton()
                                               .setCustomId("partnerconfreset")
                                               .setLabel("Réinitialiser")
                                               .setStyle("DANGER")
                                               .setEmoji("1070366464013500538"),

                                        )

                                        let embed = new MessageEmbed()
                                        .setColor(color)
                                        .setDescription(`**${message.author.username}**, bienvenue sur le systeme de partenariat de **${client.user.username}**!`)
                                        .addFields({
                                        name: "Channel partenariat",
                                        value: `<#${partnerlog}>`
                                        })



                                      let msg = await message.channel.send({
                                        embeds: [embed],
                                        components: [menu, but]
                                      })


                                        const collector = message.channel.createMessageComponentCollector({
                                            component_type: 'SELECT_MENU'
                                            })

                                        collector.on("collect", async i => {
                                            i.deferUpdate();

                                            if (i.user.id)


                                            if (i.customId === "partnerconfreset") {
                                                message.channel.send({ content: "Vous avez réinitialisé la configuration du systeme de partenariat." })
                                                db.set(`partnerlog_${message.guild.id}`, null)

                                                let confe = new MessageEmbed()
                                                .setColor(color)
                                                .setDescription(`**${message.author.username}**, bienvenue sur le systeme de partenariat de **${client.user.username}**!`)
                                                .addFields({
                                                name: "Channel partenariat",
                                                value: `<#${partnerlog}>`
                                                })

                                            msg.edit({ embeds: [confe] })
                                            }

                                            if (i.customId === "partnerconf") {

                                                if (i.values[0] === "partnerconfc") {

                                                    let ez = await message.channel.send({content: "Veuillez choisir un channel de partenariat pour le serveur"})
                                                    const filter = m => m.author.id === message.author.id;
                                                    let collected = await message.channel.awaitMessages({
                                                        filter: filter,
                                                        max: 1,
                                                        time: 60000,
                                                        errors: ["time"]
                                                    }).then(collected => {
                                                        ez.delete()
const msg = collected.first().content
const channel = message.mentions.channels.first() || message.guild.channels.cache.get(msg)
if (!channel) {
    return message.channel.send({ content: "Ce salon n'existe pas." })
}

if (channel.type!== "GUILD_TEXT") {
    return message.channel.send({ content: "Ce salon n'est pas un salon textuel." })
}

else {
    const embed = new MessageEmbed()
    embed.setColor(color)
    embed.setDescription(`Vous avez configuré le systeme de partenariat de **${client.user.username}** pour le salon **${channel.name}**.`)
    embed.setTimestamp()
    embed.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL()})
    message.channel.send({ embeds: [embed] })
    db.set(`partnerlog_${message.guild.id}`, channel.id)

    let confe = new MessageEmbed()
    .setColor(color)
    .setDescription(`**${message.author.username}**, bienvenue sur le systeme de partenariat de **${client.user.username}**!`)
    .addFields({
    name: "Channel partenariat",
    value: `<#${partnerlog}>`
    })

msg.edit({ embeds: [confe] })
}

                                                    })


                                            }
                                        }
                                        })


    }
}