const { Client, Message, MessageEmbed } = require('discord.js');
const Zalgo = require('to-zalgo')
const db = require('quick.db')
const cl = new db.table("Color")

module.exports = {
    name: 'zalgo',
    aliases: ['zlg'], 
    description: 'Convertissez vos textes en Zalgo',
    usage: 'zalgo <text>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let color = db.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        message.channel.send({embeds: [ new MessageEmbed()
            .setColor(color)
            .setAuthor(message.author.tag)
            .setTitle(`Votre texte: ${args.join(" ")}`)
            .setDescription(`${Zalgo(args.join(" "))}`)
            .setFooter({ text: `LuminaBots ${client.config.version}`  })
            .setTimestamp()]}
           
        )

    }
}