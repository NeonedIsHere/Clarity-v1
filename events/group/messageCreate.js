const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table('Color');

module.exports = async (client, message) => {
    // fonction qui fonctionne quand un message est envoyé dans les messages privés du bot 
    if (message.author.bot) return;
    // Vérifier si le message a été envoyé dans un canal privé
  if (message.channel.type !== 'DM') return;

  let color = client.config.color

  // si l'auteur ne fait pas parti de la db groupmd alors l event se return
  if (!db.has(`groupmd_${client.user.id}_${message.author.id}`)) return;
    if (message.channel.type === 'DM') {
       

        const embed = new Discord.MessageEmbed()
        .setColor(color)
    .setDescription(message.content)
    .setTimestamp()
    .setImage(message.attachments.first()? message.attachments.first().proxyURL : null)
    .setFooter({text: `Envoyé par ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})

     // ajoute une reaction sur le message de l auteur
     message.react('✅')
     
    //
    let desti = db.all().filter(data => data.ID.startsWith(`groupmd_${client.user.id}`)).sort((a, b) => b.data - a.data)
    desti.filter(x => client.users.cache.get(x.ID.split('_')[2])).map(async (m, i) => {
      await client.users.cache.get(m.ID.split('_')[2]).send({embeds: [embed]})
    })
     
   


 
    }

}