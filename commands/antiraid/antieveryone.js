const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const ae = new db.table("Antieveryone");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
module.exports = {
  name: "antieveryone",
  description: "Permet de bloquer tous les everyone dans le serveur",
  run: async (client, message, args) => {
    if (
      client.config.owner.includes(message.author.id) ||
      owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ||
      db.get(`buyermd.${message.author.id}`) ||
      client.config.buyer.includes(message.author.id)
    ) {

        const guildId = message.guild.id;
        const everyoneBlockerEnabled = al.get(`everyoneBlockerEnabled_${guildId}`) || false;
        const enableButton = new MessageButton()
        .setCustomId('everyoneBlockerEnable')
        .setLabel('Activer')
        .setStyle('SUCCESS');

      const disableButton = new MessageButton()
        .setCustomId('everyoneBlockerDisable')
        .setLabel('Désactiver')
        .setStyle('DANGER');

const configButton = new MessageButton()
.setCustomId('everyoneBlockerCongif')
        .setLabel('Configuration')
        .setStyle('SECONDARY');

      const row = { type: 'ACTION_ROW', components: [enableButton, disableButton, configButton] };

      const everyoneBlockerEmbed = {
        title: 'Bloqueur de lien',
        description: 'Active ou désactive le bloqueur de everyone sur le serveur.',
        fields: [{
          name: 'Statut',
          value: everyoneBlockerEnabled ? 'Activé' : 'Désactivé'
        }],
        color: everyoneBlockerEnabled ? '#00FF00' : '#FF0000'
      };

      const everyoneBlockerMessage = await message.channel.send({
        embeds: [everyoneBlockerEmbed],
        components: [row]
      });

      const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

      const collector = everyoneBlockerMessage.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async (interaction) => {
        const buttonId = interaction.customId;

        if (buttonId === 'everyoneBlockerEnable') {
          al.set(`everyoneBlockerEnabled_${guildId}`, true);
        } else if (buttonId === 'everyoneBlockerDisable') {
          al.set(`everyoneBlockerEnabled_${guildId}`, false);
        }

        const neweveryoneBlockerEnabled = al.get(`everyoneBlockerEnabled_${guildId}`);

        everyoneBlockerEmbed.fields[0].value = neweveryoneBlockerEnabled ? 'Activé' : 'Désactivé';
        everyoneBlockerEmbed.color = neweveryoneBlockerEnabled ? '#00FF00' : '#FF0000';

        await interaction.update({
          embeds: [everyoneBlockerEmbed],
          components: [row]
        });
      });


    } else {
      return message.channel.send(
        "Vous n'avez pas la permission d'utiliser cette commande."
      );
    }
  },
};