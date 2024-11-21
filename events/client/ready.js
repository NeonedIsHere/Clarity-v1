const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json")
const getNow = () => {
  return {
    time: new Date().toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
  };
};

module.exports = async (client) => {
  console.log(`[BOT]: ${client.user.username} est connecté à ${getNow().time}`);
    console.log(`[BUYER TAG]: ${client.users.cache.get(config.buyer).tag} `);
  

    // le bot recupere le nombre de serveur et de membres qui l'utilisent

    const status = db.get('nomstatut');
    const type = db.get('type');
    client.user.setActivity(status || "Lumina Gestion v2", { type: type || "WATCHING", url: "https://twitch.tv/tsubasa_t3h" } )
  }

    

