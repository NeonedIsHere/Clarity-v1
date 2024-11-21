const Discord = require("discord.js")
const ms = require("ms");
const db = require('quick.db');
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}
      const cl = new db.table("Color")
  const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

  module.exports = {
    name: "tlist",
    description: "Affiche la liste des teams du serveur du système coins",
    run: async (client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let lt = db.get(`teamlist_${message.guild.id}`)
        if(lt === null) return message.channel.send(`Aucune team trouvé sur le serveur`)
        let lb = db.get(`teamliste_${message.guild.id}`)
        if(lb === null) lb = 0

        let description = lt
        .map((user, i) => `${i + 1}) **Nom**: ${user.nom}\n**Description**: ${user.desc}\n**Capitaine**: ${user.owner}\n**Date de création**: <t:${user.date}>`)
        .slice(0, 10)
        .join("\n")

        let embed = new MessageEmbed()
      .setColor(color)
      .setTitle(`Liste des teams du serveur ${message.guild.name}`)
      .setDescription(description)

          //  le  bot propose de changer de page avec un bouton next ou back
          const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('back')
            .setEmoji('⏪')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('next')
            .setEmoji('⏩')
            .setStyle('SECONDARY'),

           
          )


          
 
          
        let msg = await  message.channel.send({embeds: [embed], components: [row]})
        
        let p0 = 0;
let p1 = 15;
let page = 1;

const filter = (button) => button.user.id === message.author.id
const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 })

collector.on('collect', async (i) => {
    if (i.user.id !== message.author.id) return;
    i.deferUpdate()
    if (i.customId === 'next') {
        // si le bot a plus de 10 serveur on peut changer de page

         p0 = p0 + 10;
         p1 = p1 + 10;
         page = page + 1;

         if (p1 > lb + 10) {
           return msg.delete();
       }

       if (!p0 || !p1) {
        return msg.delete();
    }

       let description =  lt
      .map((user, i) => `${i + 1}) **Nom**: ${user.nom}\n**Description**: ${user.desc}\n**Capitaine**: ${user.owner}\n**Date de création**: <t:${user.date}>`).slice(p0,p1).join("\n")
    let embed = new MessageEmbed()
    embed.setColor(color)
    embed.setTitle(`Liste des teams du serveur ${message.guild.name}`)
    embed.setDescription(description)

    msg.edit({embeds: [embed], components: [row]})
}
if (i.customId === 'back') {
    p0 = p0 - 10;
    p1 = p1 - 10;
    page = page - 1;
    if (p0 < 0) {
        return msg.delete();
      }

      if (!p0 ||!p1) {
        return msg.delete();
      }

      let description =  lt
      .map((user, i) => `${i + 1}) **Nom**: ${user.nom}\n**Description**: ${user.desc}\n**Capitaine**: ${user.owner}\n**Date de création**: <t:${user.date}>`).slice(p0,p1).join("\n")
      let embed = new MessageEmbed()
      embed.setColor(color)
      embed.setTitle(`Liste des teams du serveur ${message.guild.name}`)
      embed.setDescription(description)
      msg.edit({embeds: [embed], components: [row]})
}
    })

    }
  }