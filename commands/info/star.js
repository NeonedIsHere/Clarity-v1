const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color")
module.exports = {
    name: "starboard",
    run: async(client, message, args) => {
         // Check if the message is in a guild and not from a bot
         let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
  if (!message.guild || message.author.bot) return;

  // Check if the message is a valid starboard message (contains at least one star reaction)
  const reaction = message.reactions.cache.find(r => r.emoji.name === '⭐' && r.count >= 1);
  if (!reaction) return;

  // Get the starboard channel from the database (if it exists)
  const starboardChannelID = db.get(`starchan_${message.guild.id}`);
  if (!starboardChannelID) return;

  // Get the starboard channel and send the message to it
  const starboardChannel = message.guild.channels.cache.get(starboardChannelID);
  if (!starboardChannel) return;

  const starboardMessage = await starboardChannel.messages.fetch({ limit: 100 }).then(messages => messages.find(m => m.embeds[0] && m.embeds[0].footer.text.startsWith(`⭐ ${message.id}`)));

  if (starboardMessage) {
    // Update the starboard message with the new reaction count
    const embed = new MessageEmbed(starboardMessage.embeds[0])
      .setDescription(`${reaction.count} ${reaction.emoji} - ${message.channel}`)
      .setFooter(`⭐ ${message.id}`)
      .setColor('GOLD');
    await starboardMessage.edit({ embeds: [embed] });
  } else {
    // Create a new starboard message with the original message content and the reaction count
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${reaction.count} ${reaction.emoji} - ${message.channel}`)
      .addField('Original Message', message.content)
      .setImage(message.attachments.first() ? message.attachments.first().url : null)
      .setFooter(`⭐ ${message.id}`)
      .setColor('GOLD');
    await starboardChannel.send({ embeds: [embed] });
  }
    }
}