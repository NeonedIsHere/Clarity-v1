const axios = require('axios');         
const db = require("quick.db")
const owner = new db.table("Owner")
const Discord = require("discord.js");
const ms = require("ms")
const cl = new db.table("Color")
module.exports = async (client, message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  let guildData;
  let startAt = Date.now()
  const guildName = message.guild.name;
  const channelName = message.channel.name;

  if (!message.channel.permissionsFor(message.client.user).has('SEND_MESSAGES')) {
    console.log(`Le bot n'a pas la permission de parler dans le salon "${channelName}" de la guilde "${guildName}".`);
  }
  let color = cl.fetch(`color_${message.guild.id}`)
  if (color == null) color = client.config.color

let prefix = db.get(`prefix_${message.guild.id}`) === null? client.config.prefix:db.get(`prefix_${message.guild.id}`)


  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)) !== null) {
    let perm = ""
    message.member.roles.cache.forEach(role => {
   if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
    if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
    if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
    })
    if(client.config.owner.includes(message.author.id) || owner.get(`ownermd.${message.author.id}`)  || perm || db.get(`channelpublic_${message.guild.id}_${message.channel.id}`) === true ) { 
      return message.channel.send({embeds: [new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(`Mon prefix: \`${prefix}\``)
      ]
})
    }
    // lorsqu'un utilisateur a mentionné le bot ; le bot renvoie un message d'information
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))!== null) {
      return message.channel.send({embeds: [new Discord.MessageEmbed()
        .setColor(color)
        .setDescription(`Mon prefix: \`${prefix}\``)
        ]
  })
      }
  }

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return undefined


  

  if (client.cooldown.find(c => c.id === message.author.id && c.command === command.name && c.guild === message.guild.id)) {

      let timeout = Math.abs(((Date.now() - client.cooldown.find(c => c.id === message.author.id && c.command === command.name && c.guild === message.guild.id).startedAt) / 1000) - 1000 / 1000)
      return message.channel.send(`${message.author}, Merci d'attendre **${Math.ceil(timeout)} seconde${timeout > 1 ? 's' : ''}** avant de refaire cette commande.`).then(async (m) => {
          if (message.deletable) message.delete({
              timeout: timeout * 1000
          })
          if (m.deletable) m.delete({
              timeout: timeout * 1000
          })
      })
  }

  if (command) command.run(client, message, args, prefix);
  client.cooldown.push({
      id: message.author.id,
      command: command.name,
      guild: message.guild.id,
      startedAt: startAt
  })
  let index = client.cooldown.indexOf({
      id: message.author.id,
      command: command.name,
      guild: message.guild.id,
      startedAt: startAt
  })
  setTimeout(async () => {
      client.cooldown.splice(index)
  }, 1000)




}