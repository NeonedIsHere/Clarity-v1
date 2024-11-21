const db = require('quick.db')
const Discord = require('discord.js')
const cl = new db.table("Color")
module.exports = {
    name: "family",
    description:"affiche la liste des frères et sœurs.",
    run: async (client, message, args) => {
      
    
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
  // Obtenez les informations de lien de Quick.db pour l'utilisateur qui a exécuté la commande
  const brosis = db.all().filter(data => data.ID.startsWith(`brosis_${message.author.id}`)).map(data => data.ID.replace(`brosis_${message.author.id}_`, ''));
  const marry = db.all().filter(data => data.ID.startsWith(`marry_${message.author.id}`)).map(data => data.ID.replace(`marry_${message.author.id}_`, ''));
    
  // Créez un message qui montre les utilisateurs avec lesquels l'utilisateur a un lien
  const lienMessage = new Discord.MessageEmbed()
    .setTitle('Votre famille:')
    .setDescription(`**Frères et soeurs : **${brosis.map(id => `<@${id}>`).join(', ')}\n**Vous êtes marrier avec : **${marry.map(id => `<@${id}>`).join(', ')}\n`)
    .setColor(color)
    .setTimestamp();
  
  // Répondez à l'utilisateur avec le message
  message.channel.send({ embeds: [lienMessage] });
        
        
    }
}
