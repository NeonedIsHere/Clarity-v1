const db = require('quick.db')
const Discord = require('discord.js')
const cl = new db.table("Color")
module.exports = {
    name: "unmarry",
    description:"Divorcez de votre cojoint (sur discord)",
    run: async (client, message, args) => {
      
    
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        const user = message.mentions.users.first();
    
        if (!user) {
          return message.reply('vous devez mentionner la personne avec laquelle vous voulez divorcer.');
        }
        
        // Vérifiez si un lien existe entre les deux utilisateurs
        const lienExiste = db.get(`marry_${message.author.id}_${user.id}`);
        if (!lienExiste) {
          return message.reply('vous n\'êtes pas marrier avec cette personne.');
        }
        
        // Supprimez le lien
        db.delete(`marry_${message.author.id}_${user.id}`);
        db.delete(`marry_${user.id}_${message.author.id}`, true)
        
        // Répondez à l'utilisateur avec un message confirmant la suppression du lien
        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`**${message.author.username}** vous avez divorcer avec ${user.username}.`)
        message.channel.send({embeds: [embed]});
        
        
    }
}
