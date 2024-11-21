const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color");

module.exports = {
  name: "addinvite",
  description: "Ajoute une invitation avec un nombre d'utilisations maximum (facultatif).",
  run: async (client, message, args, prefix) => {
    let color = cl.fetch(`color_${message.guild.id}`);
    if (color == null) color = client.config.color;

    const channel = message.mentions.channels.first() || message.channel;
    const maxUses = args[1] ? parseInt(args[1]) : null;

    const invite = await channel.createInvite({
      maxUses: maxUses,
      unique: true
    });

    db.add(`invites_${message.guild.id}_${message.author.id}`, 1);

    const embed = new Discord.MessageEmbed()
      .setTitle("Nouvelle invitation créée !")
      .setDescription(`Voici le lien d'invitation : ${invite.url}\n${maxUses ? `Nombre d'utilisations maximum : ${maxUses}` : ''}`)
      .setColor(color)
      .setFooter(`LuminaBots ${client.config.version}`, client.user.displayAvatarURL());

    message.reply({
      embeds: [embed],
      allowedMentions: { repliedUser: false }
    });
  }
};
