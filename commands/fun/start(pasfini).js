const Discord = require('discord.js');
const Pokemon = require('pokemon');
const db = require('quick.db');

module.exports = {
  name: "start",
  description: "Débutez votre aventure Pokémon!",
  run: async (client, message, args) => {
    const player = {};
    // si le joueur est déja enregistrer dans la db player il ne peut pas recommencer son aventure

    if (db.has(`player_${message.author.id}`)) {
      const playerData = db.get(`player_${message.author.id}`);
      const name = playerData.name;
      const gender = playerData.gender;
      const pokemon = playerData.pokemon;
      const hp = playerData.hp;
      
      return message.reply(`Vous avez déjà commencé votre aventure, avec comme informations :\n
        Nom : ${name}\n
        Genre : ${gender}\n
        Pokémon : ${pokemon}\n
        HP : ${hp}\n
      `);
    }

    // Demander le nom du joueur
    await message.reply('Bonjour, comment vous appelez-vous ?');
    const nameCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
    nameCollector.on('collect', m => {
      player.name = m.content;
      nameCollector.stop();
    });
    nameCollector.on('end', async collected => {
      if (!player.name) {
        await message.reply("Je n'ai pas reçu de réponse, veuillez réessayer.");
        return;
      }

      // Demander le sexe du joueur
      await message.reply(`Bonjour ${player.name}, quel est votre sexe ? (M/F)`);
      const genderCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
      genderCollector.on('collect', m => {
        const gender = m.content.toUpperCase();
        if (gender === 'M' || gender === 'F') {
          player.gender = gender;
          genderCollector.stop();
        } else {
          m.reply('Votre sexe doit être M ou F. Veuillez réessayer.');
        }
      });
      genderCollector.on('end', async collected => {
        if (!player.gender) {
          await message.reply("Je n'ai pas reçu de réponse, veuillez réessayer.");
          return;
        }

        // Randomiser le premier pokemon
        player.pokemon = Pokemon.random();
        player.hp = 100;

        // Enregistrer les informations du joueur dans la base de données
        db.set(`player_${message.author.id}`, player);

        // Afficher les informations du joueur
        await message.reply(`Félicitations ${player.name} ! Vous êtes maintenant prêt pour votre aventure Pokémon. Votre Pokémon de départ est un ${player.pokemon} (${player.hp} HP).`);
      });
    });
  }
};
