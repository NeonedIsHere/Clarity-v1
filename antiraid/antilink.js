const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const al = new db.table("Antilink");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
module.exports = {
  name: "antilink",
  description: "Permet de bloquer tous les liens dans le serveur",
  run: async (client, message, args) => {
    if (
      client.config.owner.includes(message.author.id) ||
      owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ||
      db.get(`buyermd.${message.author.id}`) ||
      client.config.buyer.includes(message.author.id)
    ) {

        const guildId = message.guild.id;
        const linkBlockerEnabled = al.get(`linkBlockerEnabled_${guildId}`) || false;
        const enableButton = new MessageButton()
        .setCustomId('linkBlockerEnable')
        .setLabel('Activer')
        .setStyle('SUCCESS');

      const disableButton = new MessageButton()
        .setCustomId('linkBlockerDisable')
        .setLabel('Désactiver')
        .setStyle('DANGER');

const configButton = new MessageButton()
.setCustomId('linkBlockerCongif')
        .setLabel('Configuration')
        .setStyle('SECONDARY');

      const row = { type: 'ACTION_ROW', components: [enableButton, disableButton, configButton] };

      const linkBlockerEmbed = {
        title: 'Bloqueur de lien',
        description: 'Active ou désactive le bloqueur de liens sur le serveur.',
        fields: [{
          name: 'Statut',
          value: linkBlockerEnabled ? 'Activé' : 'Désactivé'
        }],
        color: linkBlockerEnabled ? '#00FF00' : '#FF0000'
      };

      const linkBlockerMessage = await message.channel.send({
        embeds: [linkBlockerEmbed],
        components: [row]
      });

      const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

      const collector = linkBlockerMessage.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async (interaction) => {
        const buttonId = interaction.customId;

        if (buttonId === 'linkBlockerEnable') {
          al.set(`linkBlockerEnabled_${guildId}`, true);
        } else if (buttonId === 'linkBlockerDisable') {
          al.set(`linkBlockerEnabled_${guildId}`, false);
        }

        const newlinkBlockerEnabled = al.get(`linkBlockerEnabled_${guildId}`);

        linkBlockerEmbed.fields[0].value = newlinkBlockerEnabled ? 'Activé' : 'Désactivé';
        linkBlockerEmbed.color = newlinkBlockerEnabled ? '#00FF00' : '#FF0000';

        await interaction.update({
          embeds: [linkBlockerEmbed],
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