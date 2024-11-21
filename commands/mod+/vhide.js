const Discord = require('discord.js');

module.exports = {
    name: "vhide",
    description: "Permet de cacher votre salon vocal",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande!");

        const channel = message.member.voice.channel;
        if (!channel) return message.channel.send("Vous devez être dans un salon vocal!");

    

        const embed = new Discord.MessageEmbed()

        embed.setTitle("Votre salon vocal a été hide!")
        embed.setDescription(`Salon vocal : ${channel}\nID : ${channel.id}\nNombre de membres : ${channel.members.size}\nHide par : ${message.author}`)
        embed.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL()})
        embed.setTimestamp()
        embed.setColor(client.config.color)






        
            
        channel.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === '@everyone'), {
            CONNECT: false,
            VIEW_CHANNEL: false,
        });
            return message.channel.send({embeds: [embed]})

        



        
    }
}