const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const wl = new db.table("Whitelist")
const ard = new db.table("antiroledelete")
const cl = new db.table("Color")


module.exports = async (client, role, oldRole, newRole) => {
    const audit = (await role.guild.fetchAuditLogs("ROLE_DELETE")).entries.first()

    let color = cl.fetch(`color_${role.guild.id}`)
    if (ard.fetch(`config.${role.guild.id}.antiroledelete`) == true) {

        let perm =  client.config.owner == audit.executor.id ||
        owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`)
        client.user.id == audit.executor.id;
        if (perm) {
            return
        } else if (!perm) {

        const guild = role.guild;
        const raidlog =  guild.channels.cache.get(db.get(`${role.guild.id}.raidlog`))
        if (audit.action == 'ROLE_DELETE') {

            if (punish.get(`sanction_${role.guild.id}`) === "ban") {
                role.guild.members.ban(audit.executor.id, { reason: `Antirole Delete` })

            } else if (punish.get(`sanction_${role.guild.id}`) === "derank") {

                role.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                    if (role.name !== '@everyone') {
                        role.guild.members.resolve(audit.executor).roles.remove(role).catch(err => { throw err })
                    }
                })

            } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {

                role.guild.members.kick(audit.executor.id, { reason: `Antirole Delete` })
            }
            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${audit.executor.id}> a tenté de \`supprimé un role\`, il a été sanctionné`)
                .setTimestamp()
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setColor(color)
                if (raidlog) return raidlog.send({ embeds: [embed] }).catch(console.error)
        }

        role.guild.roles.create({
            name: role?.name,
            color: role?.color,
            hoist: role?.hoist,
            permissions: role?.permissions,
            position: role?.position,
            mentionable: role?.mentionable,
            reason: 'Anti-Role'
        })
    }
}
}