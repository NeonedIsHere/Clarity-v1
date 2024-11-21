const db = require("quick.db")
module.exports =  async (client, interaction) => {
    if (interaction.user.bot) return;

    if (interaction.customId === "buttonrole"){
        interaction.deferUpdate().catch(() => false)
        if (!db.get(`buttonrole_${db.get(`buttonrolemenu_${interaction.guild.id}`)}`)) return
        const role = interaction.guild.roles.cache.get(db.get(`buttonrole_${db.get(`buttonrolemenu_${interaction.guild.id}`)}`))
        if (!role) return
        
        if (interaction.member.roles.cache.some(r => r.id === role.id))
           return interaction.member.roles.remove(role.id).catch(() => false)
        
        else interaction.member.roles.add(role.id).catch(() => false)
    }
}