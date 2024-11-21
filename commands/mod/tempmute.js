const Discord = require("discord.js")
const db = require("quick.db")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ms = require("ms");

module.exports = {
    name: 'timeout',
    aliases: ['tempmute'],
    description: "Permet de rendre muet temporairement un membre",
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        const perm1 = p1.fetch(`perm1_${message.guild.id}`)
        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){
            const duration = args[1]
            if(!duration) return message.reply("Veuillez un indiquer une durée !")
            if(!parseInt(ms(duration))) return message.reply("Le temps indiqué est invalide !")
            if(ms(duration) > 2419200000) return message.reply("Le temps ne doit pas être supérieur à 28 jours !")

            if(!duration.endsWith("s") && !duration.endsWith("h") && !duration.endsWith("d") && !duration.endsWith("m")) return message.reply("La durée du mute n'est pas bonne !\n\n*Aide :*\n> Jours : `d`\n> Heures : `h`\n> Minutes : `m`\n> Secondes : `s`")
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            var reason = args.slice(2).join(" ");

          var tempmute = new Discord.MessageEmbed()
          .setColor(color)
          .setTitle(`Modération • Type: **\`tempmute\`**`)
          .setDescription(`Vous avez été tempmute du serveur : **${message.guild.name}**\n Raison: **${reason}**\n Fin du mute dans : **${duration}**`)
          .setFooter({
         text: `LuminaBots ${client.config.version}`  })



         var tempmutel = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
         .setTitle(`Modération • Type: **\`tempmute\`**`)
         .setDescription(`${target} a été tempmute\n Raison: **${reason}**\n Fin du mute dans : **${duration}**`)
         .setColor(color)
         .setFooter({
        text: `LuminaBots ${client.config.version}`  })

         await message.guild.members.cache.get(target.id).timeout(ms(duration), reason)
         target.send({embeds: [tempmute]})
         message.reply({embeds: [tempmutel]})

        }
    }
    }


