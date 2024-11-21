const Discord = require("discord.js");
const db = require("quick.db")


module.exports = async (client) => {
  try {
    client.guilds.cache.forEach(async guild => {
      setInterval(() => {
        const membercount = guild.channels.cache.get(db.get(`${guild.id}_membercount`))
        const rolescount = guild.channels.cache.get(db.get(`${guild.id}_rolescount`))
        const botscount = guild.channels.cache.get(db.get(`${guild.id}_botscount`))
        const boostscount = guild.channels.cache.get(db.get(`${guild.id}_boostscount`))

        const membercounttext = db.get(`${guild.id}_membercounttext`)
        const rolescounttext = db.get(`${guild.id}_rolescounttext`)
        const botscounttext = db.get(`${guild.id}_botscounttext`)
        const boostscounttext = db.get(`${guild.id}_boostscounttext`)
  
        if (membercount) membercount.edit({name: membercounttext.replaceAll("<count>", guild.memberCount)})
        if (rolescount) rolescount.edit({name: rolescounttext.replaceAll("<count>", guild.roles.cache.size)})
        if (botscount) botscount.edit({name: botscounttext.replaceAll("<count>", guild.members.cache.filter(m => m.user.bot).size)})
        if (boostscount) boostscount.edit({name: boostscounttext.replaceAll("<count>", guild.premiumSubscriptionCount)})
      })
    }, 2000)
  } catch (e) {
    console.log(e)
  }
}