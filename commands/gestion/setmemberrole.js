const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'setmembrer',
    description:"permet de définir un rôle pour indiquer quels membres font partie de la liste des membres",
    aliases: [],
    run: async (client, message, args, prefix) => {

        // Vérifie que l'utilisateur qui utilise la commande a les permissions "ADMINISTRATOR"
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send({ content: `Tu as besoin de la permission \`ADMINISTRATOR\`.` });
        }

        // Récupère le rôle mentionné dans le message
        let membreRole = message.mentions.roles.first();

        // Si aucun rôle n'a été mentionné, renvoie un message demandant de préciser le rôle
        if (!membreRole) {
            return message.channel.send({ content: `Merci de mentionner un rôle pour définir qui fait partie des membres.` });
        }

        // Enregistre l'ID du rôle dans la base de données "quick.db" pour pouvoir le récupérer plus tard
        db.set(`memrole_${message.guild.id}`, membreRole.id);

        // Renvoie un message de confirmation avec le nom du rôle
        message.channel.send({ content: `Les membres ayant le rôle ${membreRole} seront maintenant dans la liste des membres.` });
    }
};
