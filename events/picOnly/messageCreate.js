const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table('Color');

module.exports = async (client, message) => {
    // fonction qui fonctionne quand un message est envoyé dans les messages privés du bot 
    if (message.author.bot) return;
    // Vérifier si le message a été envoyé dans un canal privé
  if (message.channel.type !== 'DM') return;

  let color = client.config.color

  if (!message.guild || message.member && message.member.permissions.has("ADMINISTRATOR")) return;
  const piconly = client.db.get(`piconly_${message.guild.id}`);

  if (piconly) {
  if (piconly.includes(message.channel.id) && message.attachments.size <= 0) {
      return message.delete().catch(() => {  
      });
  }
} else {
  if (!piconly)
  return;
}
     
   


 
    }

