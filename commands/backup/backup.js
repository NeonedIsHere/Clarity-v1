const Discord = require('discord.js')
const db = require('quick.db')
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const owner = new db.table("Owner")
const backup = require("discord-backup")
const cl = new db.table("Color")
module.exports = {
    name: 'backup',
    aliases: [],
    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
   
        
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            const create = args[0] === "create";
            const list = args[0] === 'list';
            const load = args[0] === 'load';
            const del = args[0] === 'delete'

             if (!args[0]) {
            const helpEmbed = new Discord.MessageEmbed()
                
                .setColor(color)
                .setTimestamp()

                .setFooter({text: `LuminaBots ${client.config.version}` })
                .addField('Backup:', `[\`backup create\`](https://discord.gg/LuminaBots) ・ Permet de créer une backup du serveur actuel\n[\`backup delete\`](https://discord.gg/LuminaBots) ・ Permet de supprimer une backup\n[\`backup list\`](https://discord.gg/LuminaBots) ・ Permet d'afficher la liste de toutes les backup`)
            message.channel.send({embeds : [helpEmbed]})
        } 

        if (create) {
            backup.create(message.guild, {
            maxMessagesPerChannel: 100,
            jsonBeautify: true
        }).then((backupData) => {
            message.channel.send(`Backup correctement créer, faites \` la commande backup load ${backupData.id}\` pour charger la backup`);
        })
    }

    if (list) {
        backup.list().then((backups) => {
            const list = new Discord.MessageEmbed()
            .setAuthor('📰 Liste des backups')
            .setDescription(`\`\`\`${backups}\`\`\` `)
            .setColor(color)

            message.channel.send({embeds: [list]});
        });
    }

   if (load) {

    let backupID = args[1];
    if(!backupID){
        return message.channel.send(` Vous devez spécifier une ID de backup valide !`);
    }
    // Fetching the backup to know if it exists
    backup.fetch(backupID).then(async () => {
        // If the backup exists, request for confirmation
        message.channel.send(` Quand la backup est chargé, tout les channels, rôles, etc. Vont être remplacé !`);
            // When the author of the command has confirmed that he wants to load the backup on his server
            message.author.send(` Chargement de la backup`);
            // Load the backup
            backup.load(backupID, message.guild).then(() => {
            }).catch((err) => {
                return message.author.send(` Désolé, une erreur est survenue, veuillez vérifier si je possède les permissions d'administrateur`);
            });
    }).catch((err) => {
        console.log(err);
        return message.channel.send(` Aucun résultat pour la backup \`"+backupID+"\``);
    });
   }

   if (del) {
    if (!args[1]) {
        message.channel.send(` Veuillez spécifier l'ID de la backup que vous voulez supprimer`)
    }
    backup.remove(args[1])
    message.channel.send(` La backup ${args[1]} a été supprimé avec succès`);
}
        }
    }
    }
 