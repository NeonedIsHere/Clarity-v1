const Discord = require('discord.js');
const db = require('quick.db');
const fivem = require("discord-fivem-api");
const cl = new db.table('Color')

module.exports = {
    name: 'server-info',
    description: 'Afficher les informations sur le serveur fivem',
    run: async (client, message, args) => {

      // recupere l ip et le port du server enregistrer dans la db server et les stocks dans la variable serverip 

      const servData = db.get('server')
      const { ip, port } = servData;
        const server = new fivem.DiscordFivemApi(ip, port);
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(!server) { message.channel.send('Aucune information sur le serveur fivem n\'a été trouvée veuillez vous assurer que le serveur est bien défini')
    } 

    server.getPlayers().then(async (data) => {
      let result  = [];
      let index = 1;
      for (let player of data) {
        result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
      }
      const playersOnline = await server.getPlayersOnline()
      const servstatus = await server.getServerStatus()
      const servResources = await server.getServerResources();
      const servLicenseKey = await server.getServerLicenseKey();
      const servVersion = await server.getServerVersion();
        const embed = new MessageEmbed()
        .setTitle('Informations du serveur')
       .addFields({
        name: 'IP du serveur',
        value: ip,
        inline: true
       }, {
        name: 'Port du serveur',
        value: port,
        inline: true
       }, {
        name: 'Nombre de joueurs',
        value: `${data.length}/${playersOnline}`,
        inline: true
       }, {
        name: 'Statut du serveur',
        value: servstatus,
        inline: true
       }, {
        name: 'Ressources du serveur',
        value: servResources,
        inline: true
       }, {
        name: 'License du serveur',
        value: servLicenseKey,
        inline: true
       }, {
        name: 'Version du serveur',
        value: servVersion,
        inline: true
       })
        .setColor(color);
        message.channel.send({embeds: [embed]});
    })
   }
      
    }

    
