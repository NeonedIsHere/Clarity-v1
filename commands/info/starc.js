const Discord = require('discord.js');
const db = require('quick.db');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const cl = new db.table("Color")
module.exports = {
    name: "starc",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'utilisé cette commande.")
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const embed = new MessageEmbed()
        .setColor(color)
        .setDescription("Config le starboard de ton serveur")
        .setFooter({text: `LuminaBots ${client.config.version}` })
      const star = new MessageSelectMenu()
      .setCustomId('star')
      .setPlaceholder('Veuillez sélectionner une option')
      .setMaxValues(1)
      .setMinValues(1)
      .addOptions([
        {
            label: "Channel starboard",
            value: "starchan"
        }
    ])
    const menumsg = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([star])] })

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

        if(i.values[0] === "starchan") {
            const ez = await message.channel.send(`Quel est le channel pour les starboard du serveur`)
                     
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
                    db.set(`starchan_${message.guild.id}`, channel.id)
                    return message.channel.send(`Channel pour les starboard mis à jour`)
                }

               
                


            })
        }

   
    })   
    }
    }



    