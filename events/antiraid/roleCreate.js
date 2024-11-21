const Discord = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const rlog = new db.table("raidlog")
const punish = new db.table("Punition")
const wl = new db.table("Whitelist")
const atr = new db.table("antirolecreate")
const cl = new db.table("Color")
module.exports = async (client, role) => {
    const audit = (await role.guild.fetchAuditLogs("ROLE_CREATE")).entries.first()
    let color = cl.fetch(`color_${role.guild.id}`)
        if (atr.fetch(`config.${role.guild.id}.antirolecreate`) == true) {

            let perm =  client.config.owner == audit.executor.id ||
            owner.get(`ownermd.${audit.executor.id}`) || wl.get(`${audit.executor.id}.wl`) || db.get(`buyermd.${audit.executor.id}`)
            client.user.id == audit.executor.id;
    if (perm) {
        return
    } else if (!perm) {

            const guild = role.guild;
            const raidlog =  guild.channels.cache.get(db.get(`${role.guild.id}.raidlog`))

            if (audit.action == 'ROLE_CREATE'){
                role.delete()

                if (punish.get(`sanction_${role.guild.id}`) === "ban") {
                    role.guild.members.ban(audit.executor.id, { reason: `Antirole Create` })

                } else if (punish.get(`sanction_${role.guild.id}`) === "derank") {

                    role.guild.members.resolve(audit.executor).roles.cache.forEach(role => {
                        if (role.name !== '@everyone') {
                            role.guild.members.resolve(audit.executor).roles.remove(role).catch(err => { throw err })
                        }
                    })

                } else if (punish.get(`sanction_${role.guild.id}`) === "kick") {

                    role.guild.members.kick(audit.executor.id, { reason: `Antirole Create` })
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`<@${audit.executor.id}> a tenté de \`créer un role\`, il a été sanctionné`)
                    .setFooter({text: `LuminaBots ${client.config.version}` })
                    .setTimestamp()
                    .setColor(color)
                  if (raidlog) return raidlog.send({ embeds: [embed] }).catch(console.error)
            }
        }
    }
}