const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color");

module.exports = {
  name: "invite",
  description: "Afficher le nombre d'invitations d'un utilisateur sur le serveur, ainsi que le nombre d'invitations valides, invalides et bonus.",
  run: async (client, message, args, prefix) => {
    let color = cl.fetch(`color_${message.guild.id}`);
    if (color == null) color = client.config.color;

    const target = message.mentions.users.first() || message.author;
    const invites = await message.guild.invites.fetch();
    const userInvites = invites.filter(invite => invite.inviter.id === target.id);
    const totalInvites = userInvites.reduce((acc, invite) => acc + invite.uses, 0);

    let validInvites = 0;
    let invalidInvites = 0;
    let bonusInvites = 0;
    userInvites.forEach(invite => {
      if (invite.maxUses && invite.uses >= invite.maxUses) {
        validInvites++;
      } else if (invite.uses > 0) {
        invalidInvites++;
      } else {
        bonusInvites++;
      }
    });

    const embed = new Discord.MessageEmbed()
      .setTitle(`Invitations de ${target.tag}`)
      .setDescription(`**${target.username}** a envoyé **${totalInvites}** invitations sur ce serveur, **${invalidInvites}** invitations invalides et **${bonusInvites}** invitations bonus.`)
      .setColor(color)
      .setFooter(`LuminaBots ${client.config.version}`, client.user.displayAvatarURL());

    message.reply({
      embeds: [embed],
      allowedMentions: { repliedUser: false }
    });
  }
};
