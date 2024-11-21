const fs = require('fs');
const path = require('path');
const Discord= require('discord.js')
const db = require('quick.db')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const cl = new db.table("Color")
module.exports = {
  name: 'help',
  aliases: ["h"],
  description: 'Affiche la liste des commandes disponibles.',

  run: async (client, message, args, prefix) => {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const categories = fs.readdirSync('./commands');

    let color = cl.fetch(`color_${message.guild.id}`)
    if (color == null) color = client.config.color
    // recupere l image de la db helpimg
    let helpimg = db.get(`helpimg_${message.guild.id}`)
    if (helpimg == null) helpimg = client.user.displayAvatarURL({ dynamic: true, format: 'png' })
    const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(`Séléctionne un module pour obtenir une page d'aide détaillée`)
    .addField("Serv Support:", "[\`Clique ici\`](https://discord.gg/LuminaBots-fr)")
    .addField("Vote pour moi:", "[\`Vote ici\`](https://discord.gg/LuminaBots-fr)")
    .setImage(helpimg)
    .setFooter({text: `LuminaBots \n Commandes total: ${client.commands.size}`, iconURL: client.user.displayAvatarURL()})

  const selectMenuOptions = [];
 
  for (const category of categories) {
    let catEmoji = {
      "antiraid": "📛",
       "backup": "💫",
       "bot": "🤖",
       "buyer": "📙",
       "coins": "💰",
       "doggy": "🐕",
       "fivem": "🚔",
       "fun": "🎈",
       "gestion": "💎",
       "Giveaway": "🎉",
       "info": "ℹ",
       "invite": "📩",
       "logs": "📧",
       "mod": "🔧",
       "mod+": "🛠",
       "music": "🎵",
       "nsfw": "🔞",
       "owner": "⚜",
       "partner": "💮",
       "radio": "🎙",
       "suggestion": "📲",
       "ticket": "🎫",
       "variable": "🧬"
     };
    const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    const emoji = catEmoji[category] || '';
    let commandList = [];

    for (const file of commandFiles) {
      const command = require(`../${category}/${file}`);
      commandList.push(`\`${prefix}${command.name}\`\n${command.description === null ? 'Aucune description.' : command.description}\n`);
    }

    
    if (commandList.length) {
      selectMenuOptions.push({
        label: categoryName,
        value: category,
        emoji: emoji,
        description: `Affiche les commandes de la catégorie ${categoryName}`
      });
    }
  }

  const selectMenu = new MessageSelectMenu()
    .setCustomId('commandes-menu')
    .setPlaceholder('LuminaBots')
    .addOptions(selectMenuOptions);

  const actionRow = new MessageActionRow()
    .addComponents(selectMenu);



    if (args.length) {
      const commandName = args[0].toLowerCase();
      const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) {
        return message.reply('Commande invalide.');
      }


      const commandEmbed = new MessageEmbed()
        .setTitle(`Aide pour la commande ${command.name}`)
        .addField('Description', command.description === null? 'Aucune description.' : command.description)
        .setColor('#F8AA2A');

      if (command.aliases) {
        commandEmbed.addField('Alias', command.aliases.join(', '));
      }

     await message.channel.send({ embeds: [commandEmbed] });
    } else {
        await message.reply({ embeds: [embed], components: [actionRow] }).then(() => {
            const filter = i => i.user.id === message.author.id;
            const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });

            collector.on('collect', async i => {
              if (i.customId === 'commandes-menu') {
                const category = i.values[0];
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

                const categoryEmbed = new MessageEmbed()
                  .setColor(color)
                  .setTitle(`🎩 Voici les commandes de la catégorie ${categoryName} :`)
                  .setFooter({text: `LuminaBots\nCommandes total: ${client.commands.size}
    `})

                const commandFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'));

                let commandList = [];

                for (const file of commandFiles) {
                  const command = require(`../${category}/${file}`);
                  commandList.push(`\`${prefix}${command.name}\`\n${command.description === null? 'Aucune description.' : command.description}`);
                }

                if (commandList.length) {
                  categoryEmbed.setDescription(commandList.join('\n'));
                } else {
                  categoryEmbed.setDescription('Aucune commande trouvée dans cette catégorie.');
                }

                i.update({ embeds: [categoryEmbed], components: [actionRow] });
              }
            });


          });
    }
  }
};

