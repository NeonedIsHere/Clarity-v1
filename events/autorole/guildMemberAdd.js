const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, member) => {
    const guild = member.guild
    let rr = member.guild.roles.cache.get(db.get(`autorole_${member.guild.id}`))
    if(rr) member.roles.add(rr.id)
   

}
