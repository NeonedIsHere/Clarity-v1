const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");


const couleurs = new db.table("Couleurs");

module.exports = {
  name: "suggest",
  description:"Écrivez votre suggestion",
  run: async (client, message, args) => {

  
    const couleur = couleurs.fetch(`couleur_${message.guild.id}`);
    if (couleur === null) couleur = client.config.color;

    const salonSuggestion = await db.fetch(`suggestion_${message.guild.id}`);
    if (salonSuggestion === null) return;

    const suggestion = args.join(" ");
    if (!suggestion) return message.reply({ content: "S'il vous plaît suggérez quelque chose" });

    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${suggestion}`)
      .setColor(couleur)
      .setTimestamp();

    const confirmation = new MessageEmbed()
      .setDescription(`Votre suggestion a été transférée ici <#${salonSuggestion}>.\n\nInfo : Vous recevrez un MP pour la réponse à votre suggestion.`);

  
    const msgConfirmation = await message.channel.send({ embeds: [confirmation] });
    const msgSuggestion = await message.guild.channels.cache.get(salonSuggestion).send({ embeds: [embed] });

    await msgSuggestion.react('✅');
    await msgSuggestion.react('❌');
  }
};
