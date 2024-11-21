const osu = require('node-osu');
const { MessageEmbed } = require('discord.js');
const api = new osu.Api("575e4773ca90422384900f578163ed7d3ec12e97", {
    notFoundAsError: true,
    completeScores: false
})
const db = require("quick.db")
const cl = new db.table("Color")

module.exports = {
    name: "osu",
    run: async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        let username = args[0]
        if (!args[0]) message.channel.send('Veuillez fournir un pseudonyme d\'utilisateur valide !')
        
        api.getUser({ u: username }).then(user => {
            const osu = new MessageEmbed()
            .setTitle(`Osu! Profil`)
            .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
            .setColor(color)
            .addFields({name: "》`Pseudo :`", value: user.name})
            .addFields({name: '》`Classement :`', value: user.pp.rank})
           .addFields({name: '》`Score :`', value: user.scores.ranked})
           .addFields({name: '》`Région :`', value: user.country})
           .addFields({name: '》`Classement Région :`', value: user.pp.countryRank})
           .addFields({name: '》`Parties jouées :`', value: user.counts.plays})
          .addFields({name: '》`Précision :`', value: `${user.accuracyFormatted}`})
          .setImage(`http://s.ppy.sh/a/${user.id}}`)
            .setTimestamp()
            .setFooter(`LuminaBots ${client.config.version}` , message.author.displayAvatarURL({dynamic: true, size: 512}))  
            message.channel.send({embeds: [osu]})
        });
    }
};
 