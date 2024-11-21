const db = require('quick.db')
const cl = new db.table("Color")
const Discord = require('discord.js')

module.exports = {
    name: "8ball",
    description:"Répond aléatoirement à une question posée.",
    run: async (client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!args[0]) return message.reply(":x: Question incorrecte")

let replies = ["Oui !", "Non !", "Probablement que oui !", "Probablement que non !", "Peut-être !"];
	
let result = Math.floor((Math.random() * replies.length));


const rep = new Discord.MessageEmbed()
.setColor(color)
.setDescription(`Question: ${args.join(" ")}\n
Question posé par : ${message.author}\n
Réponse: ${replies[result]}\n
`)
.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL()})



message.reply({embeds: [rep]}).catch(() => false)
    }
}
