const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: 'antichannel',
  description: 'Empêche les administrateurs ou les utilisateurs ayant la permission de gérer les salons de créer des salons',
  run: async (client, message, args) => {
    let antichannel = db.get(`antichannel_${message.guild.id}`);

    if (args[0] === 'on') {
      if (antichannel === true) {
        return message.channel.send({content: 'Le module antichannel est déjà activé.'});
      }
      db.set(`antichannel_${message.guild.id}`, true);
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Antichannel activé')
        .setDescription('Les administrateurs et les utilisateurs ayant la permission de gérer les salons ne pourront plus créer de salons.')
        .setFooter(`Module antichannel activé par ${message.author.tag}.`);
      message.channel.send({ embeds: [embed] });
    } else if (args[0] === 'off') {
      if (antichannel === false) {
        return message.channel.send({content: 'Le module antichannel est déjà désactivé.'});
      }
      db.set(`antichannel_${message.guild.id}`, false);
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Antichannel désactivé')
        .setDescription('Les administrateurs et les utilisateurs ayant la permission de gérer les salons pourront créer des salons.')
        .setFooter(`Module antichannel désactivé par ${message.author.tag}.`);
      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send({content: 'Veuillez préciser si vous voulez activer ou désactiver le module antichannel.'});
    }
  }
};
