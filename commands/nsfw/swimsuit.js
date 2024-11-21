const Discord = require("discord.js");

module.exports = {
    name: "paizuri",
    run: async(client, message, args) => {
        if (!message.channel.nsfw) return message.channel.send("Channel non défini en tant que channel nfsw")

        let load = new Discord.MessageEmbed()
          .setDescription("Chargement. . .")
          .setTimestamp()
          message.channel.send({embeds: [load]}).then(m => {
        client.superagent.get('https://nekobot.xyz/api/image').query({
            type: "paizuri"
          }).end((err, response) => {

            let row = new Discord.MessageActionRow()
             .addComponents(
                new Discord.MessageButton()
                .setStyle("LINK")
                .setURL(response.body.message)
                .setLabel("L'image ne charge pas")
             )

            let embed = new Discord.MessageEmbed()
              .setTimestamp()
              .addFields({
                name: "Image : paizuri",
                value: "Votre recherche a été effectué avec succès :",
              })
              .setImage(response.body.message)
              .setFooter({text: "LuminaBots V1"})
              m.edit({
                embeds: [embed],
                components: [row]
              })

          })
        })
    }
}