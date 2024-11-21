const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
const cl = new db.table("Color")
module.exports = {
    name: "denysugg",
    description:"refusez la suggestion.",
    run: async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: `Tu as besoin de la permission \`ADMINISTRATOR\`.` })
        const channel = db.fetch(`suggestion_${message.guild.id}`)
        if(channel === null) {
            const noChannel = new MessageEmbed()
            .setDescription(`Vous devez d abord définir un channel: \`${prefix}setsuggest ou ${prefix}presetsuggest\``)
            .setColor(color)
            .setFooter({text: 'LuminaBots ${client.config.version}` ${client.config.version}'})

            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

            return message.channel.send({
                embeds: [noChannel]
            })
        }
        if(!args[0]) {
            const noArgs = new MessageEmbed()
            .setDescription("Renseigné l'id d'un message")
            .setColor(color)
            .setFooter({text: 'LuminaBots ${client.config.version}` ${client.config.version}'})

            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

            return message.channel.send({
                embeds: [noArgs]
            })
        }

        try {
            const suggestedEmbed = await message.guild.channels.cache.get(channel).messages.fetch(args[0])
    
            const data = suggestedEmbed.embeds[0]
    
            const accepted = new MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor(color)
            .addField("Status: refusée", `${args.slice(1).join(" ") || "❌"}`)
    
            await suggestedEmbed.edit({
                embeds: [accepted]
            })
            .then(async() => {
                await suggestedEmbed.reactions.removeAll();
            })
            .then(async() => {
                const success = new MessageEmbed()
                .setDescription(`La suggestion avec l'id \`${args[0]}\` a été __refusée__`)
                .setColor(color)
                .setFooter({text: 'LuminaBots ${client.config.version}` ${client.config.version}'})

                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))

                await message.channel.send({
                    embeds: [success]
                })
            })
        } catch {
            return util.errorEmbed(client, message, "Renseigner l'id d'un message valide", color)
        }
    }
}


        
