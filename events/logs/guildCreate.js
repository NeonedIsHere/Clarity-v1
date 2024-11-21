const Discord = require('discord.js')
const db = require('quick.db')
const addlog = new db.table("addlog")
const cl = new db.table("Color")
const { MessageEmbed } = require("discord.js");
const {MessageButton, MessageActionRow} = require("discord.js");
module.exports = async (client, guild) => {

    if (!guild) return;
    if (!guild.available) return;


    const guilds = client.guilds.cache.size; // Récupère le nombre de serveurs
    const members = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    let wass = client.channels.cache.get("1081956677789696012")


    const embed = new MessageEmbed()
    .setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true })})
    .addFields({
        name: `Je viens d'être ajouté sur:`,
        value: `**${guild.name}**`,
    }, {
        name: `ID:`,
        value: `${guild.id}`,
    }, {
        name: `Créé le:`,
        value: `${guild.createdAt}`,
    }, {
        name: `Nombre de membres:`,
        value: `${guild.memberCount}`,
    }, {
        name: `Propriétaire:`,
        value: `<@${guild.ownerId}>`
    }, 
        {
        name: "Son ID:",
        value: `${guild.ownerId}`,
    })
    if (guild.icon) embed.setImage(`${guild.iconURL({ dynamic: true })}`) 

    let thanks = new MessageButton()
    thanks.setStyle("SECONDARY")
    thanks.setCustomId("thanks")
    thanks.setLabel("Merci")
    thanks.setEmoji("811649812927217745")

    let user = new MessageButton()
    user.setStyle("SECONDARY")
    user.setCustomId("user")
    user.setLabel("Utilisateurs LuminaBots : " + "" + members)
    user.setEmoji("1089569430385721385")

    let guildlist = new MessageButton()
    guildlist.setStyle("SECONDARY")
    guildlist.setCustomId("guildlist")
    guildlist.setLabel("Nombre de serveurs possédant le bot : " + "" + guilds)
    guildlist.setEmoji("1089569430385721385")
    let row = new MessageActionRow()
    row.addComponents(thanks, user, guildlist)
    wass.send({embeds: [embed], components: [row]})
}


