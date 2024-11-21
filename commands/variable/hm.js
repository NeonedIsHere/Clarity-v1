const Discord = require("discord.js")
const db = require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name: "hm",
    description:"fournir des exemples de messages simples pour personnaliser les messages d'accueil ou de départ des membres",
    run : async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
       

            const premiumTier = {
                NONE: 0,
                TIER_1: 1,
                TIER_2: 2,
                TIER_3: 3,
            };

            const embed = new Discord.MessageEmbed()
                .setTitle(`Arguments de messages`)
                .setDescription(`Exemple de message simple: \`{MemberMention} nous a rejoint,  nous sommes maintenant {MemberCount} sur {Server}\``)
                .addFields(
                    { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Funny`'},
                    { name: '{MemberMention}', value: `Mentionne le membre concerné\n\`Exemple:\` <@${message.author.id}>`},
                    { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Funny#0666`'},
                )
                .addFields(
                    { name: '{MemberID}', value: `L'ID du membre concerné\n\`Exemple: ${message.author.id}\``},
                    { name: '{MemberCount}', value: `Le nombre total de membres sur le serveurn\n\`Exemple: ${message.guild.memberCount}\``},
                    { name: '{Server}', value: `Le nom du serveur\n\`Exemple: ${message.guild.name}\``},
                )
                .addFields(
                    { name: '{ServerBoostsCount}', value: `Le nombre de boost du serveur\n\`Exemple: ${message.guild.premiumSubscriptionCount || '0'}\``},
                    { name: '{ServerLevel}', value: `Le niveau actuel du serveur\n\`Exemple: ${premiumTier[message.guild.premiumTier]}\``},
                    { name: '{VocalMembersCount}', value: `Le nombre total de membres en vocal sur le serveur\n\`Exemple: ${message.guild.members.cache.filter(m => m.voice.channel).size}\``},
                )
                .addFields(
                    { name: '{OnlineMembersCount}', value: `Le nombre total de membres en ligne sur le serveur\n\`Exemple: ${message.guild.presences.cache.filter((presence) => presence.status !== "offline").size}\``},
                )
                .setColor(color)
                .setFooter({text: client.config.footer })

            message.channel.send({ embeds: [embed] })
            return
        
    }
}