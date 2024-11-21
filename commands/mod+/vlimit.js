const Discord = require('discord.js');

module.exports = {
    name: "vlimit",
    description:"Permet de mettre une limite de membres dans le vocal",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande!");

        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send("Vous devez être dans un salon vocal!");

        const limit = args.join(" ")


            channel.setUserLimit(limit);

            const embed = new Discord.MessageEmbed()

            embed.setTitle("Vous avez changé la limite du vocal!")
            embed.setColor(client.config.color)
            embed.setDescription(`Salon vocal: ${channel}\nLimite: ${limit}\nAutheur: ${message.author}`)
            embed.setTimestamp()
            embed.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL()})



            return message.channel.send({embeds: [embed]})






    }
}