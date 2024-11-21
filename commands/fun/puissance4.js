const Discord = require('discord.js')
const db = require('quick.db')
const { Connect4 } = require('discord-gamecord')
const cl = new db.table("Color")
module.exports = {
    name: 'puissance4',
    aliases: [],
    description:"Jouez simplement au puissance 4.",
    run: async (client, message, args, prefix) => {
         let color = cl.fetch(`color_${message.guild.id}`)
        new Connect4({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Puissance 4',
                color: color,
            },
            emojis: {
                player1: '🔵',
                player2: '🟡'
            },
            turnMessage: '{emoji} | C\'est maintenant le tour de **{player}**',
            winMessage: '{emoji} | **{winner}** a gagné la partie',
            gameEndMessage: 'Le jeu est resté interminé :(',
            drawMessage: 'C\'est une égalité',
            askMessage: 'Hey {opponent}, {challenger} vous a défié pour une partie de Puissance 4',
            cancelMessage: 'On dirait qu\'il a refusé',
            timeEndMessage: 'L\'adversaire n\'a pas répondu',
        }).startGame();

    }
}  