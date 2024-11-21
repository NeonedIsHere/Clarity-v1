const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name : "allvoiceunmute",
    aliases: ['avcum'],
    description:"permet de rendre la parole à tous les membres du salon vocal désigné.",
    run: async(client, message, args) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!message.member.permissions.has('MUTE_MEMBERS')) return;
        let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
        if (!channel) return message.channel.send({ content: "Vous devez être dans un salon vocal ou indiquer un ID de salon" });
        channel.members.filter((x) => !x.permissions.has("ADMINISTRATOR"))
            .forEach((x, index) => {
                x.voice.setMute(false);
            });

            let sucess = new MessageEmbed()
            .setTitle(`\`${channel.name}\``)
            .setDescription("Tout les membres du channel ont été unmute")
            .setColor(color)
            .setFooter({text:`LuminaBots ${client.config.version}` }, client.user.avatarURL())
        message.channel.send({embeds: [sucess]})
    }
}
  