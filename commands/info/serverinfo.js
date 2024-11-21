const Discord = require('discord.js')
const db = require('quick.db')
const axios = require('axios')
const cl = new db.table("Color")
module.exports = {
    name: 'serverinfo',
    aliases: ['si'],
    run: async (client, message, args, prefix) => {

           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        const premiumTier = {
            NONE: 0,
            TIER_1: 1,
            TIER_2: 2,
            TIER_3: 3,
        };

      
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
      
        const verifLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
      
        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };
      
        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };
        const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const membersGuild = message.guild.members.cache;
        const channelsGuild = message.guild.channels.cache;
        const emojisGuild = message.guild.emojis.cache;
        const argument = args[0];
      

        const humans = membersGuild.filter(member =>!member.user.bot).size;
        const boosters = membersGuild.filter(m => m.premiumSince).size;
      const memberOnline = membersGuild.filter(m => m.presence?.status === 'online').size;
      const botGuilds = message.guild.members.cache.filter(m => m.user.bot).size;
      const memberinVoice = membersGuild.filter(member => !member.user.bot && member.voice.channel).size;
      const norolemembers = membersGuild.filter(member =>!member.roles.cache.has(message.guild.id)).size;
        const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${message.guild.name}`)
        .setURL(message.guild.iconURL({ dynamic: true }))
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .addFields({
            name: "ID",
            value: `${message.guild.id}`,
            inline: true
        }, {
            name: "Nombre de membres",
            value: `${message.guild.memberCount}`,
            inline: true
        }, {
            name: "Nombre de membres en ligne",
            value: `${memberOnline}`,
            inline: true
        }, {
            name: "Nombre d'humains",
            value: `${humans}`,
            inline: true
        }, {
            name: "Nombre de bots",
            value: `${botGuilds}`,
            inline: true
        }, {
            name: "Nombre d'utilisateurs en vocal",
            value: `${memberinVoice}`,
            inline: true
        }, {
            name: "Nombre d'utilisateurs sans rôle",
            value: `${norolemembers}`,
            inline: true
        }, {
            name: "Nombre de boosts",
            value: `${message.guild.premiumSubscriptionCount || '0'}`,
            inline: true
        }, {
            name: "Nombre de boosters",
            value: `${boosters || '0'}`,
            inline: true
        }, {
            name: "Niveau de boost",
            value: `${premiumTier[message.guild.premiumTier]}`,
            inline: true
        },{
            name: "Nombre de rôles",
            value: `${rolesGuild.size}`,
            inline: true
        }, {
            name: "Nombre de salons",
            value: `${channelsGuild.size}`,
            inline: true
        }, {
            name: "Nombre d'emojis",
            value: `${emojisGuild.size}`,
            inline: true
        }, {
            name: "Vanity URL",
            value: message.guild.vanityURLCode? `discord.gg/${message.guild.vanityURLCode}` : `Le serveur ne possède pas d'url`,
            inline: true
        }, {
            name: "Verification",
            value: `${verifLevels[message.guild.verificationLevel]}`,
            inline: true
        })
        // affiche la banniere du serveur en image
        .setImage(message.guild.bannerURL({ dynamic: true, size: 2048}))
        // affiche la date de création du serveur en timestamp
        .setTimestamp(message.guild.createdAt)
        .setFooter({text: `Création du serveur`})
      
      
      message.channel.send({embeds: [embed]})
        
    }
}