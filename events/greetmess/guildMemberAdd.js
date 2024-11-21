const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = async (client, member) =>  {
    if (member.user) {

        let guild = member.guild;
    let ghostsettings = db.get(`ghostsettings_${member.guild.id}`);

    if (!ghostsettings) return;

    if (ghostsettings === false) return;


    if (ghostsettings === true) {
        const salonghost = guild.channels.cache.get(
            db.get(`salonghost_${member.guild.id}`)
          );
          if (!salonghost) return;

          const salonghost2 = guild.channels.cache.get(
            db.get(`salonghost2_${member.guild.id}`)
          );
          if (!salonghost2) return;

          const salonghost3 = guild.channels.cache.get(
            db.get(`salonghost3_${member.guild.id}`)
          );
          
          if (!salonghost3) return;

          const salonghost4 = guild.channels.cache.get(
            db.get(`salonghost4_${member.guild.id}`)
          );
          if (!salonghost4) return;

          const salonghost5 = guild.channels.cache.get(
            db.get(`salonghost5_${member.guild.id}`)
          );
          if (!salonghost5) return;


          if (salonghost) salonghost.send({ content: `<@${member.id}>` }).then(message =>

            // apres 10 secondes le bot supp le message
            setTimeout(() => message.delete(), 1000)
            );

            if (salonghost2) salonghost2.send({ content: `<@${member.id}>` }).then(message =>

            // apres 10 secondes le bot supp le message
            setTimeout(() => message.delete(), 1000)
            );

            if (salonghost3) salonghost3.send({ content: `<@${member.id}>` }).then(message =>

            // apres 10 secondes le bot supp le message
            setTimeout(() => message.delete(), 1000)
            );

            if (salonghost4) salonghost4.send({ content: `<@${member.id}>` }).then(message =>

            // apres 10 secondes le bot supp le message
            setTimeout(() => message.delete(), 1000)
            );

            if (salonghost5) salonghost5.send({ content: `<@${member.id}>` }).then(message =>

            // apres 10 secondes le bot supp le message
            setTimeout(() => message.delete(), 1000)
            );
    }

    }
}