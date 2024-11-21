const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, member, channel) => {
    const guild = member.guild;
    if (!guild.me.permissions.has("VIEW_AUDIT_LOG")) return;
    const color = db.get(`color_${guild.id}`) === null? client.config.color:db.get(`color_${guild.id}`)
    const raidlog =  guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
    let action = await member.guild.fetchAuditLogs({type: "MEMBER_DISCONNECT"}).then(async (audit) => audit.entries.first());
    if (executor.roles.highest.comparePositionTo(guild.me.roles.highest) <= 0){
    if (db.get(`antidecosanction_${guild.id}`) === "derank") {

     guild.members.cache.get(response.data.audit_log_entries[0].user_id).roles.set([]).then(() => {

                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a déconnecter <@${action.executor.id}>, il a été **derank** !`).setFooter(`LuminaBots ${client.config.version}` ))
                    }).catch(() => {
                        
                        if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${response.data.audit_log_entries[0].user_id}> a déconnecter <@${action.executor.id}>, mais il n'a pas pu être **derank** !`).setFooter(`LuminaBots ${client.config.version}` ))
                    })
                } 
            }
   }
