const axios = require('axios');         
const db = require("quick.db")
const autoreact = new db.table("Autoreact")
const cl = new db.table("Color")
const { MessageEmbed } = require('discord.js');
module.exports = async (client, message) => {
    if (message.author.bot) return; // ignore les messages des bots
    if (!message.guild) return; // ignore les messages en dehors des serveurs
    const autoreactData = autoreact.get(`autoreact_${message.guild.id}`);
    if (!autoreactData || message.channel.id !== autoreactData.salon) return; // vérifie si l'autoreact est activé pour ce salon
    const emoji = autoreactData.emoji;
    try {
      await message.react(emoji);
    } catch (error) {
      console.error(`Impossible d'ajouter la réaction ${emoji} au message ${message.id}:`, error);
    }
}
