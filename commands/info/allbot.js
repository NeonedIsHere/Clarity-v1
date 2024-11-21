const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  name: 'allbot',
  aliases: [],
  description: 'Afficher une liste paginée des bots sur le serveur',
  async run(client, message, args) {
    const cl = new db.table("Color");
    const color = cl.get(`color_${message.guild.id}`) || client.config.color;
    const botMembers = message.guild.members.cache.filter(m => m.user.bot);
    const botIds = botMembers.map(m => m.user.id);

    if (botIds.length === 0) {
      const noEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Bot Liste")
        .setDescription("Aucun Bot")
        .setTimestamp()
        .setFooter(`LuminaBots ${client.config.version}`);
      return message.channel.send({ embeds: [noEmbed] });
    }

    const botNames = botMembers.map(m => `${m.user.username}#${m.user.discriminator}`);
    const pageCount = Math.ceil(botIds.length / 10);
    let page = 1;

    const embed = new Discord.MessageEmbed()
      .setTitle(`Nombre de bot : ${botIds.length}`)
      .setColor(color)
      .setDescription(`${getBotList(botNames, botIds, page)}`)
      .setTimestamp()
      .setFooter(`LuminaBots ${client.config.version} | Page ${page} / ${pageCount}`);

    const sentEmbed = await message.channel.send({ embeds: [embed] });
    if (pageCount > 1) {
      await sentEmbed.react('⬅');
      await sentEmbed.react('➡');

      const filter = (reaction, user) => ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;
      const collector = sentEmbed.createReactionCollector({ filter, time: 60000 });

      collector.on('collect', async (reaction, user) => {
        await reaction.users.remove(user.id);
        if (reaction.emoji.name === '⬅' && page > 1) {
          page--;
        } else if (reaction.emoji.name === '➡' && page < pageCount) {
          page++;
        } else {
          return collector.stop();
        }
        embed.setDescription(`${getBotList(botNames, botIds, page)}`);
        embed.setFooter(`LuminaBots ${client.config.version} | Page ${page} / ${pageCount}`);
        await sentEmbed.edit({ embeds: [embed] });
      });
    }
  }
};

function getBotList(botNames, botIds, page) {
  const startIndex = (page - 1) * 10;
  const endIndex = page * 10;
  return botNames.slice(startIndex, endIndex).map((name, i) => `${startIndex + i + 1} ・ **${name}** [\`${botIds[startIndex + i]}\`]`).join('\n');
}
