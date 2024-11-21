const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color")
const process = require('process');
const os = require('os');
module.exports = {
    name: "botinfo",
    aliases: ["bi"],
    description:"permet d'obtenir des informations sur le bot",
    category: "info",
    run: async (client, message, args) => {
        // embed avec toute les infos du bot
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const guilds = client.guilds.cache.size; // Récupère le nombre de serveurs
    const members = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0); // Récupère le nombre de m

    let row = new Discord.MessageActionRow()
    .addComponents(
    new Discord.MessageButton()
    .setStyle("LINK")
    .setURL("https://discord.gg/LuminaBots-fr")
    .setLabel("Support LuminaBots")
    .setEmoji("1046061500072214600"),
    new Discord.MessageButton()
    .setStyle("LINK")
    .setURL("https://discord.com/api/oauth2/authorize?client_id=1079032102173032558&permissions=8&scope=bot")
    .setLabel("Invite LuminaBots")
    .setEmoji("1046061500072214600"),
    )


    
    let confrow2 = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("node")
      .setLabel("Version De Node:" + " " + process.versions.node)
      .setEmoji("1075198510221238303")
      .setDisabled(true),
      new Discord.MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("djs")
      .setLabel("Version De Discord.js:" + " " + Discord.version)
      .setEmoji("1075198510221238303")
      .setDisabled(true),
      new Discord.MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("pkg")
      .setLabel("Packages:" + " " + process.arch)
      .setEmoji("1075198510221238303")
      .setDisabled(true),
    )
    let uprow = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("uptime")
      .setLabel("Bot en Ligne depuis:" + " " + `${Math.floor(process.uptime() / 60)} minutes`)
      .setEmoji("807614927954772019")
      .setDisabled(true),
      new Discord.MessageButton()
      .setStyle("SECONDARY")
      .setCustomId("ping")
      .setLabel("Latence du bot:" + " " + `${Math.round(client.ws.ping)} ms`)
      .setEmoji("807614927954772019")
      .setDisabled(true),
    )
        const embed = new Discord.MessageEmbed()
          .setTitle("Bot Info")
          .setColor(color)
          .setThumbnail(client.user.displayAvatarURL())
          .addField("Nom Du Bot:", `${client.user.username}`)
          .addField("ID Du Bot:", `${client.user.id}`)
          .addField("Utilisateurs LuminaBots", `${members}`)
          .addField("Nombre de serveurs :", `${guilds}`)
          .setFooter({text: `LuminaBots\nCommandes total: ${client.commands.size}
          `})
          .addField("Ram utilisé :", Math.floor(process.memoryUsage().heapUsed / 1024 / 1024) + "MB")
          .addField("Version du bot", client.config.version)
          .addField("Os :", `${os.type()} - ${os.release()} - ${os.arch()}`)
          .addField("Cpu :", `${os.cpus().map(i => `${i.model}`)[0]} - ${os.cpus().map(i => `${i.speed} MHz`)[0]}`)

          message.channel.send({
            embeds: [embed],
            components: [row, confrow2, uprow]
          });
    }
}