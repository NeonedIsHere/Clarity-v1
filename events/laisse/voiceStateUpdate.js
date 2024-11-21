const Discord = require('discord.js');
const db = require('quick.db');
module.exports = async (client, oldState, newState) => {
  const member = newState.member;
  const possesseurID = db.get(`laisse_${member.id}`);
  if (!possesseurID) return;
  // Vérifie si le possesseur de la laisse a quitté le canal vocal
  const possesseur = member.guild.members.cache.get(possesseurID);
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;
  if (oldChannel?.id === newChannel?.id) return;
  if (oldChannel === newChannel) return;
  if (possesseur.voice.channelId === null) {
    // Le possesseur de la laisse a quitté le canal vocal, donc le membre en laisse est retiré également
    member.voice.disconnect();
    } else {
    // Le possesseur de la laisse a changé de canal vocal, donc le membre en laisse le suit
    member.voice.setChannel(possesseur.voice.channelId);
    }
    if (oldState.channelId === possesseur.voice.channelId && newState.channelId !== possesseur.voice.channelId) {
      member.voice.setChannel(possesseur.voice.channelId);
    }
};