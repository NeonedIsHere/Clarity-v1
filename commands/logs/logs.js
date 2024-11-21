const Discord = require("discord.js");
const db = require("quick.db");
const getNow = () => {
  return {
    time: new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Paris",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
};
const cl = new db.table("Color");

module.exports = {
  name: "logs",
  aliases: [],

  run: async (client, message, args, prefix) => {
    let color = cl.fetch(`color_${message.guild.id}`);
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        `Vous n\'avez pas la permission \`ADMINISTRATOR\`.`
      );
    const modlog = db.get(`modlog_${message.guild.id}`);
    const rolelog = db.get(`rolelog_${message.guild.id}`);
    const raidlog = db.get(`${message.guild.id}.raidlog`);
    const channellog = db.get(`channellog_${message.guild.id}`);
    const voicelog = db.get(`logvc_${message.guild.id}`);
    const messlog = db.get(`msglog_${message.guild.id}`);
    const boostlog = db.get(`logboosts_${message.guild.id}`);
    const joinleavelog = db.get(`joinleavelog_${message.guild.id}`);
    const emojilog = db.get(`emojilog_${message.guild.id}`);
    const syslog = db.get(`syslog_${message.guild.id}`);
    const veriflog = db.get(`${message.guild.id}.logverif`);
    const ticketlog = db.get(`${message.guild.id}.ticketlog`);
    const prevlog = db.get(`prevlog_${message.guild.id}`);
    const permlog = db.get(`${message.guild.id}.alerteperm`);
    let settings = new Discord.MessageEmbed()
      .setAuthor(
        `Voici les paramètres Logs de ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .addField("Modlogs:", `<#${modlog}>`, true)
      .addField("RoleLogs:", `<#${rolelog}>`, true)
      .addField("RaidLogs:", `<#${raidlog}>`, true)
      .addField("MessageLogs:", `<#${messlog}>`, true)
      .addField("VoiceLogs:", `<#${voicelog}>`, true)
      .addField("JoinLeaveLogs:", `<#${joinleavelog}>`, true)
      .addField("ChannelLogs:", `<#${channellog}>`, true)
      .addField("BoostLogs:", `<#${boostlog}>`, true)
      .addField("EmojiLogs:", `<#${emojilog}>`, true)
      .addField("SysLogs:", `<#${syslog}>`, true)
      .addField("VerifLogs:", `<#${veriflog}>`, true)
      .setColor(color)
      .setFooter(` LuminaBots ${client.config.version}` );

    let settings2 = new Discord.MessageEmbed()
    .addField("TicketLogs:", `<#${ticketlog}>`, true)
    .addField("PermLogs:", `<#${permlog}>`, true)
      .setColor(color)
      .setFooter(` LuminaBots ${client.config.version}` );
    message.channel.send({ embeds: [settings] });
    message.channel.send({ embeds: [settings2] });
  },
};
