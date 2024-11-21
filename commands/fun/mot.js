const Discord = require('discord.js')
const db = require('quick.db')
const { ChaosWords } = require("weky");
const cl = new db.table("Color")
module.exports = {
    name: 'mot',
    aliases: [],
    description:"Trouvez un mot aléatoire en un temps réparti.",
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
      
        await ChaosWords({
            message: message,
            embed: {
                title: 'Trouve les mots',
                description: 'Tu as **{{time}}** pour trouver les mots cachés dans la phrase ci-dessous.',
                color: `${color}`,
                field1: 'Phrase:',
                field2: 'Mots trouvés/restants:',
                field3: 'Mots trouvés:',
                field4: 'Mots:',
                footer: `LuminaBots ${client.config.version}` ,
                timestamp: false
            },
            winMessage: 'GG, Tu as gagné! Tu l\'as fait en **{{time}}**.',
            loseMessage: 'Plus de chance la prochaine fois!',
            wrongWordMessage: 'Mauvais mot ! Tu as **{{remaining_tries}}** essais restants.',
            correctWordMessage: 'GG, **{{word}}** est correcte ! Vous devez trouver **{{remaining}}** mot(s).',
            time: 60000,
            words: ['salut', 'temps', 'bravo'],
            charGenerated: 15,
            maxTries: 10,
            buttonText: 'Abandonné',
            othersMessage: 'Seulement <@{{author}}> peut utiliser le bouton'
        });

    }
}  