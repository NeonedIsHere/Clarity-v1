const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")
let hexColorRegex = require('hex-color-regex');


module.exports = {
    name: 'theme',
    aliases: ["color"],
    run: async (client, message, args, prefix) => {

        if (client.config.owner.includes(message.author.id) || owner.get(`ownermd.${message.author.id}`) ) {

         

            try {

                
                 let color = cl.fetch(`color_${message.guild.id}`)
                if (color == null) color = client.config.color
                
                
                const embed = new MessageEmbed()
                .setDescription(`Couleur d'embed actuelle: ${color}`)
                .setColor(color)
                .setFooter({text:`LuminaBots ${client.config.version}` })
                let menuoptions = new MessageSelectMenu()
                .setCustomId(message.id + 'MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: "Modifier la couleur des embeds",
                        value: `mdfc`,
                        emoji: "🎨",
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
                        const ez = await message.channel.send(`Quelle est la nouvelle couleur d embed?`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        }).then(collected => {
                            var msg = collected.first();
                            cl.set(`color_${message.guild.id}`, msg.content)
                           
                            
                            ez.delete()
                            const embed = new MessageEmbed()
                            .setDescription(`Couleur d'embed actuelle: ${color}`)
                            .setColor(color)
                            .setFooter({text:`LuminaBots ${client.config.version}` })
                            collected.first().delete()
                            menumsg.edit({embeds: [embed]})
                        })
                    }
                })
            } catch (err) {
                console.log(err)
            }


           
            

        }
    }


    }



    function hexColorCheck(a) {
        let check = hexColorRegex().test(a);
        let checkVerify = false;
        if (check === true) {
            checkVerify = true;
        }
        return checkVerify;
    }
