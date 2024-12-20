const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner");
const rlog = new db.table("raidlog");
const punish = new db.table("Punition");
const wl = new db.table("Whitelist");
const aw = new db.table("antiwebhook");
module.exports = async (client, channel) => {
  const audit = (
    await channel.guild.fetchAuditLogs("WEBHOOK_CREATE")
  ).entries.first();
  if (audit?.executor?.id == client.user.id) return;
  const guild = channel.guild;
  const raidlog = guild.channels.cache.get(
    db.get(`${channel.guild.id}.raidlog`)
  );
  let perm =
    client.config.owner == audit.executor.id ||
    owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`)
    client.user.id == audit.executor.id === true;

  if (aw.fetch(`config.${channel.guild.id}.antiwebhook`) == true && (!perm)) {
   
      if (audit.action == "WEBHOOK_CREATE") {
        channel.clone({ position: channel.rawPosition });
        channel.delete();

        channel.guild.fetchWebhooks().then((webhooks) => {
          webhooks.forEach((wh) => wh.delete({ reason: "Anti-Webhook" }));
        });

        if (punish.get(`sanction_${channel.guild.id}`) === "ban") {
          channel.guild.members.ban(audit.executor.id, {
            reason: `Anti Webhook`,
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
            reason: `Anti Webhook`,
          });
        }
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<@${audit.executor.id}> a tenté de créer un \`webhook\`, il a été sanctionné`
          )
          .setTimestamp()
          .setFooter({ text: `LuminaBots ${client.config.version}`  });
        if (raidlog)
          return raidlog.send({ embeds: [embed] }).catch(console.error);
      }

}
}
