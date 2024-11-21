const { MessageEmbed } = require('discord.js');
const permissions = require('../../util/perms.json');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const db = require("quick.db")
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const pgs = new db.table("PermGs")
const pgp = new db.table("PermGp")
const pga = new db.table("PermGa")
const rolestaff = new db.table("Rolestaff")
const cl = new db.table("Color")
module.exports = {
    name: 'perms',
    aliases: [],
    description: '',
    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        const perms1 = {
            KICK_MEMBERS: "Expulser",
            BAN_MEMBERS: "Bannir",
            ADMINISTRATOR: "Administrateur",
            MANAGE_CHANNELS: "Gérer les salons",
            MANAGE_GUILD: "Gérer le serveur",
            ADD_REACTIONS: "Ajouter des réactions",
            VIEW_AUDIT_LOG: "Voir les logs",
            PRIORITY_SPEAKER: "Voix prioritaire",
            STREAM: "Stream",
            VIEW_CHANNEL: "Voir les salons",
            SEND_MESSAGES: "Envoyez des messages",
            SEND_TTS_MESSAGES: "Envoyez des messages TTS",
            MANAGE_MESSAGES: "Gérer les messages",
            EMBED_LINKS: "Envoyez des embeds",
            ATTACH_FILES: "Envoyez des fichiers/images",
            READ_MESSAGE_HISTORY: "Voir les anciens messages",
            MENTION_EVERYONE: "@everyone",
            USE_EXTERNAL_EMOJIS: "Utiliser des emojis externe",
            VIEW_GUILD_INSIGHTS: "Voir les perspectives du serveur",
            CONNECT: "Se connecter",
            SPEAK: "Parler",
            MUTE_MEMBERS: "Mute",
            DEAFEN_MEMBERS: "Déconnecter",
            MOVE_MEMBERS: "Move",
            USE_VAD: "Mute casque",
            CHANGE_NICKNAME: "Changer de pseudonyme",
            MANAGE_NICKNAMES: "Gérer les pseudonymes",
            MANAGE_ROLES: "Gérer les rôles",
            MANAGE_WEBHOOKS: "Gérer les webhooks",
            MANAGE_EMOJIS_AND_STICKERS: "Gérer les emojis/autolocollants",
            USE_APPLICATION_COMMANDS: "Utiliser les slashcommands",
            REQUEST_TO_SPEAK: "Detection de voix",
            MANAGE_EVENTS: "Gérer les évènements",
            MANAGE_THREADS: "Gérer les fils",
            USE_PUBLIC_THREADS: "Utiliser les fils publique",
            CREATE_PUBLIC_THREADS: "Créer des fils publique",
            USE_PRIVATE_THREADS: "Utiliser les fils privé",
            CREATE_PRIVATE_THREADS: "Créer des fils privé",
            USE_EXTERNAL_STICKERS: "Utiliser des autolocollants externe",
            SEND_MESSAGES_IN_THREADS: "Envoyez un message dans un fils",
            START_EMBEDDED_ACTIVITIES: "Utiliser l'activité",
            MODERATE_MEMBERS: "Gérer les utilisateurs",
        };


        const member = message.mentions.members.first() || message.member
            const perms = `\`\`\`${member.permissions.toArray().map(perm => perms1[perm]).join("\n")}\`\`\` `;
      
          const embed = new MessageEmbed()
            .setTitle(`Permissions de ${member.displayName}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(perms)
            .setFooter(` LuminaBots ${client.config.version}`)
        .setColor(color);
        
        message.channel.send({ embeds: [embed] })
    
        }
    }  