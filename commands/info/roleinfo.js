const Discord = require('discord.js')
const db = require('quick.db')
const cl = new db.table("Color")

module.exports = {
    name: 'roleinfo',
    aliases: ['ri'],
    description: 'role <rôle>',
    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let perm = ""
        message.member.roles.cache.forEach(role => {
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || db.get(`ownermd.${message.author.id}`) === true || perm) { 
       

                function roleperm(role) {
                    if (role.permissions.has("ADMINISTRATOR")) {
                        return `Administrateur`
                    } else {
                        return role.permissions.toArray().map(p =>
                            p.replace("CREATE_INSTANT_INVITE", "Cree un lien d invitation")
                                .replace("MENTION_EVERYONE", `Mentionner @everyone, @here et tous les rôles\n`)
                                .replace("MANAGE_ROLES", `Gérer les rôles\n`)
                                .replace("MANAGE_WEBHOOKS", `Gérer les webhooks\n`)
                                .replace("MANAGE_EMOJIS_AND_STICKERS", "Gerer les emojis et les stickers\n")
                                .replace("MANAGE_EMOJIS", `Gérer les émojis\n`)
                                .replace("ADMINISTRATOR", `Administrateur\n`)
                                .replace("KICK_MEMBERS", `Expulser des membres\n`)
                                .replace("BAN_MEMBERS", `Bannir des membres\n`)
                                .replace("MANAGE_CHANNELS", `Gérer les salons\n`)
                                .replace("MANAGE_GUILD", `Gérer le serveur\n`)
                                .replace("ADD_REACTIONS", "Ajouter des réactions\n")
                                .replace("VIEW_AUDIT_LOG", "Voir les audits logs\n")
                                .replace("PRIORITY_SPEAKER", "Voix prioritaire\n")
                                .replace("STREAM", "Stream\n")
                                .replace("VIEW_CHANNEL", "Voir les channels\n")
                                .replace("SEND_MESSAGES_IN_THREADS", "Envoyer des messages dans les fils\n")
                                .replace("MANAGE_THREADS", "Gerer les fils\n")
                                .replace("MANAGE_EVENTS", "Gerer les evenements\n")
                                .replace("MODERATE_MEMBERS", "Modérer les membres\n")
                                .replace("SEND_MESSAGES", "Envoyer des messages\n")
                                .replace("SEND_TTS_MESSAGES", "Envoyer des messages tts\n")
                                .replace("MANAGE_MESSAGES", "Gérer les messages\n")
                                .replace("EMBED_LINKS", "Lien d embed\n")
                                .replace("ATTACH_FILES", "Envoyer des fichiers\n")
                                .replace("READ_MESSAGE_HISTORY", "Voir l'historique des messages\n")
                                .replace("USE_EXTERNAL_EMOJIS", "Utiliser des emojis externes\n")
                                .replace("VIEW_GUILD_INSIGHTS", "Voir les insights du serv\n")
                                .replace("CONNECT", "Se connecter\n")
                                .replace("SPEAK", "Parler\n")
                                .replace("MUTE_MEMBERS", "Mute des membres")
                                .replace("DEAFEN_MEMBERS", "Couper le son des membres\n")
                                .replace("MOVE_MEMBERS", "Move des membres")
                                .replace("USE_VAD", "Utiliser l'activité vocale\n")
                                .replace("CHANGE_NICKNAME", "Changer de pseudo")
                                .replace("MANAGE_NICKNAMES", "Gerer les pseudos")
                                .replace("USE_APPLICATION_COMMANDS", "Utiliser les commandes d application\n")
                                .replace("REQUEST_TO_Parler", "Demander le droit de parler\n")
                                .replace("USE_PUBLIC_THREADS", "Utiliser les fils publics\n")
                                .replace("CREATE_PUBLIC_THREADS", "Crée des fils publics\n")
                                .replace("USE_PRIVATE_THREADS", "Utiliser les fils privés\n")
                                .replace("CREATE_PRIVATE_THREADS", "Cree des fils privés\n")
                                .replace("USE_EXTERNAL_STICKERS", "Utiliser des stickers externes\n")
                                .replace("START_EMBEDDED_ACTIVITIES", "Commencer des activités\n")
                                .replace(",", "")).join(" ")
                    }
                }

                const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

                let roleEmbed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle(role.name)
                    .addField("Nom ", `<@&${role.id}>`)
                    .addField("Membres possédant le rôle", `${role.members.size}`)
                    .addField("Couleur", `${role.hexColor === "#000000" ? "Classique" : role.hexColor}`)
                    .addField("ID", `${role.id}`)
                    .addField("Affiché séparément", `${role.hoist ? "Oui" : "Non"}`)
                    .addField("Mentionable", `${role.mentionable ? "Oui" : "Non"}`)
                    .addField("Géré par une intégration", `${role.managed ? "Oui" : "Non"}`)
                    .addField("Permissions principales", `${roleperm(role)}`)
                    .addField(`Création du rôle`, `<t:${Date.parse(role.createdAt) / 1000}:d> (<t:${Date.parse(role.createdAt) / 1000}:f>)`)
                    .setFooter(`LuminaBots ${client.config.version}` )
                    //.setTimestamp(role.createdAt);

                message.channel.send({ embeds: [roleEmbed] })

        
    }
    }
}  