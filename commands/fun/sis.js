const db = require('quick.db')
const Discord = require('discord.js')
const cl = new db.table("Color")
module.exports = {
    name: "sis",
    aliases:["sister"],
    description:"Permet de vous attribuer une soeur!",
    run: async (client, message, args) => {
        const user = message.mentions.users.first();
    
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (!user) {
          return message.reply('vous devez mentionner la personne avec laquelle vous souhaitez être la soeur.');
        }

        // si l user est un bot la commande ne fonctionne pas 
       
        if (user.bot) {
          return message.reply('vous ne pouvez pas être la soeur d un bot.');
        }
        
        // message de mariage 

        const marryMess = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`${message.author.username} souhaite être votre soeur. Cliquez sur le bouton correspondant pour accepter ou refuser .`)
       

        const acceptButton = new Discord.MessageButton()
        .setCustomId('accepter')
        .setLabel('Accepter')
        .setStyle('SUCCESS');
        
      const refuseButton = new Discord.MessageButton()
        .setCustomId('refuser')
        .setLabel('Refuser')
        .setStyle('DANGER');

        let row = new Discord.MessageActionRow()
        row.addComponents(acceptButton, refuseButton)
      
        const author = message.author;

        
        user.send({embeds: [marryMess], components: [row]}).then(sentMessage => {
            const collector = sentMessage.createMessageComponentCollector({ componentType: 'BUTTON'});

            collector.on('collect', async (button) => {
                if (button.customId === 'accepter') {
                    db.set(`brosis_${message.author.id}_${user.id}`, true)
                    db.set(`brosis_${user.id}_${message.author.id}`, true)
                     // Répondez à l'utilisateur avec un message confirmant la création du lien
          button.reply({ content: `Vous avez accepté ${message.author.username} en tant que soeur.`, ephemeral: true });

          author.send({content: `${user.username} a accepter que tu sois sa soeur : ${author}`})
          
            // Arrêtez le collecteur de boutons
            collector.stop();
                } else if (button.customId === 'refuser') {
            // Répondez à l'utilisateur avec un message confirmant le refus du lien
                button.reply({ content: `Vous avez refusé ${message.author.username} en tant que soeur`, ephemeral: true });
          
                author.send({content: `${user.username} a refuser que tu sois sa soeur : ${author}`})
                // Arrêtez le collecteur de boutons
                    collector.stop();
                }
            })
        
    })

    }
}
