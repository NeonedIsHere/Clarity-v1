const Discord = require('discord.js');
const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const db = require('quick.db')
const cl = new db.table("Color")
const ms = require("parse-ms");
module.exports = {
    name: 'with',
    aliases: [],
    run: async (client, message, args, prefix) => {

        
        


        
       
        
 
               let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
       
     
        let user = message.author;

        let member = db.fetch(`bank_${message.guild.id}_${user.id}`)
        let member2 = db.fetch(`money_${message.guild.id}_${user.id}`)

if (!args.length) {
  const embed2 = new MessageEmbed()
    .setTimestamp()
    .setColor(color)
    .setFooter(client.user.username)
    .setDescription(':coin: Précisez un montant à retirer');

  return message.reply({ embeds: [embed2] });
}

if (args[0] === 'all') {
  if (member === 0) {
    const embedbank = new MessageEmbed()
      .setTimestamp()
      .setColor(color)
      .setFooter(client.user.username)
      .setDescription(":coin: Vous n'avez pas d'argent en banque à retirer");

    return message.reply({ embeds: [embedbank] });
  } else {

    db.add(`money_${message.guild.id}_${user.id}`, member)
    db.subtract(`bank_${message.guild.id}_${user.id}`, member)

  const embed5 = new MessageEmbed()
    .setTimestamp()
    .setColor(color)
    .setFooter(client.user.username)
    .setDescription(`:coin: Vous avez retiré **tout vos coins** de votre banque`);

  return message.reply({ embeds: [embed5] });
}
}

if (isNaN(args[0]) || args[0] <= 0) {
  const embed3 = new MessageEmbed()
    .setTimestamp()
    .setColor(color)
    .setFooter(client.user.username)
    .setDescription(`:coin: Vous ne pouvez pas retirer d'argent négatif`);

  return message.reply({ embeds: [embed3] });
}



if (member < args[0]) {
  const embed4 = new MessageEmbed()
    .setTimestamp()
    .setColor(color)
    .setFooter(client.user.username)
    .setDescription(`:coin: Vous n'avez pas beaucoup de coins dans votre banque`);

  return message.reply({ embeds: [embed4] });
}

db.add(`money_${message.guild.id}_${user.id}`, args[0]);
db.subtract(`bank_${message.guild.id}_${user.id}`, args[0]);

const embed5 = new MessageEmbed()
  .setTimestamp()
  .setColor(color)
  .setFooter(client.user.username)
  .setDescription(`:coin: Vous avez retiré **${args[0]}** coins de votre banque`);

message.reply({ embeds: [embed5] });
          }

        }

    

