const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const rlog = new db.table("raidlog");
const punish = new db.table("Punition");
const wl = new db.table("Whitelist");
const atc = new db.table("antichannelcreate");
const cl = new db.table("Color");
module.exports = async (client, channel) => {
  const color = await cl.fetch(`color_${channel.guild.id}`);
  let muterole = await channel.guild.roles.cache.get(db.fetch(`muterole_${channel.guild.id}`)) || channel.guild.roles.cache.find(role => role.name === `muet`) || channel.guild.roles.cache.find(role => role.name === `Muted`) || channel.guild.roles.cache.find(role => role.name === `Mute`)
  if (muterole) {

      channel.permissionOverwrites.edit(muterole, {
          SEND_MESSAGES: false,
          SPEAK: false,
      })
  }
  const guild = channel.guild;

  const raidlog = guild.channels.cache.get(
    db.get(`${channel.guild.id}.raidlog`)
  );
  const audit = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then((audits) => audits.entries.first());
  let perm = ""

  if (atc.get(`config.${channel.guild.id}.antichannelcreate`) == null) perm =   client.config.owner == audit.executor.id ||
  owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`) ||
  client.user.id == audit.executor.id === true;
  if (atc.get(`config.${channel.guild.id}.antichannelcreate`) == true) perm =   client.config.owner == audit.executor.id ||
  owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`) ||
  client.user.id == audit.executor.id === true;

  if (atc.get(`config.${channel.guild.id}.antichannelcreate`) == true && !perm) {
    
      channel.delete();

      if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
        channel.guild.members.ban(audit.executor.id, {
          reason: `AntiChannel Create`,
        });
      } else if (punish.get(`sanction_${channel.guild.id}`) === "derank") {
        channel.guild.members
          .resolve(audit.executor)
          .roles.cache.forEach((role) => {
            if (role.name !== "@everyone") {
              channel.guild.members
                .resolve(audit.executor)
                .roles.remove(role)
                .catch((err) => {
                  throw err;
                });
            }
          });
      } else if (punish.get(`sanction_${channel.guild.id}`) === "kick") {
        channel.guild.members.kick(audit.executor.id, {
          reason: `AntiChannel Create`,
        });
      }

      const embed = new Discord.MessageEmbed()
        .setDescription(
          `<@${audit.executor.id}> a tenté de \`créer un salon\`, il a été sanctionné`
        )
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  })
        .setColor(color);
      if (raidlog)
        return raidlog.send({ embeds: [embed] }).catch(console.error);
    
  }
};
