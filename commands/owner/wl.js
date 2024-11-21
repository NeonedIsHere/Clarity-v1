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
const wl = new db.table("Whitelist")
const cl = new db.table("Color")
module.exports = {
    name: 'wl',
    aliases: [],
    run: async (client, message, args) => {
   
 
        
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
       
          

            try {

                let color = cl.fetch(`color_${message.guild.id}`)
                if (color == null) color = client.config.color
                const embed = new MessageEmbed()
                .setTitle(`${client.user.username} Whitelist`)
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })

                let menuoptions = new MessageSelectMenu()
                .setCustomId('MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: "Wl un membre",
                        value: "wladd",
                        emoji: "💫"
                    },
                    {
                        label: "Unwl un membre",
                        value: `wlremove`,
                        emoji: "🚫",
                    },
                    {
                        label: 'Wl liste',
                        value: `wllist`,
                        emoji: "➰",
                    },
                    {
                        label: "Wl voc un membre",
                        value: "wlv",
                        emoji: "➕",
                    },
                    {
                        label: 'Unwl voc un membre',
                        value: "unwlv",
                        emoji: '➖',
                    },
                    {
                        label :"Wlvoc Liste",
                        value: "wlvl",
                        emoji: "➗",
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

                    if (i.values[0] == "wladd") {
                        const ez = await message.channel.send(`Qui dois je add a la wl ? (id) ?`)
                        let collected = await message.channel.awaitMessages({
                            filter: filter2,
                            max: 1,
                            time: 60000,
                            errors: ["time"]
                        }).then(collected => {

                          
                            var msg = collected.first();

                            const member = message.mentions.members.first() || message.guild.members.cache.get(msg.content)

                            if (!member) return message.channel.send(`Aucun membre trouvé pour \`${msg.content || "rien"}\``)

                            if (wl.get(`${member.id}.wl`) === member.id) { return message.channel.send(`${member.username} est déjà whitelist`) }
                            wl.set(`${message.guild.id}.${member.id}.wl`, member.id)
                            msg.channel.send(`<@${member.id}> est maintenant whitelist`)
                            ez.delete()
                            collected.first().delete()


                            
                            
                    })
                }

                if (i.values[0] == "wllist"){
                  
                let list = message.guild.members.cache.filter(u => wl.get(`${message.guild.id}.${u.id}.wl`) === u.id).map(a => "<@" + a.user.id + ">")

                const embed = new Discord.MessageEmbed()
                    .setTitle("Liste des whitelist")
                    .setDescription(list.join("\n"))
                    .setColor(color)
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                message.channel.send({ embeds: [embed] })
                }

                if (i.values[0] == "wlremove") {
                    const ez = await message.channel.send(`Qui dois je enlever de la wl ? (id) ?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {

                      
                        var msg = collected.first();

                        const member = client.users.cache.get(msg.content);

                        if (!member) return message.channel.send(`Aucun membre trouvé pour \`${msg.content || "rien"}\``)

                        if (!wl.get(`${message.guild.id}.${member.id}.wl`) === null) { return message.channel.send(`${member.username} n'est pas whitelist`) }
                        wl.set(`${message.guild.id}.${member.id}.wl`, false)
                      
                        msg.channel.send(`<@${member.id}> est maintenant unwhitelist`)
                        ez.delete()
                        collected.first().delete()


                        
                        
                })
                }

                if (i.values[0] == "wlv") {
                    const ez = await message.channel.send(`Qui dois je add a la wlvoc ? (id) ?`)
                    let collected = await message.channel.awaitMessages({
                        filter: filter2,
                        max: 1,
                        time: 60000,
                        errors: ["time"]
                    }).then(collected => {

                      
                        var msg = collected.first();

                        const member = client.users.cache.get(msg.content);

                        if (!member) return message.channel.send(`Aucun membre trouvé pour \`${msg.content || "rien"}\``)

                        if (wl.get(`${message.guild.id}.${member.id}.vl`) === true) { return message.channel.send(`${member.username} est déjà wl voc`) }
                wl.add(`${message.guild.id}.vlcount`, 1)
                wl.push(`${message.guild.id}.vl`, member.id)
                wl.set(`${message.guild.id}.${member.id}.vl`, member.id)

                message.channel.send(`${member.username} est maintenant dans la wl voc`)
                        ez.delete()
                        collected.first().delete()

                })
            }

            if (i.values[0] == "unwlv") {
                const ez = await message.channel.send(`Qui dois je add a la blvoc ? ( id) ?`)
                let collected = await message.channel.awaitMessages({
                    filter: filter2,
                    max: 1,
                    time: 60000,
                    errors: ["time"]
                }).then(collected => {

                  
                    var msg = collected.first();

                    const member = client.users.cache.get(msg.content);

                    if (wl.get(`${message.guild.id}.${member.id}.vl`) === null) { return message.channel.send(`${member.username} n'est pas wl voc`) }
                    wl.subtract(`${message.guild.id}.vlcount`, 1)
                    wl.delete(`${message.guild.id}.${member.id}.vl`, member.id)
                    message.channel.send(`${member.username} n'est plus wl voc`)
                    ez.delete()
                    collected.first().delete()

            })
        }
                if (i.values[0] == "wlvl"){
                    let own = wl.get(`${message.guild.id}.vl`)
                    let ownc = wl.get(`${message.guild.id}.vlcount`)
                    if (ownc === null || "Nan") ownc = 1
                    let p0 = 0;
                    let p1 = 30;
                    let page = 1;
    
                    let embed = new Discord.MessageEmbed()
                    embed.setTitle("Wl voc")
                        .setColor(color)
                        .setDescription(!own ? "Aucun" : own.map((user, i) => `<@${user}>`).slice(0, 30).join("\n")
                        )
                        .setFooter({ text: `LuminaBots ${client.config.version}`  })
                    message.channel.send({ embeds: [embed] })
                }

                })
            }catch (err) {
            console.log(err)
        }

        } else {
            return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")

            
        }

        
    }
    }
 