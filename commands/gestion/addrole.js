const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const ml = new db.table("modlog")
const pgs = new db.table("PermGs")
const cl = new db.table("Color")
const { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'addrole',
    aliases: [],
    description: "permet aux propriétaires de serveurs, aux acheteurs désignés ou à des membres spécifiques d'ajouter un rôle à un utilisateur cible",
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
   
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
       
            let options = new MessageSelectMenu()
            options.setCustomId('addrole')
            options.setPlaceholder('Sélectionner une options')
            options.addOptions([
                {
                    label: 'Rôle à ajouté',
                    description: 'Ajouter un rôle',
                    value: 'add'
                }, {
                    label: 'Cible',
                    description: 'Cible',
                    value: 'cible'
                }
            ])

            const actionRow = new MessageActionRow()
            actionRow.addComponents(options)

            let confirm = new MessageButton()
            confirm.setCustomId('confirm')
            confirm.setLabel('Ajouter le rôle')
            confirm.setStyle('SUCCESS')
            confirm.setEmoji('✅')

            const cancel = new MessageButton()
            cancel.setCustomId('cancel')
            cancel.setLabel('Annuler')
            cancel.setStyle('DANGER')
            cancel.setEmoji('❌')

            const row = new MessageActionRow()
            row.addComponents(confirm, cancel)
            
            let embed = new MessageEmbed()
            embed.setColor(color)
            embed.setDescription('Que souhaitez-vous faire ?')

            let initialMSG = await message.channel.send({
                embeds: [embed],
                components: [actionRow, row]
            });

           
            let user = db.get(`auser_${message.guild.id}`)
            let confE = new MessageEmbed()
            confE.setColor(color)
            confE.setDescription(`Rôle à ajouté: ${message.guild.roles.cache.get(db.get(`arole_${message.guild.id}`))} \n Cible: <@${user}>`)

            let confMsg = await message.channel.send({
                embeds: [confE]
            })
            let collector = message.channel.createMessageComponentCollector({
                componentType: "SELECT_MENU",
            });

            const collectorx = message.channel.createMessageComponentCollector({});

            collector.on('collect', async (i) => {
                if (i.user.id !== message.author.id) return i.reply({content: "Vous ne pouvez pas utiliser ce menu", ephemeral: true})
                i.deferUpdate()

                if(i.customId === 'addrole') {
                    if(i.values[0] === 'cible') {
                    let question = await message.channel.send({content: "Qui est le membre à qui va être ajouté le rôle", ephemeral: true})
                    const filter = m => message.author.id === m.author.id;
                    i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                        cld.delete()
                        question.delete()
                        let msg = cld.first()
                       let member = msg.mentions.members.first() || message.guild.members.cache.get(msg.content)
                        if(!member) return message.channel.send({content: "Le membre n'est pas dans le serveur", ephemeral: true})
                        
                        db.set(`auser_${message.guild.id}`, member.id)

                        let role = db.get(`arole_${message.guild.id}`)
            let user = db.get(`auser_${message.guild.id}`)
            let confE = new MessageEmbed()
            confE.setColor(color)
            confE.setDescription(`Rôle à ajouté: ${message.guild.roles.cache.get(db.get(`arole_${message.guild.id}`))} \n Cible: <@${user}>`)

            confMsg.edit({embeds: [confE]})
                        
                    })
                }

                if(i.values[0] === 'add') {
                    let question = await message.channel.send({content: "Quel est le rôle qui sera ajouté", ephemeral: true})
                    const filter = m => message.author.id === m.author.id;
                    i.channel.awaitMessages({filter, max: 1, time: 1000 * 10 * 6, errors: ['time']}).then(cld => {
                        cld.delete()
                        question.delete()
                       let msg = cld.first()
                       
                        let urole = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                        if(!urole) return message.channel.send({content: "Le rôle n'est pas dans le serveur", ephemeral: true})
                        
                        db.set(`arole_${message.guild.id}`, urole.id)
                        let role = db.get(`arole_${message.guild.id}`)
                        let user = db.get(`auser_${message.guild.id}`)

                        let confE = new MessageEmbed()
                        confE.setColor(color)
                        confE.setDescription(`Rôle à ajouté: ${message.guild.roles.cache.get(db.get(`arole_${message.guild.id}`))} \n Cible: <@${user}>`)
                            
                        confMsg.edit({embeds: [confE]})
                    })
                }
                

            }
        })
            

            collectorx.on('collect', async (i) => {
                if (i.user.id !== message.author.id) return message.channel.send({content: 'Vous ne pouvez pas utiliser ce bouton.', ephemeral: true})
                i.deferUpdate()
                if(i.customId === 'cancel') {
                    await initialMSG.edit({
                        components: []
                        
                    });
                    return message.channel.send({
                        content: 'Aucun rôle ajouté.',
                        ephemeral: true
                    });
                }
                if(i.customId === 'confirm') {
                    let rMember = message.guild.members.cache.get(db.get(`auser_${message.guild.id}`))
                    if(!rMember) return message.channel.send({content: "Le membre n'est pas dans le serveur", ephemeral: true})
                    let role = db.get(`arole_${message.guild.id}`)
                    if(!role) return message.channel.send({content: "Le rôle n'est pas dans le serveur", ephemeral: true})
                    if(rMember.roles.cache.has(role)) return message.channel.send({content: "Le rôle est déjà ajouté", ephemeral: true})
                    rMember.roles.add(role)
                     const addE = new Discord.MessageEmbed()
                     addE.setColor(color)
                     addE.setDescription(`
                     Membre : ${rMember}\n
                     Role ajouté : ${message.guild.roles.cache.get(db.get(`arole_${message.guild.id}`))}\n
                     Role ajouté par : <@${message.author.id}>\n
                     Photo de profil du membre : `)
                     addE.setImage(rMember.user.displayAvatarURL({ dynamic: true }))
                     addE.setTimestamp()
                     addE.setFooter({ text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL({ dynamic: true }) })
         
                     message.channel.send({embeds: [addE]})
                }

            })


        } 

}
}  