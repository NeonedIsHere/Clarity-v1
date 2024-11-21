const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const rlog = new db.table("raidlog");
const punish = new db.table("Punition");
const wl = new db.table("Whitelist");
const atd = new db.table("antichanneldelete");
const cl = new db.table("Color");
module.exports = async (client, channel) => {
  const color = await cl.fetch(`color_${channel.guild.id}`);
  const audit = (
    await channel.guild.fetchAuditLogs("CHANNEL_DELETE")
  ).entries.first();
  const guild = channel.guild;
  const raidlog = guild.channels.cache.get(
    db.get(`${channel.guild.id}.raidlog`)
  );
  let perm =
  client.config.owner == audit.executor.id ||
  owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`)
  client.user.id == audit.executor.id === true;
  if (atd.fetch(`config.${channel.guild.id}.antichanneldelete`) == true && !(perm)) {
   
      if (
        audit.action == "CHANNEL_DELETE" ||
        audit.action == "CHANNEL_OVERWRITE_DELETE"
      ) {
        channel.clone({ position: channel.rawPosition });

        if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
          channel.guild.members.ban(audit.executor.id, {
            reason: `AntiChannel Delete`,
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
            reason: `AntiChannel Delete`,
          });
        }
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<@${audit.executor.id}> a tenté de \`supprimé\` un salon, il a été sanctionné`
          )
          .setTimestamp()
          .setFooter({ text: `LuminaBots ${client.config.version}`  })
          .setColor(color);
        if (raidlog)
          return raidlog.send({ embeds: [embed] }).catch(console.error);
      }
    
  }
};
