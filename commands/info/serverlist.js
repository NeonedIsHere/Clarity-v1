const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const fetch = require('node-fetch')
module.exports = {
    name: 'serverlist',
    aliases: ['sl'],
    run: async (client, message, args, prefix) => {
      let description =
                `**Nombre de serveurs :** \`${client.guilds.cache.size}\`\n\n` +
                client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} \`[${r.memberCount}]\`・ \`(${r.id})\``)
                    .slice(0, 10)
                    .join("\n")


                                

        const embed = new MessageEmbed()
        .setTitle(`Liste des serveurs du bot`)
        .setColor("BLUE")
        .setDescription(description)
            .setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL({ dynamic: true })})


           

            //  le  bot propose de changer de page avec un bouton next ou back
            const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('back')
            .setEmoji('⏪')
            .setStyle('SECONDARY'),
            new MessageButton()
            .setCustomId('next')
            .setEmoji('⏩')
            .setStyle('SECONDARY'),

           
          )


          
 
          
        let msg = await  message.channel.send({embeds: [embed], components: [row]})


       
        let p0 = 0;
        let p1 = 10;
        let page = 1;

          // le bot permet de changer de page avec le bouton next ou back

          const filter = (button) => button.user.id === message.author.id
          const collector = msg.createMessageComponentCollector({ filter })

          collector.on('collect', async (i) => {
            if (i.user.id !== message.author.id) return;
            i.deferUpdate()
            
            if (i.customId === 'next') {
             // si le bot a plus de 10 serveur on peut changer de page

              p0 = p0 + 10;
              p1 = p1 + 10;
              page = page + 1;

              if (p1 > client.guilds.cache.size + 10) {
                return msg.delete();
            }
            if (!p0 || !p1) {
                return msg.delete();
            }

            let ndescription =
                `**Nombre de serveurs :** \`${client.guilds.cache.size}\`\n\n` +
                client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} \`[${r.memberCount}]\`・ \`(${r.id})\``)
                    .slice(p0, p1)
                    .join("\n")

              const embed = new MessageEmbed()
              embed.setTitle(`Liste des serveurs du bot`)
              embed.setColor("BLUE")
              embed.setDescription(ndescription)
              embed.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL({ dynamic: true })})
              
              msg.edit({embeds: [embed], components: [row]})


              

            }

            if (i.customId === 'back') {
              // le bot change la page avec le bouton back
              
              p0 = p0 - 10;
              p1 = p1 - 10;
              page = page - 1;

              if (p0 < 0) {
                return msg.delete();
              }

              let bdescription =
              `**Nombre de serveurs :** \`${client.guilds.cache.size}\`\n\n` +
              client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r)
                  .map((r, i) => `**${i + 1}** - ${r.name} \`[${r.memberCount}]\`・ \`(${r.id})\``)
                  .slice(p0, p1)
                  .join("\n")


              
              const embed = new MessageEmbed()
              embed.setTitle(`Liste des serveurs du bot`)
              embed.setColor("BLUE")
              embed.setDescription(bdescription)
              embed.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL({ dynamic: true })})
              
              msg.edit({embeds: [embed], components: [row]})

            }
          })
          
    }
}