const Discord = require ("discord.js");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const atb = new db.table("Antibot")
module.exports = {
    name: 'antibot',
    description: 'Bloque l\'arrivée de bots sur le serveur',
    run: async (client, message, args) => {
      const guildId = message.guild.id;
      const botBlockerEnabled = atb.get(`botBlockerEnabled_${guildId}`) || false;

      const enableButton = new MessageButton()
        .setCustomId('botBlockerEnable')
        .setLabel('Activer')
        .setStyle('SUCCESS');

      const disableButton = new MessageButton()
        .setCustomId('botBlockerDisable')
        .setLabel('Désactiver')
        .setStyle('DANGER');

      const row = { type: 'ACTION_ROW', components: [enableButton, disableButton] };

      const botBlockerEmbed = {
        title: 'Bloqueur de bots',
        description: 'Active ou désactive le bloqueur de bots sur le serveur.',
        fields: [{
          name: 'Statut',
          value: botBlockerEnabled ? 'Activé' : 'Désactivé'
        }],
        color: botBlockerEnabled ? '#00FF00' : '#FF0000'
      };

      const botBlockerMessage = await message.channel.send({
        embeds: [botBlockerEmbed],
        components: [row]
      });

      const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

      const collector = botBlockerMessage.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async (interaction) => {
        const buttonId = interaction.customId;

        if (buttonId === 'botBlockerEnable') {
          atb.set(`botBlockerEnabled_${guildId}`, true);
        } else if (buttonId === 'botBlockerDisable') {
          atb.set(`botBlockerEnabled_${guildId}`, false);
        }

        const newBotBlockerEnabled = atb.get(`botBlockerEnabled_${guildId}`);

        botBlockerEmbed.fields[0].value = newBotBlockerEnabled ? 'Activé' : 'Désactivé';
        botBlockerEmbed.color = newBotBlockerEnabled ? '#00FF00' : '#FF0000';

        await interaction.update({
          embeds: [botBlockerEmbed],
          components: [row]
        });
      });


    }
    }
