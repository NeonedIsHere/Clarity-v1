const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: 'say',
    description:"permet d\'envoyer un message en embed / ou pas de n\'importe où dans un salon désigné avec le bot",
    run: async(client, message, args) => {
        message.delete();
        
        if(client.config.owner.includes(message.author.id) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            
            let selectedChannel = db.get(`saychan.${message.guild.id}`) || message.channel;
            let isEmbed = db.get(`sayembed.${message.guild.id}`);
            let tosay = db.get(`saymsg.${message.guild.id}`);

            function updateembed(msg){
                let configembed = new MessageEmbed() 
                    .addFields({
                        name: 'Channel',
                        value: `${db.get(`saychan.${message.guild.id}`) && message.guild.channels.cache.get(db.get(`saychan.${message.guild.id}`)) ? `${message.guild.channels.cache.get(db.get(`saychan.${message.guild.id}`))} (${db.get(`saychan.${message.guild.id}`)})` : 'Non Paramétré'}`,
                        inline: true
                    },{
                        name: 'Message',
                        value: `${db.get(`saymsg.${message.guild.id}`) ? `${db.get(`saymsg.${message.guild.id}`)}` : "Non Paramétré" }`,
                    },{
                        name: 'Type',
                        value: `${db.get(`sayembed.${message.guild.id}`) ? "Embed" : "Texte"}`,
                    })
                msg.edit({embeds: [configembed]})
            }

            const channelRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('channelSelect')
                        .setLabel('Sélectionner un canal')
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setCustomId("messageSelect")
                        .setLabel("Modifier le message")
                        .setStyle("PRIMARY")
                );
            
            const typeRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('textSelect')
                        .setLabel('Texte')
                        .setStyle('SECONDARY'),
                    new MessageButton()
                        .setCustomId('embedSelect')
                        .setLabel('Embed')
                        .setStyle('SECONDARY'),
                );
            
            const sendRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('sendButton')
                        .setLabel('Envoyer')
                        .setStyle('SUCCESS')
                );
            
                        
            let configembed = new MessageEmbed() 
            .addFields({
                name: 'Channel',
                value: `${selectedChannel && message.guild.channels.cache.get(selectedChannel) ? `${message.guild.channels.cache.get(selectedChannel)} (${selectedChannel})` : "Non Paramétré"}`,
            },{
                name: 'Message',
                value: `${tosay ? tosay : "Non paramétré"}`,
            },{
                name: 'Type',
                value: `${isEmbed ? "Embed" : "Texte"}`,
            })

            let cmsg = await message.channel.send({content: 'Config du message a envoyer avec la commande say', embeds: [configembed], components: [channelRow, typeRow, sendRow]})
            const collector = message.channel.createMessageComponentCollector({});
            

            collector.on('collect', async (interaction) => {
                interaction.deferUpdate();
                if (interaction.user.id !== message.author.id) return interaction.reply({content: "Vous ne pouvez pas cliquer sur ce bouton", ephemeral: true})
                if (interaction.customId === 'channelSelect') {
                    const question = await interaction.channel.send("Dans quel salon dois-je envoyer le message ?")
                    const filter = m => m.author.id === message.author.id
                    interaction.channel.awaitMessages({ filter, max: 1, time: 1000 * 60, errors: ['time'] }).then(async collected => {
                        const reponse = collected.first()
                        const channel = reponse.mentions.channels.first() || await reponse.guild.channels.fetch(reponse.content).catch(() => reponse.delete().catch(() => false) && question.delete().catch(() => false) && message.channel.send("Salon invalide").then((m) => setTimeout(() => m.delete().catch(() => false) && collector.stop(), 5000)))
                        selectedChannel = message.guild.channels.cache.get(channel.id);
                        question.delete().catch(() => false)
                        reponse.delete().catch(() => false)
                        message.channel.send(`Le message sera envoyé dans le salon <#${channel.id}>`).then((m) => setTimeout(() => m.delete().catch(() => false), 5000))
                        db.set(`saychan.${message.guild.id}`, channel.id)
                        updateembed(cmsg)
                    })
                    /*.catch(() => {
                        interaction.channel.send("Aucune réponse d'envoyée..").then((m) => setTimeout(() => m.delete().catch(() => false), 5000))
                    })*/    
                
            
                
                    
                    
                } else if (interaction.customId === "messageSelect"){
                    const question = await interaction.channel.send("Quel est le message à envoyer ?")
                    const filter = m => m.author.id === message.author.id
                    interaction.channel.awaitMessages({ filter, max: 1, time: 1000 * 60, errors: ['time'] }).then(async collected => {
                    const reponse = collected.first()
                    if (!reponse) return message.channel.send("Aucun message d'envoyer").then((m) => setTimeout(() => m.delete().catch(() => false), 3500))
                    db.set(`saymsg.${message.guild.id}`, reponse.content)
                    question.delete().catch(() => false)
                    reponse.delete().catch(() => false)
                    updateembed(cmsg)
                })
                
                } else if (interaction.customId === 'textSelect') {
                    db.delete(`sayembed.${message.guild.id}`)
                    updateembed(cmsg)
                } else if (interaction.customId === 'embedSelect') {
                    db.set(`sayembed.${message.guild.id}`, true)
                    updateembed(cmsg)
                } else if (interaction.customId === 'sendButton') {
                    if (!db.get(`saymsg.${message.guild.id}`)) {
                        await interaction.reply({ content: `Veuillez saisir un message à envoyer.`, ephemeral: true });
                    } else {
                        if (db.get(`sayembed.${message.guild.id}`) === true) {
                            const saychannel = message.guild.channels.cache.get(db.get(`saychan.${message.guild.id}`))                            
                            if (saychannel) saychannel.send({ embeds: [new MessageEmbed().setDescription(db.get(`saymsg.${message.guild.id}`))] });
                        } else {
                            const saychannel = message.guild.channels.cache.get(db.get(`saychan.${message.guild.id}`))
                            if (saychannel) saychannel.send({content: db.get(`saymsg.${message.guild.id}`)});
                        }
                        await interaction.channel.send({ content: `Le message a été envoyé.`}).then((m) => setTimeout(() => m.delete().catch(() => false), 5000));
                    }
                }
                
            });
            
         
            const filter = user => user.id === message.author.id
            const messageCollector = message.channel.createMessageCollector({ filter, time: 15000 });
            
            messageCollector.on('collect', (msg) => {
                tosay = msg.content;
            });
            
            messageCollector.on('end', async (collected) => {
                if (tosay) {
                    sendRow.components[0].setDisabled(false);
                }
               
            });

        }
    }
}

