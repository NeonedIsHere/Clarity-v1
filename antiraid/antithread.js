const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "antithread",
  description: "empêche les utilisateurs de créer des fils de discussion",
  run: async (client, message, args) => {
    let antithread = await client.db.get(`antithread_${message.guild.id}`);

    if (!antithread) antithread = false;

    if (!message.member.permissions.has("MANAGE_THREADS")) {
      const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          "Vous n'avez pas la permission de gérer les fils de discussion (threads) sur ce serveur."
        );
      return message.channel.send({ embeds: [embed] });
    }

    if (args[0] === "on") {
      await client.db.set(`antithread_${message.guild.id}`, true);
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Le module Anti-Thread a été activé.");
      message.channel.send({ embeds: [embed] });
    } else if (args[0] === "off") {
      await client.db.set(`antithread_${message.guild.id}`, false);
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Le module Anti-Thread a été désactivé.");
      message.channel.send({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle("Module Anti-Thread")
        .setDescription(
          `Le module Anti-Thread est actuellement ${
            antithread ? "activé" : "désactivé"
          }.\n\nVous pouvez l'activer avec la commande \`${client.config.prefix}antithread on\` ou le désactiver avec la commande \`${client.config.prefix}antithread off\`.`
        );
      message.channel.send({ embeds: [embed] });
    }
  },
};
