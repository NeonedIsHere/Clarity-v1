const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const cl = new db.table("Color")
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
  name: "counters",
  description: "Créé un counter sur votre serveur.",
  run: async (client, message, args, prefix) => {
    if (client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {

      let color = cl.fetch(`color_${message.guild.id}`)
      if (color == null) color = client.config.color

      const membercount = message.guild.channels.cache.get(db.get(`${message.guild.id}_membercount`))
      const rolescount = message.guild.channels.cache.get(db.get(`${message.guild.id}_rolescount`))
      const botscount = message.guild.channels.cache.get(db.get(`${message.guild.id}_botscount`))
      const boostscount = message.guild.channels.cache.get(db.get(`${message.guild.id}_boostscount`))

      const embed = new MessageEmbed()
        .setTitle("Compteurs du serveur")
        .addFields({
          name: "👥・Compteur de membres",
          value: `${ membercount ? `${membercount}` : "Aucun"}`
        }, {
          name: "📚・Compteur de rôles",
          value: `${ rolescount ? `${rolescount}` : "Aucun"}`
        }, {
          name: "🤖・Compteur de robots",
          value: `${ botscount ?`${botscount}` : "Aucun"}`
        }, {
          name: "🔮・Compteur de boosts",
          value: `${ boostscount ? `${boostscount}` : "Aucun"}`
        }, )
        .setTimestamp()
        .setFooter({
          text: client.config.footer
        })
        .setColor(color)

      const menu = new MessageSelectMenu()
        menu.setCustomId(message.id + "counters")
        menu.setMaxValues(1)
        menu.setMinValues(1)
        menu.setPlaceholder("Veuillez choisir une option")
        menu.addOptions([{
            label: "Modifier le compteur de membres",
            emoji: "👥",
            value: "editmemberscount"
          },
          {
            label: "Supprimer le compteur de membres",
            emoji: "🗑️",
            value: "deletememberscount"
          },
          {
            label: "Modifier le compteur de rôles",
            emoji: "📚",
            value: "editrolescount"
          },
          {
            label: "Supprimer le compteur de rôles",
            emoji: "🗑️",
            value: "deleterolescount"
          },
          {
            label: "Modifier le compteur de robots",
            emoji: "🤖",
            value: "editrobotscount"
          },
          {
            label: "Supprimer le compteur de robots",
            emoji: "🗑️",
            value: "deleterobotscount"
          },
          {
            label: "Modifier le compteur de boosts",
            emoji: "🔮",
            value: "editboostscount"
          },
          {
            label: "Supprimer le compteur de boosts",
            emoji: "🗑️",
            value: "deleteboostscount"
          },
        ])

      const row = new MessageActionRow()
      row.addComponents(menu)

      const embedbase = await message.channel.send({
        embeds: [embed],
        components: [row]
      })

      filter2 = (m) => m.author.id === message.author.id

         let collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU",
            });

      collector.on('collect', async i => {
        if (i.user.id !== message.author.id) return i.reply({
          content: "Vous ne pouvez pas utiliser ce menu",
          ephemeral: true
        })
       
        i.deferUpdate()
        const value = i.values[0]

        const updateembed = (msg) => {
          const membercount = message.guild.channels.cache.get(db.get(`${message.guild.id}_membercount`))
          const rolescount = message.guild.channels.cache.get(db.get(`${message.guild.id}_rolescount`))
          const botscount = message.guild.channels.cache.get(db.get(`${message.guild.id}_botscount`))
          const boostscount = message.guild.channels.cache.get(db.get(`${message.guild.id}_boostscount`))

          const embed = new Discord.MessageEmbed()
            .setTitle("Compteurs du serveur")
            .addFields({
              name: "👥・Compteur de membres",
              value: `${membercount || "Aucun"}`
            }, {
              name: "📚・Compteur de rôles",
              value: `${rolescount || "Aucun"}`
            }, {
              name: "🤖・Compteur de robots",
              value: `${botscount || "Aucun"}`
            }, {
              name: "🔮・Compteur de boosts",
              value: `${boostscount || "Aucun"}`
            }, )
            .setTimestamp()
            .setFooter({
              text: client.config.footer
            })
            .setColor(color)
          msg.edit({
            embeds: [embed]
          })
        }

        if (value === "editmemberscount") {
          const question = await message.channel.send(`Quel est le nouveau salon ?`)
          const collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question.delete().catch(() => false)

          if (!collected || collected.size === 0) return message.channel.send("Aucun salon fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse = collected.first()
          reponse.delete().catch(() => false)

          const channel = reponse.mentions.channels.first() || message.guild.channels.cache.get(reponse.content)
          if (!channel) return message.channel.send(`Aucun salon de trouvé pour \`${reponse.content}\``).then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const question2 = await message.channel.send(`Quel est le nom du counter ? (**<count>** sera replacer par le nombre)`)
          const collected2 = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question2.delete().catch(() => false)
          if (!collected2 || collected2.size === 0) return message.channel.send("Aucun nom de counters fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse2 = collected2.first()
          reponse2.delete().catch(() => false)

          db.set(`${message.guild.id}_membercount`, channel.id)
          db.set(`${message.guild.id}_membercounttext`, reponse2.content)

          message.channel.send(`Le salon <#${channel.id}> sera le nouveau counter des membres`).then(m => setTimeout(() => m.delete().catch(() => false), 5000))
          updateembed(embedbase)
        }
        else if (value === "editrolescount") {
          const question = await message.channel.send(`Quel est le nouveau salon ?`)
          const collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question.delete().catch(() => false)

          if (!collected || collected.size === 0) return message.channel.send("Aucun salon fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse = collected.first()
          reponse.delete().catch(() => false)

          const channel = reponse.mentions.channels.first() || message.guild.channels.cache.get(reponse.content)
          if (!channel) return message.channel.send(`Aucun salon de trouvé pour \`${reponse.content}\``).then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const question2 = await message.channel.send(`Quel est le nom du counter ? (**<count>** sera replacer par le nombre)`)
          const collected2 = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question2.delete().catch(() => false)
          if (!collected2 || collected2.size === 0) return message.channel.send("Aucun nom de counters fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse2 = collected2.first()
          reponse2.delete().catch(() => false)

          db.set(`${message.guild.id}_rolescount`, channel.id)
          db.set(`${message.guild.id}_rolescounttext`, reponse2.content)

          message.channel.send(`Le salon <#${channel.id}> sera le nouveau counter des rôles`).then(m => setTimeout(() => m.delete().catch(() => false), 5000))
          updateembed(embedbase)
        }
        else if (value === "editrobotscount") {
          const question = await message.channel.send(`Quel est le nouveau salon ?`)
          const collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question.delete().catch(() => false)

          if (!collected || collected.size === 0) return message.channel.send("Aucun salon fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse = collected.first()
          reponse.delete().catch(() => false)

          const channel = reponse.mentions.channels.first() || message.guild.channels.cache.get(reponse.content)
          if (!channel) return message.channel.send(`Aucun salon de trouvé pour \`${reponse.content}\``).then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const question2 = await message.channel.send(`Quel est le nom du counter ? (**<count>** sera replacer par le nombre)`)
          const collected2 = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question2.delete().catch(() => false)
          if (!collected2 || collected2.size === 0) return message.channel.send("Aucun nom de counters fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse2 = collected2.first()
          reponse2.delete().catch(() => false)

          db.set(`${message.guild.id}_botscount`, channel.id)
          db.set(`${message.guild.id}_botscounttext`, reponse2.content)

          message.channel.send(`Le salon <#${channel.id}> sera le nouveau counter des bots`).then(m => setTimeout(() => m.delete().catch(() => false), 5000))
          updateembed(embedbase)
        }

        else if (value === "editboostscount") {
          const question = await message.channel.send(`Quel est le nouveau salon ?`)
          const collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question.delete().catch(() => false)

          if (!collected || collected.size === 0) return message.channel.send("Aucun salon fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse = collected.first()
          reponse.delete().catch(() => false)

          const channel = reponse.mentions.channels.first() || message.guild.channels.cache.get(reponse.content)
          if (!channel) return message.channel.send(`Aucun salon de trouvé pour \`${reponse.content}\``).then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const question2 = await message.channel.send(`Quel est le nom du counter ? (**<count>** sera replacer par le nombre)`)
          const collected2 = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
          })

          question2.delete().catch(() => false)
          if (!collected2 || collected2.size === 0) return message.channel.send("Aucun nom de counters fourni").then(m => setTimeout(() => m.delete().catch(() => false), 5000))

          const reponse2 = collected2.first()
          reponse2.delete().catch(() => false)

          db.set(`${message.guild.id}_boostscount`, channel.id)
          db.set(`${message.guild.id}_boostscounttext`, reponse2.content)

          message.channel.send(`Le salon <#${channel.id}> sera le nouveau counter des boosts`).then(m => setTimeout(() => m.delete().catch(() => false), 5000))
          updateembed(embedbase)
        }
        else if (value === "deletememberscount"){
          db.delete(`${message.guild.id}_membercount`)
          db.delete(`${message.guild.id}_membercounttext`)
          updateembed(embedbase)
        }
        else if (value === "deleterolescount"){
          db.delete(`${message.guild.id}_rolescount`)
          db.delete(`${message.guild.id}_rolescounttext`)
          updateembed(embedbase)
        }
        else if (value === "deleterobotscount"){
          db.delete(`${message.guild.id}_botscount`)
          db.delete(`${message.guild.id}_botscounttext`)
          updateembed(embedbase)
        }
        else if (value === "deleteboostscount"){
          db.delete(`${message.guild.id}_boostscount`)
          db.delete(`${message.guild.id}_boostscounttext`)
          updateembed(embedbase)
        }
      })
    }
  }
}