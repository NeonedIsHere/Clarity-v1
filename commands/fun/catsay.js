const Discord = require('discord.js')
const db = require('quick.db')


module.exports = {
    name: 'catsay',
    aliases: [],
    description:"permet à un chat de dire un message spécifié par l\'utilisateur.",
    run: async (client, message, args, prefix) => {

    
        message.delete()

        const msg = args.join(" ")
        if (!msg) {
            return message.channel.send("Quel message veux tu que le chat dise ?")
        }
        message.channel.send({
            files: [
                {
                    attachment: `https://cataas.com/cat/cute/says/${msg}`,
                    name: "catsay.png",
                }
            ]
        })

    }
}  