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

module.exports = async (client, interaction, message) => {
  
  const row = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId("claimt")
    .setLabel("Prendre en charge")
    .setStyle("PRIMARY"),

    new MessageButton()

      .setCustomId("close")
      .setLabel("Fermer")
      .setStyle("DANGER"),

      new MessageButton()
      .setCustomId("closewr")
      .setLabel("Fermer avec une raison")
      .setStyle("DANGER"),

      new MessageButton()
      .setCustomId("transcipt")
      .setLabel("Transcript")
      .setStyle("PRIMARY")
  );

  
  const closereason = new Modal()
  .setCustomId("ticketclose")
  .setTitle("Fermer le ticket")
  .addComponents(
    new TextInputComponent()
    .setCustomId("raison")
    .setLabel("Raison")
    .setStyle('SHORT')
    .setPlaceholder("Quel est la raison de la fermeture de votre ticket?")
    .setRequired(true),
  )

  const ticketlog = ticketlogg.get(`${interaction.guild.id}.ticketlog`);
  let rolestaff = dbrolestaff.get(`rolestaff_${interaction.guild.id}`);
  if (rolestaff == null) rolestaff = client.user.id;

  
  let num = db.get(`ticketnum_${interaction.guild.id}` || 0);

  if(interaction.customId == "close") {
    interaction.reply({
      content: `Votre ticket sera supprimé dans **3 secondes**`,
      ephemeral: true,
    })
      .then((channel) => {
        setTimeout(() => interaction.channel.delete(), 2000);
      });

    const embed = new Discord.MessageEmbed().setDescription(
      `Ticket : **__${interaction.channel.name}__**\n Numéro de ticket : **${num}**\n Fermé par : **<@${interaction.member.id}>**`
    );
    const ticketchannel = client.channels.cache.get(ticketlog)
    if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)

  }

  if (interaction.customId == "transcipt") {
    interaction.reply({ content: `Transcript en cours`, ephemeral: true });

      const msgd = await interaction.channel.send({
        content:
          "Récupération des messages, cela peut prendre un certain temps...",
      });
      const fetchAll = require("discord-fetch-all");

      const allMessages = await fetchAll.messages(interaction.channel, {
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
        `Voici les logs du salon ${interaction.channel.name} - ${interaction.channel.id} sur le serveur ${interaction.guild.name}\n\u200b\n` +
          results,
        {
          extension: "diff",
          url: "https://haste.chaun14.fr/",
        }
      )
        .then((haste) => {
          fs.writeFile(
            `./${interaction.channel.id}_${interaction.member.id}`,
            results,
            () =>
              setTimeout(function () {
                fs.unlink(
                  `./${interaction.channel.id}_${interaction.member.id}`,
                  (err) => {
                    if (err) throw err;
                  }
                );
              }, 1000)
          );
          msgd.edit({
            content: `Je vous ai envoyé le **transcript** du salon en message privé`,
          });

          interaction.member.send({
            content: `Voici le **transcript** du salon que vous pouvez télécharger ou le haste : ${haste} `,
            files: [
              {
                attachment: `./${interaction.channel.id}_${interaction.member.id}`,
                name: `log${interaction.channel.id}.txt`,
              },
            ],
          });
          // 1000ms = 1sec
        })
        .catch((error) => {
          console.error(error);
        });

      const embed = new Discord.MessageEmbed().setDescription(
        `<@${interaction.member.id}> vient de récuperer le Transcript de son ticket \nTicket : __${interaction.channel.name}__`
      );

      const ticketchannel = client.channels.cache.get(ticketlog)
      if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)
  }

  let DejaUnChannel = interaction.guild.channels.cache.find(
    (c) => c.topic == interaction.user.id
  );


 

  if (interaction.customId === "closewr") {
    showModal(closereason, {
      client: client,
      interaction: interaction,
    })
  }

    // lorsque qu'un staff clique sur le bouton "claimt" le bouton change de texte et affiche : claim par ${interaction.user.username} et supprime les autres messages
  if (interaction.customId == "claimt") {
    const embed = new MessageEmbed()
    .setDescription(`Ticket: ${interaction.channel} \n pris en charge par : \n <@${interaction.user.id}>`)
    .setFooter({text: `LuminaBots ${client.config.version}` , iconURL: interaction.user.displayAvatarURL()})
    
    const claimr = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("claimed")
      .setLabel("Claim par" + "\n" + interaction.user.username)
      .setStyle("DANGER")
      .setDisabled(),
  
      new MessageButton()
  
      .setCustomId("close")
      .setLabel("Fermer")
      .setStyle("DANGER"),
  
      new MessageButton()
      .setCustomId("closewr")
      .setLabel("Fermer avec une raison")
      .setStyle("DANGER"),
  
      new MessageButton()
      .setCustomId("transcipt")
      .setLabel("Transcript")
      .setStyle("PRIMARY")
    ) 

    // le bot recupere tout les message du channel

    const fetchAll = require("discord-fetch-all");
    const allMessages = await fetchAll.messages(interaction.channel, {
      reverseArray: true,
      userOnly: false,
      botOnly: true,
      pinnedOnly: false,
    });

    // le bot supprime tout les message du channel quand on clique sur le bouton "claimt"

    allMessages.forEach((message) => {
      message.delete();
    })

    interaction.reply({
      embeds: [embed],
      components: [claimr],
    });



    
    

  }

  if (interaction.customId == "ticketo") {
    if (DejaUnChannel)
      return interaction.reply({
        content: "❌ Vous avez déja un ticket d'ouvert sur le serveur.",
        ephemeral: true,
      });

      db.add(`ticketnum_${interaction.guild.id}`, 1);
    
      let number = db.get(`ticketnum_${interaction.guild.id}`);

      let categorie = ct.fetch(`${interaction.guild.id}.categorie`);
      if (categorie === null) {
        interaction.guild.channels
          .create(`ticket-${number}`, {
            type: "GUILD_TEXT",
            topic: `${interaction.user.id}`,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [`VIEW_CHANNEL`],
              },
              {
                id: interaction.user.id,
                allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`],
              },
              {
                id: rolestaff,
                allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`],
              },
            ],
          })
          .then((c) => {
            const ticket = new MessageEmbed()
              .setTitle("📧・Ticket")
              .setDescription(
                `<@${interaction.member.id}> Veuillez bien détailler votre requète pour qu\'un administrateur du serveur vienne prendre en charge votre ticket.`
              )
              .setFooter({ text: `LuminaBots ${client.config.version}`  });
              // supprime le message apres 5sec
       

           

           let msg = c.send({ embeds: [ticket], components: [row] });
            interaction.reply({
              content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`,
              ephemeral: true,
            });

            const embed = new Discord.MessageEmbed().setDescription(
              `<@${interaction.member.id}> vient d'ouvrir un ticket`
            );

            const ticketchannel = client.channels.cache.get(ticketlog)
            if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)
          });
      } else {
        let number = db.get(`ticketnum_${interaction.guild.id}`);
        interaction.guild.channels
          .create(`ticket-${number}`, {
            type: "GUILD_TEXT",
            topic: `${interaction.user.id}`,
            parent: `${categorie}`,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [`VIEW_CHANNEL`, `SEND_MESSAGES`],
              },
              {
                id: interaction.user.id,
                allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`],
              },
              {
              id: rolestaff,
              allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`],
              }
            ],
          })
          .then((c) => {
            const ticket = new MessageEmbed()
              .setTitle("📧・Ticket")
              .setDescription(
                `<@${interaction.member.id}> Veuillez bien détailler votre requète pour qu\'un administrateur du serveur vienne prendre en charge votre ticket.`
              )
              .setFooter({ text: `LuminaBots ${client.config.version}`  });

            let msg = c.send({ embeds: [ticket], components: [row] });
            interaction.reply({
              content: `🔓 Votre ticket à été ouvert avec succès. <#${c.id}>`,
              ephemeral: true,
            });

            const embed = new Discord.MessageEmbed().setDescription(
              `<@${interaction.member.id}> vient d'ouvrir un ticket`
            );

            
            const ticketchannel = client.channels.cache.get(ticketlog)
            if (ticketchannel) ticketchannel.send({ embeds: [embed] }).catch(() => false)
          });
      }

    





   
  
};
}
