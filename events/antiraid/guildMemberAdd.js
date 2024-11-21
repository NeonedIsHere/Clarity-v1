const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const cl = new db.table("Color");
const owner = new db.table("Owner");
const punish = new db.table("Punition");
const atb = new db.table("Antibot");
const wl = new db.table("Whitelist")
module.exports = async (client, member) => {
  let color = cl.fetch(`color_${member.guild.id}`);

  if (member.user.bot) {
    if (atb.get(`config.${member.guild.id}.antibot`) === true) {
      const action = await member.guild
        .fetchAuditLogs({ limit: 1, type: "BOT_ADD" })
        .then(async (audit) => audit.entries.first());
      if (action.executor.id === client.user.id) return;

      let perm =
      client.config.owner == action.executor.id ||
      owner.get(`ownermd.${action.executor.id}`) || wl.get(`${action.executor.id}.wl`) || db.get(`buyermd.${action.executor.id}`)
      client.user.id == action.executor.id === true;

      let guild = member.guild;

      const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`));

      if (!perm) {
        member.kick("Antibot");

        if (punish.get(`sanction_${member.guild.id}`) === "ban") {
          member.guild.members.ban(action.executor.id, { reason: `Anti Bot` });
        } else if (punish.get(`sanction_${member.guild.id}`) === "derank") {
          member.guild.members
            .resolve(action.executor)
            .roles.cache.forEach((role) => {
              if (role.name !== "@everyone") {
                member.guild.members
                  .resolve(action.executor)
                  .roles.remove(role)
                  .catch((err) => {
                    throw err;
                  });
              }
            });
        } else if (punish.get(`sanction_${member.guild.id}`) === "kick") {
          member.guild.members.kick(action.executor.id, { reason: `Anti bot` });
        }

        const embed = new Discord.MessageEmbed()
          .setDescription(
            `<@${action.executor.id}> a ajouté un \`bot\` au serveur\nBot ajouté: <@${member.id}>`
          )
          .setTimestamp()
          .setColor(color)
          .setFooter({ text: "LuminaBots ${client.config.version}`" });
        if (raidlog) raidlog.send({ embeds: [embed] }).catch(console.error);
      }
    }
  }
};
