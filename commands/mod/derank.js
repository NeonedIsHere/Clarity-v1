const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const ml = new db.table("modlog")
module.exports = {
    name: 'derank',
    aliases: [],
    description:"permet à certains utilisateurs autorisés de retirer tous les rôles d'un membre",

    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ content: " Vous n'avez pas les permissions utiliser cette commande - [ADMINISTRATOR]" });
            let user = await client.users.cache.get(args[0]) || message.mentions.members.first() 
            async function checkperm(user) {
                if (user.permissions.has("ADMINISTRATOR") || user.permissions.has("MANAGE_GUILD") || user.permissions.has("BAN_MEMBERS") || user.permissions.has("KICK_MEMBERS") || 
                user.permissions.has("MANAGE_ROLES") || user.permissions.has("VIEW_AUDIT_LOG") || user.permissions.has("MANAGE_MESSAGES") || user.permissions.has("MANAGE_NICKNAMES") || user.permissions.has("MANAGE_EMOJIS") 
                || user.permissions.has("MANAGE_WEBHOOKS") || user.permissions.has("MANAGE_CHANNELS") || user.permissions.has("MANAGE_NICKNAMES") || user.permissions.has("MENTION_EVERYONE") || user.permissions.has("MUTE_MEMBERS") || user.permissions.has("DEAFEN_MEMBERS") || user.permissions("MOVE_MEMBERS")
                || user.permissions.has("MANAGE_STICKERS")
                ) {
                    return true
                } else {
                    return false
                }
            }

            async function derank(x, y) {
                let guild = client.guilds.cache.get(x)
                let member = guild.members.cache.get(y)
                let bot = guild.members.cache.get(client.user.id)

                if (bot.roles.highest.position >= member.roles.highest.position) {
                    member.roles.cache.forEach(async (role) => {
                        if (role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("KICK_MEMBERS") || role.permissions.has("MANAGE_ROLES") || role.permissions.has("VIEW_AUDIT_LOG") || role.permissions.has("MANAGE_MESSAGES")
                        || role.permissions.has("MANAGE_NICKNAMES") || role.permissions.has("MANAGE_EMOJIS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MUTE_MEMBERS") || 
                        role.permissions.has("DEAFEN_MEMBERS") || role.permissions.has("MOVE_MEMBERS") || role.permissions.has("MANAGE_STICKERS") || role.permissions.has("MUTE_MEMBERS")
                        
                        ) {
                            member.roles.remove(role.id).catch(async err => {})
                        }
                    })
                }
            }
                
            if(args[0]) {
                let user = await client.users.cache.get(args[0]) || message.mentions.members.first()  
                if(!user) return message.channel.send({ content: `Aucun membre trouvée pour: \`${args[0]}\`` })
        if(user) {
            if (user.id === message.author.id) {
                return message.channel.send({ content: `Vous n'avez pas la permission de **derank** <@${user.id}>` });
              }
              if(user.roles.highest.position > client.user.id) return message.channel.send({ content: `Je n'ai pas les permissions nécessaires pour **derank** <@${user.id}>` });
              if( db.get(`ownermd.${message.author.id}`) === true) return message.channel.send({ content: `Vous n'avez pas la permission de **derank** <@${user.id}>` });
              if(client.config.owner.includes(user.id)) return message.channel.send({ content: `Vous n'avez pas la permission de **derank** <@${user.id}>` });
          
        
        
        
             
             checkperm(user)? derank(user.id, message.author.id) 
             : message.channel.send({ content: `${user} à été **derank**` });
                const channellogs = ml.get(`${message.guild.id}.modlog`)
              
            let log = new Discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setColor(color)
          .setTitle(`Modération • Type: **\`derank\`**`)
           //     .setTimestamp() 
             .setDescription(`**Derank de**: ${user}\n**Auteur**: ${message.author}\n**Temps de réponse**: ${client.ws.ping}ms`)
             .setFooter(` LuminaBots ${client.config.version}` )

             client.channels.cache.get(channellogs).send({ embeds: [log] }).catch(console.error)
          
             
        }}

        }
    }
