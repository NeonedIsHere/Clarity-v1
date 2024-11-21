const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color");

module.exports = {
  name: "laisse",
  description: "Commande pour interagir avec votre doggo",
  run: async (client, message, args, prefix) => {
    let color = cl.fetch(`color_${message.guild.id}`)
    if (color == null) color = client.config.color;

    const PERMISSION_ERROR_MESSAGE = "Vous n'avez pas les permissions nécessaires pour exécuter cette commande.";
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      return message.channel.send(PERMISSION_ERROR_MESSAGE);
    }

    // Récupérer l'utilisateur cible à partir des arguments
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);

    // Vérifier si l'utilisateur cible existe
    if (!user) {
      return message.reply("Veuillez mentionner un utilisateur valide ou fournir son ID.");
    }

    const addLaisseButton = new MessageButton()
      .setCustomId('add-laisse')
      .setLabel('Ajouter une laisse')
      .setStyle('SUCCESS');

    const removeLaisseButton = new MessageButton()
      .setCustomId('remove-laisse')
      .setLabel('Enlever une laisse')
      .setStyle('DANGER');

    const row = new MessageActionRow().addComponents(addLaisseButton, removeLaisseButton);

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({ filter, time: 10000 });

    message.reply({ embeds: [new MessageEmbed().setColor(color).setDescription('Veuillez sélectionner une action.')], components: [row] });

    collector.on('collect', async (interaction) => {
      if (interaction.isButton()) {
        const memberId = user.id;
        const member = interaction.guild.members.cache.get(memberId);

        if (!member) {
          return interaction.reply({ content: "Veuillez spécifier un membre valide.", ephemeral: true });
        }

        if (interaction.customId === 'add-laisse') {
          // Vérifie si l'utilisateur est déjà en laisse
          if (db.has(`laisse_${member.id}`)) {
            return interaction.reply({ content: "Cet utilisateur est déjà en laisse.", ephemeral: true });
          }

          // Met en laisse le membre
          db.set(`laisse_${member.id}`, interaction.user.id);

          const embed = new MessageEmbed()
            .setColor(color)
            .addFields(
              {
                name: "Laisse",
                value: `**${member.user.username}** a été mis en laisse avec succès`,
                inline: true
              },
              {
                name: "Laisse détenu par",
                value: `<@${interaction.user.id}>`,
                inline: true
              }
            )
            .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
            .setFooter(`LuminaBots ${client.config.version}`, client.user.displayAvatarURL())
            .setImage(member.user.displayAvatarURL())
            .setThumbnail(interaction.user.displayAvatarURL());

          return interaction.reply({ embeds: [embed], ephemeral: true });
        } else if (interaction.customId === 'remove-laisse') {
          // Vérifie si l'utilisateur est en laisse
          if (!db.has(`laisse_${member.id}`)) {
            return interaction.reply({ content: "L'utilisateur n'est pas en laisse !", ephemeral: true });
            }
            // Supprime la laisse dans la base de données
            db.delete(`laisse_${member.id}`);
                  // Envoie un message de confirmation
      const embed = new MessageEmbed()
      .setColor(color)
      .setTitle('Laisse retirée !')
      .setDescription(`${member} n'est plus en laisse.`);

    return interaction.reply({ embeds: [embed], ephemeral: true });
  } else {
    return interaction.reply({ content: 'Une erreur est survenue. Veuillez réessayer.', ephemeral: true });
  }
}
})}}
