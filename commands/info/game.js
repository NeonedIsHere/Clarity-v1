const igdb = require('igdb-api-node').default;
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'game',
  aliases: ['g'],
  description: 'Récupère les informations à propos d\'un jeu',
  run: async (client, message, args) => {
    const query = args.join(' ');
    const games = await igdb('games').search(query).fields('*').limit(1).request();
    const game = games[0];

    if (game) {
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(game.name)
        .setURL(`https://www.igdb.com/games/${game.slug}`)
        .setDescription(game.summary)
        .setThumbnail(`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`)
        .addFields(
          { name: 'Date de sortie', value: game.first_release_date ? new Date(game.first_release_date * 1000).toLocaleDateString('fr-FR') : 'Non disponible' },
          { name: 'Développeur', value: game.involved_companies ? game.involved_companies.map(c => c.company.name).join(', ') : 'Non disponible' },
          { name: 'Genres', value: game.genres ? game.genres.map(g => g.name).join(', ') : 'Non disponible' },
          { name: 'Plateformes', value: game.platforms ? game.platforms.map(p => p.name).join(', ') : 'Non disponible' },
          { name: 'Moyenne des critiques', value: game.rating ? `${game.rating.toFixed(1)} / 100` : 'Non disponible' },
        )
        .setImage(`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.screenshots[0].image_id}.jpg`);

      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send(`Je n'ai pas pu trouver d'informations sur le jeu "${query}".`);
    }
  }
};
