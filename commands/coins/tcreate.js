const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
      const cl = new db.table("Color")
  const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');

  module.exports = {
    name: "tcreate",
    description: "Permet de créer une team sur le serveur qui sera enregistrer dans le système coins",
    run: async (client, message, args) => {

  
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let dd = db.get(`teams_${message.author.id}`)
        if(dd) return message.reply(`:x: Vous avez déjà une team, supprimé la et refaite la commande !`)
        let money = db.get(`money_${message.guild.id}_${message.author.id}`)
        if(money <= 2000 ){  message.reply(`:x: Vous n'avez pas assez pour crée une team !`)

      }  else {

        function updateembed(msg){
            let team = db.get(`teams_${message.guild.id}_${message.author.id}`)
                    let teamdes = db.get(`teamsdes_${message.guild.id}_${message.author.id}`)
                    let teamscap = db.get(`teamscap_${message.guild.id}_${message.author.id}`)
                    const embed = new MessageEmbed()
                    embed.setTitle(`Votre team`)
embed.setTimestamp()
embed.setColor(color)
embed.setFooter(client.user.username )

embed.setDescription(`Nom: ${team}\nDescription: ${teamdes}\nCapitaine: ${teamscap}\nDate de création: <t:${Date.parse(new Date)/1000}>`)
msg.edit({embeds: [embed]})
        }

        let options = new MessageSelectMenu()
        options.setCustomId("team")
        options.setPlaceholder("Sélectionner une options")
        options.addOptions([
            {
                label: "Nom de la team",
                description: "Nom de votre team",
                value: "name"
            }, {
                label: "Description",
                description: "Description de votre team",
                value: "description"
            }, {
                label: "Capitaine",
                description: "Capitaine de votre team",
                value: "capitaine"
            }, {
                label: "Confirmer",
                description: "Confirmer votre team",
                value: "confirm"
            }
        ])

        let team = db.get(`teams_${message.guild.id}_${message.author.id}`)
        let teamdes = db.get(`teamsdes_${message.guild.id}_${message.author.id}`)
        let teamscap = db.get(`teamscap_${message.guild.id}_${message.author.id}`)
        const embed1 = new MessageEmbed()
        embed1.setTitle(`Votre team`)
    embed1.setTimestamp()
    embed1.setColor(color)
    embed1.setFooter(client.user.username )
    
    embed1.setDescription(`Nom: ${team}\nDescription: ${teamdes}\nCapitaine: ${teamscap}\nDate de création: <t:${Date.parse(new Date)/1000}>`)
    let rmsg = await message.channel.send({embeds: [embed1]})

        let row = new MessageActionRow()
        row.addComponents(options)

        let embed = new MessageEmbed()
        embed.setColor(color)
        embed.setTitle("Création d'une team")
        embed.setDescription("Veuillez configurer les paramètres de votre team!")
    message.reply({embeds: [embed], components: [row]})
   


  const filter = m => message.author.id === m.author.id;
  let collector = message.channel.createMessageComponentCollector({
    componentType: "SELECT_MENU",
});

collector.on("collect", async (i) => {
    if (i.user.id !== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser ce menu", ephemeral: true})
    i.deferUpdate()
    if (i.customId === "team") {
        if(i.values[0] === "name") {
            const question = await message.channel.send({content: "Veuillez saisir le nom de votre team!"})
            const filter = m => message.author.id === m.author.id;
            i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                if(cld.first().content === "cancel") {
                    question.edit({content: "Opérations annulée"})
                    i.delete()
                    return
                }
                db.set(`teams_${message.guild.id}_${message.author.id}`, cld.first().content)
                const embed = new MessageEmbed() 
                .setDescription(`:white_check_mark: Votre team a bien été créé avec succès son nom est : ${cld.first().content}`)
                message.channel.send({embeds: [embed]})
                updateembed(rmsg)

            })
        }
        if(i.values[0] === "description") {
            const question = await message.channel.send({content: "Veuillez saisir la description de votre team!"})
            const filter = m => message.author.id === m.author.id;
            i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                if(cld.first().content === "cancel") {
                    question.edit({content: "Opérations annulée"})
                    i.delete()
                    return
                }
                db.set(`teamsdes_${message.guild.id}_${message.author.id}`, cld.first().content)
                const embed = new MessageEmbed()
                embed.setDescription(`:white_check_mark: Votre team a bien été créé avec succès sa description est : ${cld.first().content}`)
                message.channel.send({embeds: [embed]})
                updateembed(rmsg)
            })
        }
        if(i.values[0] === "capitaine") {
            const question = await message.channel.send({content: "Veuillez saisir le capitaine de votre team!"})
            const filter = m => message.author.id === m.author.id;
            i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                if(cld.first().content === "cancel") {
                    question.edit({content: "Opérations annulée"})
                    i.delete()
                    return
                }
                db.set(`teamscap_${message.guild.id}_${message.author.id}`, cld.first().content)
                const embed = new MessageEmbed()
                embed.setDescription(`:white_check_mark: Votre team a bien été créé avec succès son/sa capitaine est : ${cld.first().content}`)
                message.channel.send({embeds: [embed]})
         
                updateembed(rmsg)
            })
        }
        if(i.values[0] === "confirm") {
            const question = await message.channel.send({content: "Voulez vous crée votre team?"})
            const filter = m => message.author.id === m.author.id;
            i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                if(cld.first().content === "cancel") {
                    question.edit({content: "Opérations annulée"})
                    i.delete()
                    return
                }
                if (cld.first().content === "oui" || cld.first().content === "Oui" || cld.first().content === "O" || cld.first().content === "o" || cld.first().content === "yes" || cld.first().content === "Yes" || cld.first().content === "Y" || cld.first().content === "y") {
                    let team = db.get(`teams_${message.guild.id}_${message.author.id}`)
                    let teamdes = db.get(`teamsdes_${message.guild.id}_${message.author.id}`)
                    let teamscap = db.get(`teamscap_${message.guild.id}_${message.author.id}`)
                    const embed = new MessageEmbed()
                    embed.setTitle(`Team crée`)
embed.setTimestamp()
embed.setColor(color)
embed.setFooter(client.user.username )

embed.setDescription(`Nom: ${team}\nDescription: ${teamdes}\nCapitaine: ${teamscap}\nDate de création: <t:${Date.parse(new Date)/1000}>`)
message.channel.send({embeds: [embed]})
db.set(`teams_${message.guild.id}_${message.author.id}`, team)
let dde = db.get(`teams_${message.guild.id}_${message.author.id}`)
db.push(`teamlist_${message.guild.id}`, {date: Date.parse(new Date)/1000, nom: team, owner: teamscap, desc: teamdes})
db.add(`teamliste_${message.guild.id}`, 1)
db.set(`teamdate_${message.guild.id}_${dde}`, Date.parse(new Date)/1000)
db.add(`teamsnumber_${message.guild.id}_${message.author.id}`, 1)
db.subtract(`money_${message.guild.id}_${message.author.id}`, 2000)
rmsg.delete()
                }
                })
    }
}
})
   
      }
    }
}
    