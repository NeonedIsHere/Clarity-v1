const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const aw = new db.table("Antiwebhook");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
module.exports = {
  name: "antiwebhook",
  description: "Permet de bloquer tous les webhook dans le serveur",
  run: async (client, message, args) => {
    if (
      client.config.owner.includes(message.author.id) ||
      owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ||
      db.get(`buyermd.${message.author.id}`) ||
      client.config.buyer.includes(message.author.id)
    ) {

        const guildId = message.guild.id;
        const webhookBlockerEnabled = al.get(`webhookBlockerEnabled_${guildId}`) || false;
        const enableButton = new MessageButton()
        .setCustomId('webhookBlockerEnable')
        .setLabel('Activer')
        .setStyle('SUCCESS');

      const disableButton = new MessageButton()
        .setCustomId('webhookBlockerDisable')
        .setLabel('Désactiver')
        .setStyle('DANGER');

const configButton = new MessageButton()
.setCustomId('webhookBlockerCongif')
        .setLabel('Configuration')
        .setStyle('SECONDARY');

      const row = { type: 'ACTION_ROW', components: [enableButton, disableButton, configButton] };

      const webhookBlockerEmbed = {
        title: 'Bloqueur de lien',
        description: 'Active ou désactive le bloqueur de webhook sur le serveur.',
        fields: [{
          name: 'Statut',
          value: webhookBlockerEnabled ? 'Activé' : 'Désactivé'
        }],
        color: webhookBlockerEnabled ? '#00FF00' : '#FF0000'
      };

      const webhookBlockerMessage = await message.channel.send({
        embeds: [webhookBlockerEmbed],
        components: [row]
      });

      const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

      const collector = webhookBlockerMessage.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async (interaction) => {
        const buttonId = interaction.customId;

        if (buttonId === 'webhookBlockerEnable') {
          al.set(`webhookBlockerEnabled_${guildId}`, true);
        } else if (buttonId === 'webhookBlockerDisable') {
          al.set(`webhookBlockerEnabled_${guildId}`, false);
        }

        const newwebhookBlockerEnabled = al.get(`webhookBlockerEnabled_${guildId}`);

        webhookBlockerEmbed.fields[0].value = newwebhookBlockerEnabled ? 'Activé' : 'Désactivé';
        webhookBlockerEmbed.color = newwebhookBlockerEnabled ? '#00FF00' : '#FF0000';

        await interaction.update({
          embeds: [webhookBlockerEmbed],
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