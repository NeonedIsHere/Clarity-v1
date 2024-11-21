const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const db = require('quick.db')
const cl = new db.table("Color")
module.exports = {
    name: 'balance',
    aliases: ["bal"],
    run: async (client, message, args, prefix) => {

        
        



       
        
 
               let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
           
        let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r =>
            r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.member;
  
      let bal = db.fetch(`money_${message.guild.id}_${user.id}`);
  
      if (bal === null) bal = 0;
  
      let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
  
      if (bank === null) bank = 0;
  
      if (user) {
        let moneyEmbed = new MessageEmbed()
        .setTitle("Balance de\n" + user.user.username)
          .setColor(color)
          .setFooter({text: `LuminaBots ${client.config.version}` })
          .setDescription(
            `\nEn poche: ${bal}\nEn banque: ${bank}`
          );
        message.channel.send({embeds: [moneyEmbed]});
      } else {
        return message.channel.send("**Entrez un utilisateur valide!**");
      }
            }

        }

    

