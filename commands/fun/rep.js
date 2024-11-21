const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const db = require("quick.db");
const rep = new db.table("vouch")
const ms = require("parse-ms")
const cl = new db.table("Color")
module.exports = {
    name: "rep",
    description:"Permet de donner des points de réputation!",
    run: async(client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color



        let timeout = 43200000;

        let bump = await db.fetch(`cooldown_${message.author.id}`)
        if (bump !== null && timeout - (Date.now() - bump) > 0) {
            let time = ms(timeout - (Date.now() - bump));
            let vouchw = new Discord.MessageEmbed()
            .setAuthor(message.author.username , message.author.displayAvatarURL()).setDescription(`**Vous êtes dans un cooldown**\nTemps d'attente: ${time.hours}H , ${time.minutes}M , ${time.seconds}S`).setFooter({text:"LuminaBots"})     .setColor(color)
            return message.channel.send({ embeds: [vouchw]})        }
        let user = message.mentions.users.first()


        if(!user) {return message.channel.send({ embeds: new Discord.MessageEmbed().setAuthor(message.author.username , message.author.displayAvatarURL()).setDescription(`**${prefix}vouch @user**`).setColor(color) })}
       if(user.id === message.author.id) return message.channel.send({ embeds: new Discord.MessageEmbed().setAuthor(message.author.username , message.author.displayAvatarURL()).setDescription(`Vous ne pouvez pas vous ajouté des points de réputations vous même!`).setColor(color) })

        db.push(`userrep_${user.id}`, 1)
        db.set(`cooldown_${message.author.id}`, Date.now())
        let uvouch = new Discord.MessageEmbed()
            .setAuthor(message.author.username , message.author.displayAvatarURL()).setDescription(`1 point de réputation ajouté à ${user}`).setFooter({text:`LuminaBots ${client.config.version}` })     .setColor(color)
        message.channel.send({ embeds: [uvouch] })





    }
}