
const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")
module.exports = {
    name: "setbot",
    run: async(client, message, args , prefix ) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.buyer.includes(message.author.id) || db.get(`buyermd.${message.author.id}`)){
        try {

            first_layer()
                async function first_layer() {
                    let menuoptions = new MessageSelectMenu()
                    .setCustomId('MenuSelection')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setPlaceholder("Choisis une option")
                    .addOptions([
                        {
                            label: "Pseudo",
                            value: "name",
                            emoji: "🇦"
                        },
                        {
                            label: "Avatar",
                            value: `pp`,
                            emoji: "🇧",
                        },
                        {
                            label: "Annulé",
                            value: "cancel",
                            emoji: "❌",
                        },

                    ])
                    let acti = new MessageEmbed()
                    .setDescription("LuminaBots Panel")
                    .setFooter({text: `LuminaBots ${client.config.version}` })
                    .setColor(color)
                    let used1 = false;

                    const menumsg = await message.channel.send({ embeds: [acti], components: [new MessageActionRow().addComponents([menuoptions])] })



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
                        i.deferUpdate()
                        if (i.values[0] == "cancel") {
                            menumsg.delete()
                        }

                        if (i.values[0] == "name") {
                            const ez = await message.channel.send(`🇦 Veuillez entrée le pseudonyme que vous voulez definir pour votre bot.`)
                            let collected = await message.channel.awaitMessages({
                                filter: filter2,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            }).then(collected => {
                                ez.delete()

                                const status = collected.first().content
                                client.user.setUsername(status)
                                message.channel.send(`Maintenant mon nom est: **${status}**`)
                            })
                        }

                        if (i.values[0] == "pp") {
                            const ez = await message.channel.send(` 🇧 Veuillez entrée la photo de profile que vous voulez mettre pour le bot(Lien).`)
                            let collected = await message.channel.awaitMessages({
                                filter: filter2,
                                max: 1,
                                time: 60000,
                                errors: ["time"]
                            }).then(collected => {
                                ez.delete()

                                const status = collected.first().content
                                client.user.setAvatar(status)
                                .then(u => message.channel.send(` ${message.author}, Vous avez changé la photo de profil de votre bot.`))
                                .catch(e => {
                                    return message.channel.send(`${message.author}, Une erreur a été rencontré. \n **Plus d'informations:** \`🔻\` \`\`\`${e}\`\`\``);
                                })
                            })
                        }



                    })
                }
        } catch (err) {
            console.log(err)
        }
    }
}
}