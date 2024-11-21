const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: "antiban",
  description: "Empêche les utilisateurs avec la permission de bannir ou Administrateur de bannir des membres.",
  run: async (client, message, args) => {
    const antiban = db.get(`antiban_${message.guild.id}`);
    if (args[0] === "on") {
      db.set(`antiban_${message.guild.id}`, true);
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Le module antiban a été activé avec succès.\nActivé par : ${message.author}`)
      message.channel.send({embeds: [embed]});
    } else if (args[0] === "off") {
      db.set(`antiban_${message.guild.id}`, false);
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Le module antiban a été désactivé avec succès.\nDésactivé par : ${message.author}`)
      message.channel.send({embeds: [embed]});
    } else {
      return message.channel.send({ content: `Veuillez spécifier \`on\` ou \`off\` pour activer ou désactiver le module antiban.`, ephemeral: true });
    }
  }
}
