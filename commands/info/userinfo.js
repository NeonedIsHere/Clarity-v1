const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const cl = new db.table("Color")

module.exports = {
    name: 'userinfo',
    aliases: ['ui'],
    description: 'Avoir les infos sur le compte d\'\ un membre en mentionnant le <membre>',
    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color



            const permissions = {
                "ADMINISTRATOR": "Administrator",
                "MANAGE_GUILD": "Manage Server",
                "MANAGE_ROLES": "Manage Roles",
                "MANAGE_CHANNELS": "Manage Channels",
                "KICK_MEMBERS": "Kick Members",
                "BAN_MEMBERS": "Ban Members",
                "MANAGE_NICKNAMES": "Manage Nicknames",
                "MANAGE_EMOJIS": "Manage Emojis",
                "MANAGE_WEBHOOKS": "Manage Webhooks",
                "MANAGE_MESSAGES": "Manage Messages",
                "MENTION_EVERYONE": "Mention Everyone"
            }
            const mention = message.mentions.members.first() || message.member;
            const nick = mention.nickname === null ? "None" : mention.nickname;
            const roles = mention.roles.cache.get === "" ? "None" : mention.roles.cache.get;
            const usericon = mention.user.avatarURL;
            const mentionPermissions = mention.permissions.toArray() === null ? "None" : mention.permissions.toArray();
            const finalPermissions = [];
            for (const permission in permissions) {
                if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
                else;
            }
            var flags = {
                "": "Aucun",
                "DISCORD_EMPLOYEE": "Discord Employer",
                "DISCORD_PARTNER": "Discord Partner",
                "BUGHUNTER_LEVEL_1": "Bug Hunter (Level 1)",
                "BUGHUNTER_LEVEL_2": "Bug Hunter (Level 2)",
                "HYPESQUAD_EVENTS": "Hypesquad Events",
                "HOUSE_BRILLIANCE": "HypeSquad Brilliance",
                "HOUSE_BRAVERY": "HypeSquad Bravery",
                "HOUSE_BALANCE": "HypeSquad Balance",
                "EARLY_SUPPORTER": "Early",
                "TEAM_USER": "Team User",
                "VERIFIED_BOT": "Bot Certifié",
                "EARLY_VERIFIED_DEVELOPER": "Developer"
            };
            var bot = {
                "true": "L'utilisateur est un bot",
                "false": "L'utilisateur est un humain"
            };

            // Récupérer les guildes de l'utilisateur mentionné
        const mentionGuilds = client.guilds.cache.filter(guild => guild.members.cache.has(mention.id));
        const mentionGuildNames = mentionGuilds.map(guild => guild.name).join("\n");
        
        // Récupérer les guildes de l'utilisateur exécutant la commande
        const authorGuilds = client.guilds.cache.filter(guild => guild.members.cache.has(message.author.id));
        const authorGuildNames = authorGuilds.map(guild => guild.name).join("\n");

        const commonGuilds = mentionGuilds.filter(guild => authorGuilds.has(guild));
        const commonGuildNames = commonGuilds.map(guild => guild.name).join("\n");

            const userlol = new Discord.MessageEmbed()
                .setAuthor(`Informations`, mention.user.avatarURL())
                .setThumbnail(usericon)
                .addField(`**General**`, `**Nom**: \`${mention.user.username}\` \nTag: \`${mention.user.discriminator}\` \nSurnom: \`${nick}\``)
                .addField(`**Aperçu**`, `**Badges**: \`${flags[mention.user.flags.toArray().join(", ")]}\`\nBot: \`${bot[mention.user.bot]}\``)
                .addField(`**Informations relatives au serveur**`, `**Roles**: <@&${mention._roles.join(">  <@&")}> \nPermissions: \`${finalPermissions.join(', ')}\``)
                .addField(`**Info**`, `Compte créé le: \n\`${moment(mention.user.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\` \nA rejoint le serveur: \n\`${moment(mention.joinedAt).format("dddd, MMMM Do YYYY, h:mm:ss A")}\``)
                .addField(`**Le rôle le plus haut:**`, `${mention.roles.highest.id === message.guild.id ? 'None' : mention.roles.highest.name}`)
                


                .setThumbnail(mention.user.avatarURL())
                .setFooter(`ID: ${mention.user.id}`, mention.user.avatarURL())
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })
            message.channel.send({ embeds: [userlol] })


    }
    }
