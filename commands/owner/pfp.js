const Discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const pfp = new db.table("Pfp")
const cl = new db.table("Color")
module.exports = {
    name: 'pfp',
    aliases: ['pp'],
    run: async (client, message, args, prefix) => {
   
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
         if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
 
            try {

               
                const embed = new MessageEmbed()
                .setDescription(`Channel pfp: <#${pfp.get(`${message.guild.id}.channelpfp`)}>`)
                .setColor(color)
                .setFooter({text:`LuminaBots ${client.config.version}` })
                let menuoptions = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: "Modifier le channel pfp",
                        value: `mdfc`,
                        emoji: "💠",
                    },
                    {
                        label: "Reset",
                        value: "reset",
                        emoji: "⚠"
                    },
                    {
                        label: "Annulé",
                        value: "cancel",
                        emoji: "❌",
                    },
                   
                ])

                let used1 = false;

                const menumsg =  await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })

                function menuselection(i) {
                    used1 = true;
                }

                //Event
                let msg = menumsg

                let filter2 = (m) => m.author.id === message.author.id

                let filter1 = (i) => i.user.id === message.author.id;
                const col = await msg.createMessageComponentCollector({
                    filter: filter1,
                    componentType: "SELECT_MENU"
                })
                col.on("collect", async(i) => {
                    if (i.values[0] == "cancel") {
                        menumsg.delete()
                    }

                    if(i.values[0] == "mdfc") {
                        
                        const ez = await message.channel.send(`Quelle est le nouveau channnel pfp?`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        }).then(collected => {
                            var msg = collected.first();
                            const channel = message.guild.channels.cache.get(msg.content);
                            pfp.set(`${message.guild.id}.channelpfp`, channel.id)
                            
                            
                            ez.delete()
                            const embed = new MessageEmbed()
                .setDescription(`Channel pfp: <#${pfp.get(`${message.guild.id}.channelpfp`)}>`)
                .setColor(color)
                .setFooter({text:`LuminaBots ${client.config.version}` })
                            collected.first().delete()
                            menumsg.edit({embeds: [embed]})
                        })
                    }

                    if (i.values[0] == "reset") {
                        pfp.delete(`${message.guild.id}.channelpfp`);
                      
                        const embed = new MessageEmbed()
                .setDescription(`Channel pfp: <#${pfp.get(`${message.guild.id}.channelpfp`)}>`)
                .setColor(color)
                .setFooter({text:`LuminaBots ${client.config.version}` })
                menumsg.edit({embeds: [embed]})

                    }
                })
            } catch (err) {
                console.log(err)
            }
          
         


   
}
}
}
