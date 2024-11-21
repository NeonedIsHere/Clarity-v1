const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "antiupdate",
  description: "Empêche la modification de messages sur le serveur",
  run: async (client, message, args) => {
    let antiUpdate = await client.db.get(`antiUpdate_${message.guild.id}`);

    if (!antiUpdate) antiUpdate = false;

    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Vous n'avez pas la permission de gérer les messages sur ce serveur."
        );
      return message.channel.send({ embeds: [embed] });
    }

    if (args[0] === "on") {
      await client.db.set(`antiUpdate_${message.guild.id}`, true);
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Le module Anti-Update a été activé.");
      message.channel.send({ embeds: [embed] });
    } else if (args[0] === "off") {
      await client.db.set(`antiUpdate_${message.guild.id}`, false);
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Le module Anti-Update a été désactivé.");
      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle("Module Anti-Update")
        .setDescription(
          `Le module Anti-Update est actuellement ${
            antiUpdate ? "activé" : "désactivé"
          }.\n\nVous pouvez l'activer avec la commande \`${client.config.prefix}antiupdate on\` ou le désactiver avec la commande \`${client.config.prefix}antiupdate off\`.`
        );
      message.channel.send({ embeds: [embed] });
    }
  },
};
