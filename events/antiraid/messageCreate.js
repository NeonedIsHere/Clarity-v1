const Discord = require("discord.js");
const db = require("quick.db");
const cl = new db.table("Color")
const wl = new db.table("Whitelist");
const al = new db.table("AntiLink");
const ae = new db.table("Antieveryone");
const owner = new db.table("Owner");
const linksall = [
  "discord.gg",
  "dsc.bio",
  "www",
  "https",
  "http",
  ".ga",
  ".fr",
  ".com",
  ".tk",
  ".ml",
  "://",
  ".gg",
  "discord.me",
  "discord.io",
  "invite.me",
  "discordapp.com/invite",
];

const linksinvite = [
  "discord.gg",
  ".gg",
  "discord.me",
  "discord.io",
  "invite.me",
  "discordapp.com/invite",
];

const linksweb = ["www", "https", "http", "://"];

const mention = ["@everyone", "@here"];
module.exports = async (client, message) => {
    
  let isLink = false;
  let isLinkall = false;
  let isMention = false;

  linksall.forEach((l) => {
    if (message.content.includes(l)) {
      isLinkall = true;
    }
  });

  linksweb.forEach((l) => {
    if (message.content.includes(l)) {
      isLink = true;
    }
  });

  linksinvite.forEach((l) => {
    if (message.content.includes(l)) {
      isLink = true;
    }
  });

  mention.forEach((l) => {
    if (message.content.includes(l)) {
      isMention = true;
    }
  });

  if (message.author.bot) return;
  if (message.channel.type == "DM") return;
  let guild = message.guild;
  let antilinkinvite = al.fetch(`${message.guild.id}.antilinkinvite`);
  let antilinkall = al.fetch(`${message.guild.id}.antilinkall`);
  let antieveryone = ae.fetch(`${message.guild.id}.antieveryone`);
  let antilinkweb = ae.fetch(`${message.guild.id}.antilinkweb`);
  let color = cl.fetch(`color_${message.guild.id}`)
  let perm =
  client.config.owner == message.author.id ||
  owner.get(`ownermd.${message.author.id}`) || wl.get(`${message.author.id}.wl`) || db.get(`buyermd.${message.author.id}`)
  client.user.id == message.author.id === true;

  if (antilinkinvite == true && !perm) {
    const raidlog = guild.channels.cache.get(
      db.get(`${message.guild.id}.raidlog`)
    );

    if (isLink == true) {
      message.delete();
      message.member.timeout(15000);
      message.channel
        .send({
          content: `<@${message.author.id}> Tu n'as pas le droit d'envoyé de lien dans ce serveur.`,
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 6000);
        });

      const embed = new Discord.MessageEmbed()
        .setDescription(
          `<@${message.author.id}> a envoyer un \`lien\` dans \`${message.channel.name}\`, j'ai supprimé son message`
        )
        .setTimestamp()
        .setColor(color)
        .setFooter({ text: `LuminaBots ${client.config.version}`  });
   
      if (raidlog)
        return raidlog.send({ embeds: [embed] }).catch(console.error);
    }
  }
  if (antilinkweb == true && !perm) {
    const raidlog = guild.channels.cache.get(
      db.get(`${message.guild.id}.raidlog`)
    );

    if (isLink == true) {
      message.delete();
      message.member.timeout(15000);
      message.channel
        .send({
          content: `<@${message.author.id}> Tu n'as pas le droit d'envoyé de lien dans ce serveur.`,
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 6000);
        });

      const embed = new Discord.MessageEmbed()
        .setDescription(
          `<@${message.author.id}> a envoyer un \`lien\` dans \`${message.channel.name}\`, j'ai supprimé son message`
        )
        .setTimestamp()
        .setColor(color)
        .setFooter({ text: `LuminaBots ${client.config.version}`  });
     
      if (raidlog)
        return raidlog.send({ embeds: [embed] }).catch(console.error);
    }
  }

  if (antilinkall == true && !perm) {
    const raidlog = guild.channels.cache.get(
      db.get(`${message.guild.id}.raidlog`)
    );

    if (isLinkall == true) {
      message.delete();
      message.member.timeout(15000);
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `<@${message.author.id}> a envoyer un \`lien\` dans \`${message.channel.name}\`, j'ai supprimé son message`
        )
        .setTimestamp()
        .setColor(color)
        .setFooter({ text: `LuminaBots ${client.config.version}`  });
        
      message.channel
        .send({
          content: `<@${message.author.id}> Tu n'as pas le droit d'envoyé de lien dans ce serveur.`,
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 6000);
        });
   
      if (raidlog)
        return raidlog.send({ embeds: [embed] }).catch(console.error);
    }
  }

  if (antieveryone == true && !perm) {
    const raidlog = guild.channels.cache.get(
      db.get(`${message.guild.id}.raidlog`)
    );

    const apr = db.get(`${message.guild.id}.antipingr`)

    if (isMention == true) {
      message.channel.clone().then((ch) => {
        ch.setParent(message.channel.parent);
        ch.setPosition(message.channel.position);
        message.channel.delete();
        message.member.timeout(60000);
        ch.send(
          `**Le salon a été renew car <@${message.author.id}> à ping tout le serveur**`
        ).then((msg) => {
          setTimeout(() => msg.delete(), 50000);
        });
      });

      const embed = new Discord.MessageEmbed()
        .setDescription(
          `<@${message.author.id}> a mentionner \`tout le serveur\` dans \`${message.channel.name}\`, j'ai renew le salon`
        )
        .setTimestamp()
        .setColor(color)
        .setFooter({ text: `LuminaBots ${client.config.version}`  });
     
      if (raidlog)
        return raidlog.send({ embeds: [embed] }).catch(console.error);
    }
  }
}

