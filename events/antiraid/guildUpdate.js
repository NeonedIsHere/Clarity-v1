const Discord = require("discord.js");
const db = require("quick.db");
const cl = new db.table("Color");
const owner = new db.table("Owner");
const punish = new db.table("Punition");
const agu = new db.table("Guildupdate");
const wl = new db.table("Whitelist")
module.exports = async (client, oldGuild, newGuild) => {
  if (oldGuild === newGuild) return;
  let guild = newGuild;

  let color = cl.fetch(`color_${guild.id}`);

  const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`));

  const action = await guild
  .fetchAuditLogs("GUILD_UPDATE")
  .then((audits) => audits.entries.first());
if (action.executor.id === client.user.id) return;

let perm =
client.config.owner == audit.executor.id ||
owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`)
client.user.id == audit.executor.id === true;


  if (agu.get(`guildupdate_${guild.id}`) === true && !(perm)) {

    
      if (punish.get(`sanction_${guild.id}`) === "ban") {
        guild.members.ban(action.executor.id, { reason: `Anti Guild Update` });
      } else if (punish.get(`sanction_${guild.id}`) === "derank") {
        guild.members.resolve(action.executor).roles.cache.forEach((role) => {
          if (role.name !== "@everyone") {
            guild.members
              .resolve(action.executor)
              .roles.remove(role)
              .catch((err) => {
                throw err;
              });
          }
        });
      } else if (punish.get(`sanction_${guild.id}`) === "kick") {
        guild.members.kick(action.executor.id, { reason: `Anti Guild Update` });
      }

      const embed = new Discord.MessageEmbed();
      embed.setDescription(
        `${action.executor} a apporter des \`modifications au serveur\`, **il a été sanctionné**`
      );
      embed.setColor(color);
      embed.setFooter({ text: `LuminaBots ${client.config.version}`  });

      if (raidlog)
        return raidlog.send({ embeds: [embed] }).catch(console.error);

      if (oldGuild.name === newGuild.name) {
      } else {
        await newGuild.setName(oldGuild.name);
      }

      if (
        oldGuild.iconURL({ dynamic: true }) ===
        newGuild.iconURL({ dynamic: true })
      ) {
      } else {
        await newGuild.setIcon(oldGuild.iconURL({ dynamic: true }));
      }

      if (oldGuild.bannerURL() === newGuild.bannerURL()) {
      } else {
        await newGuild.setBanner(oldGuild.bannerURL());
      }

      if (oldGuild.position === newGuild.position) {
      } else {
        await newGuild.setChannelPositions([
          { channel: oldGuild.id, position: oldGuild.position },
        ]);
      }

      if (oldGuild.systemChannel === newGuild.systemChannel) {
      } else {
        await newGuild.setSystemChannel(oldGuild.systemChannel);
      }

      if (oldGuild.systemChannelFlags === newGuild.systemChannelFlags) {
      } else {
        await newGuild.setSystemChannelFlags(oldGuild.systemChannelFlags);
      }

      if (oldGuild.verificationLevel === newGuild.verificationLevel) {
      } else {
        await newGuild.setVerificationLevel(oldGuild.verificationLevel);
      }

      if (oldGuild.widget === newGuild.widget) {
      } else {
        await newGuild.setWidget(oldGuild.widget);
      }

      if (oldGuild.splashURL === newGuild.splashURL) {
      } else {
        await newGuild.setSplash(oldGuild.splashURL);
      }

      if (oldGuild.rulesChannel === newGuild.rulesChannel) {
      } else {
        await newGuild.setRulesChannel(oldGuild.rulesChannel);
      }

      if (oldGuild.publicUpdatesChannel === newGuild.publicUpdatesChannel) {
      } else {
        await newGuild.setPublicUpdatesChannel(oldGuild.publicUpdatesChannel);
      }

      if (
        oldGuild.defaultMessageNotifications ===
        newGuild.defaultMessageNotifications
      ) {
      } else {
        await newGuild.setDefaultMessageNotifications(
          oldGuild.defaultMessageNotifications
        );
      }

      if (oldGuild.afkChannel === newGuild.afkChannel) {
      } else {
        await newGuild.setAFKChannel(oldGuild.afkChannel);
      }

      if (oldGuild.region === newGuild.region) {
      } else {
        await newGuild.setRegion(oldGuild.region);
      }

      if (oldGuild.afkTimeout === newGuild.afkTimeout) {
      } else {
        await newGuild.setAFKTimeout(oldGuild.afkTimeout);
      }

      if (oldGuild.vanityURLCode === newGuild.vanityURLCode) {
      } else {
        await newGuild.vanityURLCode.setvanityURLCode(oldGuild.vanityURLCode);
      }
  }
};
