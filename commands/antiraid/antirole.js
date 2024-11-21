const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: "antirole",
  description : "empêche les membres de se donner des rôles auxquels ils n'ont pas accès",
  run: async(client, message, args) => {
    let antir = new db.table("Antir")
    let color = new db.table("Color")

    // Vérification de l'autorisation de l'utilisateur
    if (!message.member.permissions.has('MANAGE_ROLES') || message.member.roles.highest.comparePositionTo(message.guild.roles.cache.find(r => r.name === "Anti-Role")) > 0) {
      return message.channel.send({content: "Vous n'avez pas la permission d'utiliser cette commande."});
    }

    // Vérification de l'état actuel de l'Anti-Role
    let antirStatus = antir.get(`${message.guild.id}.status`);
    if (!antirStatus) {
      antir.set(`${message.guild.id}.status`, false);
      antirStatus = false;
    }

    // Si aucun argument n'est donné, afficher l'état actuel de l'Anti-Role
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor(color.get(`color_${message.guild.id}`) || "#00ff00")
        .setTitle("Anti-Role")
        .setDescription(`L'Anti-Role est actuellement ${antirStatus ? "activé" : "désactivé"}.`)

      return message.channel.send({embeds: [embed]});
    }

    // Si l'utilisateur fournit un argument, activer ou désactiver l'Anti-Role en fonction de celui-ci
    if (args[0] === "on") {
      antir.set(`${message.guild.id}.status`, true);
      const embed = new MessageEmbed()
        .setColor(color.get(`color_${message.guild.id}`) || "#00ff00")
        .setTitle("Anti-Role")
        .setDescription("L'Anti-Role a été activé avec succès.")

      return message.channel.send({embeds: [embed]});
    }
    else if (args[0] === "off") {
      antir.set(`${message.guild.id}.status`, false);
      const embed = new MessageEmbed()
        .setColor(color.get(`color_${message.guild.id}`) || "#00ff00")
        .setTitle("Anti-Role")
        .setDescription("L'Anti-Role a été désactivé avec succès.")

      return message.channel.send({embeds: [embed]});
    }
    else {
      const embed = new MessageEmbed()
        .setColor(color.get(`color_${message.guild.id}`) || "#00ff00")
        .setTitle("Anti-Role")
        .setDescription(`Merci d'utiliser \`!antirole on\` pour activer l'Anti-Role ou \`!antirole off\` pour le désactiver.`)

      return message.channel.send({embeds: [embed]});
    }
  }
};
