const Discord = require("discord.js")
const { Message } = require('discord.js');
const db = require("quick.db")
const owner = new db.table("Owner")
const punish = new db.table("Punition")
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const cl = new db.table("Color")
module.exports = {
   name: "punish",
   description:"Permet de voir les punitions appliquées dans différentes situations",
   aliases: [],
   /**
     * @param {Message} message
    */
    run : async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            let fufu = punish.get(`sanction_${message.guild.id}`)
            if (fufu == null) fufu = "derank"

            const embed = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Punition actuelle : \`${fufu}\``)
                .setColor(color)

            const derank = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`derank\``)
                .setColor(color)

            const kick = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`kick\``)
                .setColor(color)

            const ban = new Discord.MessageEmbed()
                .setTitle(`Punition Raid`)
                .setDescription(`Nouvelle Punition : \`ban\``)
                .setColor(color)

              
            const punition =   new MessageActionRow ()
            .addComponents(
            new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('LuminaBots ${client.config.version}` RaidPunish')
            .addOptions([{
                label: '⚙ Derank',
                description: '',
                value: 'derank'
            }, {
                label: '⚙ Kick',
                description: '',
                value: 'kick'
            }, {
                label: '⚙ Ban',
                description: '',
                value: 'ban'
            }
            
            ])
                )

            message.channel.send({ embeds: [embed], components: [punition] }).then(async msg => {

                const collector = message.channel.createMessageComponentCollector({
                    componentType: "SELECT_MENU"
                })
                collector.on('collect', async (collected)=> {
                    const value = collected.values[0]

                    if (value === "derank") {
                        punish.set(`sanction_${message.guild.id}`, "derank")
                        collected.reply({ content: `La punition en cas de **raid** sera désormais un **derank**`, ephemeral: true })
                        msg.edit({ embeds: [derank] })
                    }

                    else if (value === "kick") {
                        punish.set(`sanction_${message.guild.id}`, "kick")
                        collected.reply({ content: `La punition en cas de **raid** sera désormais un **kick**`, ephemeral: true })
                        msg.edit({ embeds: [kick] })
                    }

                    if (value === "ban") {
                        punish.set(`sanction_${message.guild.id}`, "ban")
                        collected.reply({ content: `La punition en cas de **raid** sera désormais un **ban**`, ephemeral: true })
                        msg.edit({ embeds: [ban] })
                    }

                })
            })
        }
         
    }
}  