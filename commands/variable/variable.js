const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const config = require('../../config.json');
const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color");

module.exports = {
  name: 'variable',
  description: 'Permet d\'afficher les variables.',
  run: async (client, message, args) => {
    let color = cl.fetch(`color_${message.guild.id}`);
    if (color == null) color = client.config.color;
   
    const premiumTier = {
        NONE: 0,
        TIER_1: 1,
        TIER_2: 2,
        TIER_3: 3,
    };

    const selectMenu = new MessageSelectMenu()
      .setCustomId('variable-select')
      .setPlaceholder('LuminaBots - Variable')
      .addOptions([
        {
          label: 'Accueil',
          emoji: '📚',
          value: 'variable-accueil',
        },
        {
          label: 'Variable - Messages',
          emoji: "💭",
          value: 'variable-message',
        },
      ]);
      
    const actionRow = new MessageActionRow().addComponents(selectMenu);
    
    const accueil = new MessageEmbed()
      .setTitle(`${client.user.tag} - Variable`)
      .setDescription('Pour voir les commandes correspondantes, merci de cliquer sur le select menu.')
      .setColor(color)
      .setFooter(client.config.footer);
      
    const variableMessages = new MessageEmbed()
      .setTitle('Variable - Messages')
      .addFields(
        { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Tsubasa & Sown`'},
        { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`},
        { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple:  Tsubasa#1223 & Sown#0001`'},
    )
      .addFields(
        { name: '{MemberID}', value: `L'ID du membre concerné\n\`Exemple: ${message.author.id}\``},
        { name: '{MemberCount}', value: `Le nombre total de membres sur le serveurn\n\`Exemple: ${message.guild.memberCount}\``},
        { name: '{Server}', value: `Le nom du serveur\n\`Exemple: ${message.guild.name}\``},
    )
      .addFields(
      { name: '{ServerBoostsCount}', value: `Le nombre de boost du serveur\n\`Exemple: ${message.guild.premiumSubscriptionCount || '0'}\``},
      { name: '{ServerLevel}', value: `Le niveau actuel du serveur\n\`Exemple: ${premiumTier[message.guild.premiumTier]}\``},
      { name: '{VocalMembersCount}', value: `Le nombre total de membres en vocal sur le serveur\n\`Exemple: ${message.guild.members.cache.filter(m => m.voice.channel).size}\``},
      )
      .setColor(color)
      .setFooter(`${client.config.footer} - Message variable`);

     
      
    const variableVocal = new MessageEmbed()
      .setTitle('Variable - Vocal')
      .setColor(color)
      .setDescription(`Aucune varible pour le moment !`)
      .setFooter(`${client.config.footer} - Vocal variable`);


    const variableAccueil = new MessageEmbed()
      .setTitle('LuminaBots - Variable')
      .setDescription('Merci de cliquer sur le select menu pour afficher les catégorie de variable')
      .setColor(color)
      .setFooter(`${client.config.footer} variable-accueil`);

    const initialMessage = await message.reply({
      content: null,
      allowedMentions: { repliedUser: false },
      components: [actionRow],
      embeds: [accueil],
    });
   
    client.on('interactionCreate', async interaction => {
      if (!interaction.isSelectMenu()) return; 
    
      if (interaction.customId === 'variable-select') {
        const selectedValue = interaction.values[0]; 
        
        if (selectedValue === 'variable-message') {
          await interaction.update({
            content: null,
            embeds: [variableMessages],
            components: [actionRow],
          });
        } else if (selectedValue === 'variable-vocal') {
            await interaction.update({
              content: null,
              embeds: [variableVocal],
              components: [actionRow],
            })
        } else if (selectedValue === 'variable-accueil') {
          await interaction.update({
            content: null,
            embeds: [variableAccueil],
            components: [actionRow],
          });
        }
      }
    });
  },
};
