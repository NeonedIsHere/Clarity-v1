const Discord = require("discord.js");
const db = require("quick.db");
const cl = new db.table("Color");
const owner = new db.table("Owner");
const rlog = new db.table("raidlog");
const punish = new db.table("Punition");
const ab = new db.table("Antiban");
const wl = new db.table("Whitelist")
module.exports = async (client, guild, user) => {
  if (ab.get(`config.${guild.id}.antiban`) === true) {
;
  
    const action = await user.guild
      .fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" })
      .then(async (audit) => audit.entries.first());
      const raidlog = action.channels.cache.get(
        db.get(`${user.guild.id}.raidlog`)
      );
      let perm =
      client.config.owner == action.executor.id ||
      owner.get(`ownermd.${action.executor.id}`) || wl.get(`${action.executor.id}.wl`) || db.get(`buyermd.${action.executor.id}`)
      client.user.id == action.executor.id === true;
    if (!perm) {
      if (punish.get(`sanction_${user.guild.id}`) === "ban") {
        guild.members.ban(action.executor.id, { reason: `Antiban` });
      } else if (punish.get(`sanction_${user.guild.id}`) === "derank") {
        user.guild.members
          .resolve(action.executor)
          .roles.cache.forEach((role) => {
            if (role.name !== "@everyone") {
              user.guild.members
                .resolve(action.executor)
                .roles.remove(role)
                .catch((err) => {
                  throw err;
                });
            }
          });
      } else if (punish.get(`sanction_${guild.id}`) === "kick") {
        user.guild.members.kick(action.executor.id, { reason: `Antiban` });
      }

      const embed = new Discord.MessageEmbed()
        .setDescription(
          `<@${action.executor.id}> a \`banni\` un membre, il a été sanctionné`
        )
        .setTimestamp()
        .setFooter({ text: `LuminaBots ${client.config.version}`  });
      if (raidlog)
        return raidlog.send({ embeds: [embed] }).catch(console.error);
    }
  }
};
