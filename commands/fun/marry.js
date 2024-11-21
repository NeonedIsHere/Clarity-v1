const db = require('quick.db')
const Discord = require('discord.js')
const cl = new db.table("Color")
module.exports = {
    name: "marry",
    description:"Marriez-vous avec quelqu'un!",
    run: async (client, message, args) => {
        const user = message.mentions.users.first();
    
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (!user) {
          return message.reply('vous devez mentionner la personne avec laquelle vous voulez vous marrier.');
        }

        // si l user est un bot la commande ne fonctionne pas 
       
        if (user.bot) {
          return message.reply('vous ne pouvez pas vous marrier avec un bot.');
        }

        // verif si la personne est deja marrier
        if (db.has(`marry_${message.author.id}`) && db.get(`marry_${message.author.id}`) === true) {
          return message.reply('Vous êtes déja marrier avec une personne')
        }

        if (db.has(`marry_${user.id}`) && db.get(`marry_${user.id}`) === true) {
          return message.reply('Cette personne est déja marrier')
        }


        // verif si les 2 personnes sont deja marrier
        if (db.has(`marry_${message.author.id}_${user.id}`) && db.get(`marry_${message.author.id}_${user.id}`) === true) {
          return message.reply('vous êtes déjà marié avec cette personne.');
      }

      if (db.has(`marry_${user.id}_${message.author.id}`) && db.get(`marry_${user.id}_${message.author.id}`) === true) {
          return message.reply(`${user.username} est déjà marié avec vous.`);
      }
        
        // message de mariage 

        const marryMess = new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`${message.author.username} vous demandes en mariage. Cliquez sur le bouton correspondant pour accepter ou refuser le mariage.`)
       

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
            const collector = sentMessage.createMessageComponentCollector({ componentType: 'BUTTON' });

            collector.on('collect', async (button) => {
                if (button.customId === 'accepter') {
                    db.set(`marry_${message.author.id}_${user.id}`, true)
                    db.set(`marry_${user.id}_${message.author.id}`, true)
                     // Répondez à l'utilisateur avec un message confirmant la création du lien
          button.reply({ content: `Vous avez accepté le mariage avec ${message.author.username}.`, ephemeral: true });

          author.send({content: `${user.username} a accepter de se marier avec vous : ${author}`})
          
            // Arrêtez le collecteur de boutons
            collector.stop();
                } else if (button.customId === 'refuser') {
            // Répondez à l'utilisateur avec un message confirmant le refus du lien
                button.reply({ content: `Vous avez refusé le mariage avec ${message.author.username}.`, ephemeral: true });
          
                author.send({content: `${user.username} a refuser de se marier avec vous : ${author}`})
                // Arrêtez le collecteur de boutons
                    collector.stop();
                }
            })
        
    })

    }
}
