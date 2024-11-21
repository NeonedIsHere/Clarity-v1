const db = require('quick.db')
const Discord = require("discord.js")
const cl = new db.table("Color")
const { MessageEmbed } = require('discord.js')
module.exports = async (client, interaction, message) => {

    const color = await cl.fetch(`color_${interaction.guild.id}`)
    let guild = interaction.guild

    const vlog =  guild.channels.cache.get(db.get(`${interaction.guild.id}.logverif`))
 
    
      let rRole = db.get(`verole_${interaction.guild.id}`)
      const role = interaction.guild.roles.cache.get(rRole);




      if(interaction.customId == "verif"){
        if (!interaction.member.roles.cache.has(role.id)) {
            interaction.reply({ content: `${interaction.user}, tu as passé la vérification et obtenu le rôle \`${role.name}\``, ephemeral: true })
            interaction.member.roles.add(role).catch(err => console.log(err))
            const x512 = interaction.user.displayAvatarURL({ format: "png", dynamic: true, size: 512 });
            const vlogu = new MessageEmbed()
            .setTitle(`${interaction.user.username}\n-\n${guild.name}`)
            .addFields({
              name: "Utilisateur",
              value: `${interaction.user}`,
              inline: true
            },
            {
              name: "ID",
              value: `${interaction.user.id}`,
              inline: true
            },
            {
              name: "Rôle",
              value: `${role.name}`,
              inline: true
            },
            {
              name: "Verif Du Serveur",
              value: `${guild.name}`,
              inline: true
            },
            {
              name: "ID du Serveur",
              value: `${guild.id}`,
              inline: true
            },
            {
              name: "Nous sommes maintenant sur le serveur",
              value: `${guild.memberCount}`,
              inline: true
            },
            {
              name: "Je suis sur",
              value: `${client.guilds.cache.size} serveurs`,
              inline: true
            }
            )
            .setImage(x512)
              .setColor(color)
              .setTimestamp()
              .setFooter({text: `LuminaBots ${client.config.version}` })

           if (vlog) vlog.send({embeds: [vlogu]})
        }
      }
}