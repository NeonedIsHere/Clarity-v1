const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const ml = new db.table("modlog")
const pgs = new db.table("PermGs")
const cl = new db.table("Color")
module.exports = {
    name: 'delrole',
    aliases: [],
    description:"permet de supprimer un rôle à un utilisateur",
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
   
        if (!args[0]) return message

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
       
            let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!rMember) return

            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

            if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)

            if (rMember.roles.highest.position > client.user.id) return message.channel.send(`1 rôle supprimer à 0 membre car son rôle est au dessus du mien`)


           await rMember.roles.remove(role).then(() => {
            message.channel.send(`1 rôle supprimer à ${rMember}.`)
           });

            

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`➕ <@${message.author.id}> à utilisé la commande \`delrole\` sur ${rMember}\nRole supprimer : ${role}`)
                .setTimestamp()
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
            client.channels.cache.get(db.get(`modlog_${message.guild.id}`)).send({ embeds: [embed] }).catch(console.error)


        } else if (message.member.roles.cache.has(pgs.get(`permgs_${message.guild.id}`)) === true) {
            {

                let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
                if (!rMember) return



                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])


                if (!role) return message.channel.send(`Aucun rôle trouvé pour \`${args[1] || "rien"}\``)
                if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
                    return message.channel.send("1 rôle n'a pas pu être supprimer car il a des permissions dangereuses")
                }

                if (rMember.roles.highest.position > client.user.id) return message.channel.send(`1 rôle supprimer à 0 membre car son rôle est au dessus du mien`)


                await rMember.roles.remove(role).then(() => {
                    message.channel.send(`1 rôle supprimer à ${rMember}.`)
                   });
        

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`➕ <@${message.author.id}> à utilisé la commande \`delrole\` sur ${rMember}\nRole supprimer : ${role}`)
                    .setTimestamp()
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })


                client.channels.cache.get(db.get(`modlog_${message.guild.id}`)).send({ embeds: [embed] }).catch(console.error)

            }
        }

}
} 