const {
    Permissions,
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
    Message,
    DiscordAPIError,
  } = require("discord.js");
  const Discord = require("discord.js");
  const messageCreate = require("../client/messageCreate");
  const db = require("quick.db");
  const { Modal, TextInputComponent, SelectMenuComponent, showModal } = require('discord-modals');
  const ct = new db.table("CategorieTicket");
  const moment = require("moment");
  const fs = require("fs");
  const ticketlogg = new db.table("ticketlog");
  const dbrolestaff = new db.table("Rolestaff");

  module.exports = async (client, modal) => {
    if (modal.customId === "ticketclose") {
      const ticketlog = ticketlogg.get(`${modal.guild.id}.ticketlog`);
        const raisonCl = modal.getTextInputValue('raison');
        const embed = new Discord.MessageEmbed()
        .setTitle("Fermé le ticket ?")
        .setDescription(
          `
          <@${modal.member.id}> merci d'avoir donné la raison de la fermeture, votre ticket va être fermé dans quelques secondes!
          \n Raison : ${raisonCl}          
          `
        )
        .setFooter({ text: `LuminaBots ${client.config.version}`  });
        const fetchAll = require("discord-fetch-all");

        const allMessages = await fetchAll.messages(modal.channel, {
          reverseArray: true,
          userOnly: true,
          botOnly: false,
          pinnedOnly: false,
        });
    
        var results = allMessages
          .map(
            (msg) =>
              `${moment(msg.createdTimestamp)
                .format("DD/MM/YYYY - hh:mm:ss a")
                .replace("pm", "PM")
                .replace("am", "AM")}] - ${msg.author.username} - (${
                msg.author.id
              }) : ${msg.content}`
          )
          .join("\n");
    
        const hastebin = require("hastebin-gen");
    
        hastebin(
          `Voici les logs du salon ${modal.channel.name} - ${modal.channel.id} sur le serveur ${modal.guild.name}\n\u200b\n` +
            results,
          {
            extension: "diff",
            url: "https://haste.chaun14.fr/",
          }
        )
          .then((haste) => {
            fs.writeFile(
              `./${modal.channel.id}_${modal.member.id}`,
              results,
              () =>
                setTimeout(function () {
                  fs.unlink(
                    `./${modal.channel.id}_${modal.member.id}`,
                    (err) => {
                      if (err) throw err;
                    }
                  );
                }, 1000)
            );
    
            client.channels.cache.get(ticketlog).send({
              content: `Voici le **transcript** du ticket: __${modal.channel.name}__`,
              files: [
                {
                  attachment: `./${modal.channel.id}_${modal.member.id}`,
                  name: `log${modal.channel.id}.txt`,
                },
              ],
            });
          })

        const msg = await modal.reply({embeds: [embed], ephemeral: true}).then((channel) => {
            setTimeout(() => modal.channel.delete(), 2000);
          });

          const embed1 = new Discord.MessageEmbed()
          .setDescription(
            `
            Ticket: ${modal.channel.name}
            Supprimé par: ${modal.member.user.tag}
            Raison: ${raisonCl}
            `)
            .setFooter({ text: `LuminaBots ${client.config.version}` , iconURL: modal.member.user.displayAvatarURL({ dynamic: true }) });
            

            const ticketchannel = client.channels.cache.get(ticketlog)
            if (ticketchannel) ticketchannel.send({embeds: [embed1]});
      




        
    }
  }