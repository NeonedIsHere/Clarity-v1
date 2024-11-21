const Discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const bfp = new db.table("Bfp")
const cl = new db.table("Color")
module.exports = {
    name: 'bfp',
    aliases: [],
    description:"'Banner for profile' permet de gérer le salon dans lequel vous voudrez afficher les bannières des membres.",
    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
 
            try {

               
                const embed = new MessageEmbed()
                .setDescription(`Channel bfp: <#${bfp.get(`${message.guild.id}.channelbfp`)}>`)
                .setColor(color)
                .setFooter({text:`LuminaBots ${client.config.version}` })
                let menuoptions = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: "Modifier le channel bfp",
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
                    if (i.values[0] == "annuler") {
                        menumsg.delete()
                    }

                    if(i.values[0] == "mdfc") {
                    
            
                        const ez = await message.channel.send(`Quelle est le nouveau channnel bfp?`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["temps"]
                        }).then(collected => {
                            var msg = collected.first();
                            const channel = message.guild.channels.cache.get(msg.content);
                            bfp.set(`${message.guild.id}.channelbfp`, channel.id)
                            
                            
                            ez.delete()
                            const embed = new MessageEmbed()
                .setDescription(`Salon bfp: <#${bfp.get(`${message.guild.id}.channelbfp`)}>`)
                .setColor(color)
                .setFooter({text:`LuminaBots ${client.config.version}` })
                            collected.first().delete()
                            menumsg.edit({embeds: [embed]})
                        })
                    }

                    if (i.values[0] == "reset") {
                        bfp.delete(`${message.guild.id}.channelbfp`);
                      
                        const embed = new MessageEmbed()
                .setDescription(`Salon bfp: <#${bfp.get(`${message.guild.id}.channelbfp`)}>`)
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
