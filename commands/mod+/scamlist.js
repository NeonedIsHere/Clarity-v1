const Discord = require('discord.js')
const db = require('quick.db')
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const owner = new db.table("Owner")
const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const cl = new db.table("Color")
module.exports = {
    name: 'scamlist',
    aliases: [],
    description:"permet d\'ajouter, de supprimer ou de lister des utilisateurs dans une liste noire.",
    run: async (client, message, args, prefix) => {

  let color = cl.fetch(`color_${message.guild.id}`)

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) ) {


            try {

                const embed = new MessageEmbed()
                .setTitle(`${client.user.username} Scamlist`)
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })

                let menuoptions = new MessageSelectMenu()
                .setCustomId('MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: "Add un membre a la scamlist",
                        value: "sladd",
                        emoji: "⛔"
                    },
                    {
                        label: "Enlever un membre de la scamlist",
                        value: `slremove`,
                        emoji: "🚫",
                    },
                    {
                        label: 'Sl liste',
                        value: `sllist`,
                        emoji: "➰",
                    },
                    {
                        label: "Annulé",
                        value: "cancel",
                        emoji: "❌",
                    },

                ])


                const menumsg = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })

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

                col.on("collect", async (i) => {
                    if (i.values[0] == "cancel") {
                        menumsg.delete()
                    }

                    if (i.values[0] == "sladd") {
                        const ez = await message.channel.send(`Qui dois je add a la sl ? (id) ?`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        }).then(collected => {


                            var msg = collected.first();

                            const member = message.mentions.members.first() || message.guild.members.cache.get(msg.content)

                            if (!member) return message.channel.send(`Aucun membre trouvé pour \`${msg.content || "rien"}\``)

                            if (db.get(`scamlist.${member.id}`) === member.id) { return message.channel.send(`${member.username} est déjà dans la scamlist`) }
                            db.push(`${client.user.id}.scamlist`, member.id)
                            db.set(`scamlist.${member.id}`, member.id)
                            member.kick(`scamlist`)
                            msg.channel.send(`<@${member.id}> est maintenant ajouté a la scamlist`)
                            ez.delete()
                            collected.first().delete()




                    })
                }

                if (i.values[0] == "sllist"){
                    let own = db.get(`${client.user.id}.scamlist`)
                let p0 = 0;
                let p1 = 30;
                let page = 1;

                let embed = new Discord.MessageEmbed()
                    .setTitle("Scamlist")
                    .setColor(color)
                    .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n"))
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                message.channel.send({ embeds: [embed] })
                }

                if (i.values[0] == "slremove") {
                    const ez = await message.channel.send(`Qui dois je enlever de la bl ? (id) ?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {


                        var msg = collected.first();

                        const member = client.users.cache.get(msg.content);

                        if (!member) return message.channel.send(`Aucun membre trouvé pour \`${msg.content || "rien"}\``)

                        if (db.get(`scamlist.${member.id}`) === null) { return message.channel.send(`${member.username} n'est pas dans la scamlist`) }
                        db.set(`${client.user.id}.scamlist`, db.get(`${client.user.id}.scamlist`).filter(s => s !== member.id))
                        db.delete(`scamlist.${member.id}`, member.id)

                        msg.channel.send(`<@${member.id}> est maintenant enlever de la scamlist`)
                        ez.delete()
                        collected.first().delete()




                })
                }



                })
            }catch (err) {
            console.log(err)
        }

        }
    }
    }
