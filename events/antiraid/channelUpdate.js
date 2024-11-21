const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const rlog = new db.table("raidlog");
const punish = new db.table("Punition");
const wl = new db.table("Whitelist");
const acu = new db.table("antichannelupdate");
const cl = new db.table("Color");
module.exports = async (client, oldChannel, newChannel) => {
  const color = await cl.fetch(`color_${oldChannel.guild.id}`);
  const audit = (
    await oldChannel.guild.fetchAuditLogs("CHANNEL_UPDATE")
  ).entries.first();
  const guild = oldChannel.guild;
  const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`));
  let perm =
    client.config.owner == audit.executor.id ||
    owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`)
    client.user.id == audit.executor.id === true;
  if (acu.fetch(`config.${oldChannel.guild.id}.antichannelupdate`) == true && (!perm)) {
   
      if (
        audit.action == "CHANNEL_UPDATE" ||
        audit.action == "CHANNEL_OVERWRITE_UPDATE"
      ) {
        // edit
        newChannel.edit({
          name: oldChannel?.name,
          type: oldChannel?.type,
          position: oldChannel?.position || 0,
          parent: oldChannel?.parent,
        });

        if (punish.get(`sanction_${oldChannel.guild.id}`) === "ban") {
          oldChannel.guild.members.ban(audit.executor.id, {
            reason: `AntiChannel Update`,
          });
        } else if (punish.get(`sanction_${oldChannel.guild.id}`) === "derank") {
          oldChannel.guild.members
            .resolve(audit.executor)
            .roles.cache.forEach((role) => {
              if (role.name !== "@everyone") {
                oldChannel.guild.members
                  .resolve(audit.executor)
                  .roles.remove(role)
                  .catch((err) => {
                    throw err;
                  });
              }
            });
        } else if (punish.get(`sanction_${oldChannel.guild.id}`) === "kick") {
          oldChannel.guild.members.kick(audit.executor.id, {
            reason: `AntiChannel Update`,
          });
        }
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<@${audit.executor.id}> a tenté de \`modifié\` un salon, il a été sanctionné`
          )
          .setTimestamp()
          .setFooter({ text: `LuminaBots ${client.config.version}`  })
          .setColor(color);
        if (raidlog)
          return raidlog.send({ embeds: [embed] }).catch(console.error);
      }
    
  }
};
