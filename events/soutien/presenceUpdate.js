const Discord = require("discord.js");
const db = require("quick.db")

module.exports =  async (client, oldPresence, newPresence) => {

    const member = newPresence.member
    const link = db.fetch("support" + member.guild.id)
    if (link === null) return;
    if (link === true) {
        const roleID = await db.fetch("srole" + member.guild.id)
        const inviteLink = await db.fetch("status" + member.guild.id)
        if (member.roles.cache.find(role => role.id === roleID)) {
            if (member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(inviteLink))) return;
            if (!member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(inviteLink))) {
                await member.roles.remove(roleID, "Soutien");
            }
        } if (!member.roles.cache.find(role => role.id === roleID) && member.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(inviteLink))) {
            await member.roles.add(roleID, "Soutien");
        }
    }
    }

