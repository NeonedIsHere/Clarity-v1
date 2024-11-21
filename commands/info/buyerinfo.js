const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const cl = new db.table("Color");
const config = require("../../config.json");
module.exports = {
  name: "buyerinfo",
  aliases: ["bui"],
  description: "role <rôle>",
  run: async (client, message, args, prefix) => {
       let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color;
    const buyer = client.users.cache.get(config.buyer);

    const icon = buyer.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 1024,
    });

    const userlol = new Discord.MessageEmbed()
      .setAuthor(`Informations`)

      .addField(
        `**General**`,
        `**Nom**: \`${buyer.username}\` \nTag: \`${buyer.discriminator}\` \nID: \`${buyer.id}\``
      )
      .addField(
        `**Info**`,
        `Compte créé le: \n\`${moment(buyer.createdAt).format(
          "dddd, MMMM Do YYYY, h:mm:ss A"
        )}\``
      )

      .setImage(icon)
      .setFooter({ text: `LuminaBots ${client.config.version}`  })
      .setColor(color);
    message.channel.send({ embeds: [userlol] });
  },
};
