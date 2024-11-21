const db = require("quick.db");
module.exports = async (client, member) => {
  if (member.user) {
    let guild = member.guild;
    let joinsettings = db.get(`joinsettings_${member.guild.id}`);

    if (joinsettings == null) joinsettings == true;

    if (joinsettings === true) {
      const messageboost = db.fetch(`messageboost_${member.guild.id}`);
      const boostembed = db.get(`boostembed_${member.guild.id}`);

      const salonboost = guild.channels.cache.get(
        db.get(`salonboost_${member.guild.id}`)
      );

      const premiumTier = {
        NONE: 0,
        TIER_1: 1,
        TIER_2: 2,
        TIER_3: 3,
      };

      const content = messageboost
        .replaceAll("{MemberName}", member)
        .replaceAll("{MemberMention}", `<@${member.id}>`)
        .replaceAll("{MemberTag}", member.user.tag)
        .replaceAll("{MemberID}", member.id)
        .replaceAll(
          "{ServerBoostsCount}",
          `${member.guild.premiumSubscriptionCount || "0"}`
        )
        .replaceAll("{ServerLevel}", `${premiumTier[member.guild.premiumTier]}`)
      


    if (!boostembed.description) {} else {boostembed.description = boostembed.description.replace("{MemberName}", member).replace("{MemberMention}", `<@${member.id}>`).replace("{MemberTag}", member.tag).replace("MemberID", member.id).replace("{ServerBoostsCount}",   `${member.guild.premiumSubscriptionCount || "0"}`)}

      if (salonboost) salonboost.send({ content: content });

      
    }
  }
};
