const Discord = require('discord.js')
const db = require('quick.db')
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")

module.exports = {
    name: "group",
    run: async (client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.buyer.includes(message.author.id) || client.config.dev.includes(message.author.id)) {

            if (args[0] === "add") {
                let member = client.users.cache.get(message.author.id);
                if (args[1]) {
                    member = client.users.cache.get(args[1]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)

                if (db.get(`groupmd_${client.user.id}_${member.id}`) === member.id) {
                    let owneral = new MessageEmbed()
                    owneral.setColor(color)
                    owneral.setDescription(`${member.username} est déja dans le groupe`)
                    owneral.setFooter({text: `LuminaBots ${client.config.version}`})
                    message.channel.send({ embeds : [owneral]})
                } else {
                    db.set(`groupmd_${client.user.id}_${member.id}`, true)
                  
                    let ownera = new MessageEmbed()
                    ownera.setColor(color)
                    ownera.setDescription(`${member.username} a été ajouté dans le groupe`)
                    ownera.setFooter({text: `LuminaBots ${client.config.version}`})
                    message.channel.send({ embeds : [ownera]})

                    let add = new MessageEmbed()
                    add.setColor(color)
                    add.setDescription(`☑ **${member.username}** vient d'être ajouté au groupe par ${message.author.username}`)
                    add.setFooter({text: `LuminaBots ${client.config.version}`})
                    let desti = db.all().filter(data => data.ID.startsWith(`groupmd_${client.user.id}`)).sort((a, b) => b.data - a.data)
                    desti.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
                      client.users.cache.get(m.ID.split('_')[2]).send({embeds: [add]})
                    })
                }
             } else if (args[0] === "remove") {
                let member = client.users.cache.get(message.author.id);
                if (args[1]) {
                    member = client.users.cache.get(args[1]);
                } else {
                    return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)

                }
                if (message.mentions.members.first()) {
                    member = client.users.cache.get(message.mentions.members.first().id);
                }
                if (!member) return message.channel.send(`Aucun membre trouvé pour \`${args[1] || "rien"}\``)

                if (db.get(`groupmd_${client.user.id}_${member.id}`) === null) {
                    let owneral = new MessageEmbed()
                    owneral.setColor(color)
                    owneral.setDescription(`${member.username} n'est pas dans le groupe`)
                    owneral.setFooter({text: `LuminaBots ${client.config.version}`})
                    message.channel.send({ embeds : [owneral]})
                } else {
                    db.delete(`groupmd_${client.user.id}_${member.id}`)
                  
                    let ownera = new MessageEmbed()
                    ownera.setColor(color)
                    ownera.setDescription(`${member.username} a été retiré du groupe`)
                    ownera.setFooter({text: `LuminaBots ${client.config.version}`})
                    message.channel.send({ embeds : [ownera]})
                    
                    let remove = new MessageEmbed()
                    remove.setColor(color)
                    remove.setDescription(`☑ **${member.username}** vient d'être retiré du groupe par ${message.author.username}`)
                    remove.setFooter({text: `LuminaBots ${client.config.version}`})
                    let desti = db.all().filter(data => data.ID.startsWith(`groupmd_${client.user.id}`)).sort((a, b) => b.data - a.data)
                    desti.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
                      client.users.cache.get(m.ID.split('_')[2]).send({embeds: [remove]})
                    })
                }
            }
                else if(args [0] === "call") {
                    let desti = await db.all()
                    .filter(data => data.ID.startsWith(`groupmd_${client.user.id}`))
                    .map(m => m.ID.split('_')[2]); // Extraire les IDs des membres
                  

                    
                    let guild = message.guild;
                    const channel = await guild.channels.create('Appel Privé Du Groupe', {
                        type: 'GUILD_VOICE',
                        permissionOverwrites: [
                            {
                                id: guild.id,
                                deny: ['VIEW_CHANNEL']
                            }
                        ]
                    })
                    desti.forEach(memberID => {
                        const member = guild.members.cache.get(memberID);
                        if (member) {
                          channel.permissionOverwrites.create(memberID, {
                            VIEW_CHANNEL: true
                          });
                        }
                    })
                    // cree un lien en direction du channel 
                    const invite = await channel.createInvite({
                        maxAge: 0,
                        maxUses: 0,
                        unique: false
                    })
                
                    let joinc = new MessageEmbed()
                    joinc.setColor(color)
                    joinc.setDescription(`${message.author.username} est entrain d'appeler le groupe pour rejoindre l'appel [\`Clique ici\`](${invite})`)
                    joinc.setFooter({text: `LuminaBots ${client.config.version}`})
                    let destim = db.all().filter(data => data.ID.startsWith(`groupmd_${client.user.id}`)).sort((a, b) => b.data - a.data)
                    destim.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
                        client.users.cache.get(m.ID.split('_')[2]).send({embeds: [joinc]})

                   
                    })

                 
            
                    setTimeout(async () => {
                        await channel.delete();
                        let calle = new MessageEmbed()
                        calle.setColor(color)
                        calle.setDescription(`L'appel lancé par ${message.author.username} vient de se terminer`)
                        calle.setFooter({text: `LuminaBots ${client.config.version}`})
                        let desti = db.all().filter(data => data.ID.startsWith(`groupmd_${client.user.id}`)).sort((a, b) => b.data - a.data)
                        desti.filter(x => client.users.cache.get(x.ID.split('_')[2])).map((m, i) => {
                            client.users.cache.get(m.ID.split('_')[2]).send({embeds: [calle]})
    
                       
                        })
                    }, 10 * 60 * 1000);
                
                    

                
                


            } else if (!args[0]) {

                let members = db.all()
      .filter(data => data.ID.startsWith(`groupmd_${message.client.user.id}`))
      .map(data => ({
        id: data.ID.split('_')[2],
        name: message.client.users.cache.get(data.ID.split('_')[2]).username
      }));

    // Créer un embed avec la liste des membres
    const embed = new Discord.MessageEmbed()
      .setTitle(`Liste des membres du groupe`)
      .setDescription(members.map(m => `<@${m.id}> - ${m.name}`).join('\n'))
      .setColor(color)
                .setFooter({ text: `LuminaBots ${client.config.version}` })
                message.channel.send({ embeds: [embed] })

            }
            }

        }
    }
