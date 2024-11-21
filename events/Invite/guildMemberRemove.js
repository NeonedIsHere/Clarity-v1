

const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const cl = new db.table("Color")
module.exports = async (client, member) => {




  let color = cl.fetch(`color_${member.guild.id}`)
    if (color == null) color = client.config.color
    if(!db.has(`users.${member.user.id}`)) db.set(`users.${member.user.id}`, {
      id: member.user.id,
      joins: [],
      bonusHistory: [],
      invites: {
          normal: 0,
          left: 0,
          fake: 0,
          bonus: 0
      }
  });




  let invite = (await member.guild.invites.fetch())
    .find(i => db.has(`invites.${i.code}`) && db.get(`invites.${i.code}`).uses < i.uses);
    let guild = member.guild;
    const salonleav = guild.channels.cache.get(
      db.get(`salonleav_${member.guild.id}`)
    );
    

    const botj = new MessageEmbed()
    .setColor(color)
    .setDescription(`Le bot ${member.toString()} nous avait rejoint en utilisant ***l'api OAuth2***`)
    .setFooter({text: `LuminaBots ${client.config.version}` })


    if(member.user.bot && salonleav) return salonleav.send({embeds: [botj]})


    const unknow = new MessageEmbed()
    .setColor(color)
    .setDescription(`**Je n'arrive pas à trouver** comment ${member.toString()} avait rejoint le serveur.`)
    .setFooter({text: `LuminaBots ${client.config.version}` })

    if(!invite && salonleav) return salonleav.send({embeds: [unknow]})


   


    if(invite.code == member.guild.vanityURLCode) {

      const vanity = new MessageEmbed()
      .setColor(color)
      .setDescription(`${member.toString()} nous avait rejoint en utilisant ***le lien d'invitation personnalisé du serveur.***`)
      .setFooter({text: `LuminaBots ${client.config.version}` })
      if(salonleav) return salonleav.send({embeds: [vanity]})
    }


    let invites = db.subtract(`invites_${member.guild.id}_${invite.inviter.id}`, 1);
let iv2= invite.inviter

    const premiumTier = {
      NONE: 0,
      TIER_1: 1,
      TIER_2: 2,
      TIER_3: 3,
    };


   


     
      let money = db.all().filter(data => data.ID.startsWith(`rewardinvite_${member.guild.id}`)).sort((a, b) => b.data - a.data)
      money.filter(x => member.guild.roles.cache.get(x.ID.split('_')[2])).map((m, i) => {
    if(invites === m.ID.split('_')[3] && !member.roles.cache.has(m.ID.split('_')[2])) {
     member.roles.add(m.ID.split('_')[2]).catch()
    }})
      let inv = db.fetch(`invites_${member.guild.id}_${invite.inviter.id}`);
      if (inv == null) inv =0
    

      const messagejoin = db.fetch(`messageleav_${member.guild.id}`);
      const content = messagejoin
          .replaceAll("{MemberName}", member)
          .replaceAll("{MemberMention}", `<@${member.id}>`)
          .replaceAll("{MemberTag}", member.user.tag)
          .replaceAll("{MemberID}", member.id)
          .replaceAll("{Server}", member.guild)
          .replaceAll("{MemberCount}", member.guild.memberCount)
          .replaceAll(
            "{ServerBoostsCount}",
            `${member.guild.premiumSubscriptionCount || "0"}`
          )
          .replaceAll("{ServerLevel}", `${premiumTier[member.guild.premiumTier]}`)
          .replaceAll(
            "{VocalMembersCount}",
            member.guild.members.cache.filter((m) => m.voice.channel).size
          )
          .replaceAll("{Invite}", invite.code)
          .replaceAll("{Inviter}", iv2)
          .replaceAll("{InviterMention}", `<@${iv2.id}>`)
          .replaceAll(
            "{OnlineMembersCount}",
            member.guild.presences.cache.filter(
              (presence) => presence.status !== "offline"
            ).size
          );
  
          const bvn = new MessageEmbed()
          .setTitle(`Au-revoir !`)
          .setDescription(content)
          .setFooter({text: `LuminaBots ${client.config.version}` })
          .setColor(color)
        if (salonleav) salonleav.send({ embeds: [bvn] });
 
  }

