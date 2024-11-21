const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const cl = new db.table("Color");

module.exports = {
  name: "boost",
  description: "Affiche la liste des membres ayant boosté le serveur",
  run: async (client, message, args) => {
    const guild = message.guild;
    let color = cl.get(`color_${guild.id}`) || client.config.color;
    let desc = "";
    guild.members.cache
      .filter((m) => m.premiumSince)
      .forEach((m) => {
        desc += `[\`${m.user.tag}\`](https://discord.com/users/${m.user.id}) | \`${m.user.id}\` | <t:${Math.floor(m.premiumSince.getTime() / 1000)}:R>\n\n`;
      });
    const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(desc || "Ce serveur n'a aucun boost")
      .setTimestamp()
      .setFooter(`LuminaBots ${client.config.version}`);
    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  },
};
