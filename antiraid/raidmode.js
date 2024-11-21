const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const rm = new db.table("Raidmode");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
module.exports = {
  name: "raidmode",
  description: "Permet d'activer/désactiver le raidmode",
  run: async (client, message, args) => {
    if (
      client.config.owner.includes(message.author.id) ||
      owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ||
      db.get(`buyermd.${message.author.id}`) ||
      client.config.buyer.includes(message.author.id)
    ) {

        const guildId = message.guild.id;
        const raidmodeBlockerEnabled = rm.get(`raidmodeBlockerEnabled_${guildId}`) || false;
        const enableButton = new MessageButton()
        .setCustomId('raidmodeBlockerEnable')
        .setLabel('Activer')
        .setStyle('SUCCESS');

      const disableButton = new MessageButton()
        .setCustomId('raidmodeBlockerDisable')
        .setLabel('Désactiver')
        .setStyle('DANGER');

const configButton = new MessageButton()
.setCustomId('raidmodeBlockerCongif')
        .setLabel('Configuration')
        .setStyle('SECONDARY');

      const row = { type: 'ACTION_ROW', components: [enableButton, disableButton, configButton] };

      const raidmodeBlockerEmbed = {
        title: 'Bloqueur de lien',
        description: 'Active ou désactive le raidmode sur le serveur.',
        fields: [{
          name: 'Statut',
          value: raidmodeBlockerEnabled ? 'Activé' : 'Désactivé'
        }],
        color: raidmodeBlockerEnabled ? '#00FF00' : '#FF0000'
      };

      const raidmodeBlockerMessage = await message.channel.send({
        embeds: [raidmodeBlockerEmbed],
        components: [row]
      });

      const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

      const collector = raidmodeBlockerMessage.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async (interaction) => {
        const buttonId = interaction.customId;

        if (buttonId === 'raidmodeBlockerEnable') {
          rm.set(`raidmodeBlockerEnabled_${guildId}`, true);
        } else if (buttonId === 'raidmodeBlockerDisable') {
          rm.set(`raidmodeBlockerEnabled_${guildId}`, false);
        }

        const newraidmodeBlockerEnabled = al.get(`raidmodeBlockerEnabled_${guildId}`);

        raidmodeBlockerEmbed.fields[0].value = newraidmodeBlockerEnabled ? 'Activé' : 'Désactivé';
        raidmodeBlockerEmbed.color = newraidmodeBlockerEnabled ? '#00FF00' : '#FF0000';

        await interaction.update({
          embeds: [raidmodeBlockerEmbed],
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