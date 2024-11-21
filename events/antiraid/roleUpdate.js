const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const rlog = new db.table("raidlog");
const punish = new db.table("Punition");
const wl = new db.table("Whitelist");
const aru = new db.table("antiroleupdate");
const cl = new db.table("Color");
module.exports = async (client, oldRole, newRole) => {
  let color = cl.fetch(`color_${oldRole.guild.id}`);
  const audit = (
    await oldRole.guild.fetchAuditLogs("ROLE_UPDATE")
  ).entries.first();
  const guild = oldRole.guild;
  const raidlog = guild.channels.cache.get(
    db.get(`${oldRole.guild.id}.raidlog`)
  );
  let isOn = await aru.fetch(`config.${oldRole.guild.id}.antiroleupdate`);
  let perm =
  client.config.owner == audit.executor.id ||
  owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`)
  client.user.id == audit.executor.id;
  if (isOn == true) {
    if (audit?.executor?.id == oldRole?.guild?.ownerId) return;

    if (perm) {
      return;
    } else if (!perm) {
      if (audit.action == "ROLE_UPDATE") {
        newRole.edit({
          name: oldRole?.name,
          color: oldRole?.color,
          position: oldRole?.position,
          permissions: oldRole?.permissions,
          hoist: oldRole?.hoist,
          mentionable: oldRole?.mentionable,
        });

        if (punish.get(`sanction_${oldRole.guild.id}`) === "ban") {
          oldRole.guild.members.ban(audit.executor.id, {
            reason: `Antirole Update`,
          });
        } else if (punish.get(`sanction_${oldRole.guild.id}`) === "derank") {
          oldRole.guild.members
            .resolve(audit.executor)
            .roles.cache.forEach((role) => {
              if (role.name !== "@everyone") {
                oldRole.guild.members
                  .resolve(audit.executor)
                  .roles.remove(role)
                  .catch((err) => {
                    throw err;
                  });
              }
            });
        } else if (punish.get(`sanction_${oldRole.guild.id}`) === "kick") {
          oldRole.guild.members.kick(audit.executor.id, {
            reason: `Antirole Update`,
          });
        }
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<@${audit.executor.id}> a tenté de \`modifié un role\`, il a été sanctionné`
          )
          .setTimestamp()
          .setFooter({ text: `LuminaBots ${client.config.version}`  })
          .setColor(color);
        if (raidlog)
          return raidlog.send({ embeds: [embed] }).catch(console.error);
      }
    }
  }
};
