const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
const cl = new db.table("Color")
module.exports = {
    name: "confess",
    aliases: ["conf"],
    description:"Confessez-vous en utilisant cette commande!",
    run: async(client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (message.deletable) message.delete();
        let channel = await db.fetch(`confession_${message.guild.id}`);
        if (channel === null) return;

        const suggestq = args.join(" ");
        if(!suggestq) return message.reply({ content: "S'il vous plait veuillez faire une confession" })

        const embed = new MessageEmbed()
        .setTitle("Nouvelle Confession !")
        .setDescription(`${suggestq}`)
        .setColor(color)
        .setFooter(`LuminaBots ${client.config.version}` )
        .setTimestamp();

        const conf = new MessageEmbed()
        .setDescription(`Votre confession a été transféré ici <#${channel}>\n\n`)
        .setFooter(`LuminaBots ${client.config.version}` )
        .setColor(color)

        let confe = await message.channel.send({ embeds: [conf] })

        let msgEmbed = await message.guild.channels.cache.get(channel).send({ embeds: [embed] })

// supprime le message confe apres un certain temps

        setTimeout(() => {
            confe.delete()
        }, 1000)



    }
}