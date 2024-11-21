const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms");
const fs = require("fs");

module.exports = {
    name: 'templock',
    aliases: [],
    description:"permet de verrouiller temporairement l'accès à des salons",
    run: async (client, message, args, prefix) =>{
        let perm = ""
        message.member.roles.cache.forEach(role => {
            if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
        let memberRole = db.get(`memrole_${message.guild.id}`)
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) ||message.channel
        let locktime = args[0];
        if (!locktime)
        return message.reply(
            `Vous n'avez pas défini de temps pour la durée du lock`
          );

          try{
            channel.permissionOverwrites.edit(memberRole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
          })


        } catch (e) {
            ;
        }
        message.channel.send({ content: `Les membres ne peuvent plus parler dans <#${channel.id}> pendant ${locktime}` });


        setTimeout(function () {
            channel.permissionOverwrites.edit(memberRole, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
            });
            message.channel.send({ content: `Les membres peuvent parler dans <#${channel.id}>` })
        },  ms(locktime))

    }


    }
}