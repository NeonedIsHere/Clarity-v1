const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'],
  intents: [
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  ]
});

const { GiveawaysManager } = require('discord-giveaways');
const manager = new GiveawaysManager(client, {
  default: {
    botsCanWin: false,
    reaction: '🎉'
  }
});

const discordModals = require('discord-modals');
const ms = require('ms');
const { readdirSync } = require('fs');
const ascii = require('ascii-table');
let table = new ascii('Slash Commands');
let slash = [];
const { login } = require('./util/login.js');
login(client);
discordModals(client);
const Enmap = require('enmap');
const db = require('quick.db');
client.db = db;
const up = Date.now();
client.uptime = up;
client.points = new Enmap({ name: 'points' });
client.giveawaysManager = manager;
const guildInvites = new Map();

// charger les commandes + événements
const chargerCommandes = (dir = './commands/') => {
  readdirSync(dir).forEach(dossier => {
    const commandes = readdirSync(`${dir}/${dossier}`).filter(fichier => fichier.endsWith('.js'));

    for (const fichier of commandes) {
      const getNomFonction = require(`${dir}/${dossier}/${fichier}`);
      client.commands.set(getNomFonction.name, getNomFonction);
      console.log(`[>] [${dossier}] (${getNomFonction.name})`);
    }
  });
};

const chargerEvenements = (dir = './events') => {
  readdirSync(dir).forEach(dossier => {
    const evenements = readdirSync(`${dir}/${dossier}`).filter(fichier => fichier.endsWith('.js'));

    for (const evenement of evenements) {
      const evt = require(`${dir}/${dossier}/${evenement}`);
      const nomEvt = evenement.split('.')[0];
      client.on(nomEvt, evt.bind(null, client));
      console.log(`[>] [${dossier}] (${nomEvt})`);
    }
  });
};

console.log(table.toString());

chargerCommandes();
chargerEvenements();

require('./util/antiCrash')(client);

