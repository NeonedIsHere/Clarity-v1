const Discord = require('discord.js')
const db = require('quick.db')
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const owner = new db.table("Owner")
const backup = require("discord-backup");
const ms = require("ms")
function duration(mss) {
    const sec = Math.floor((mss / 1000) % 60).toString()
    const min = Math.floor((mss / (1000 * 60)) % 60).toString()
    const hrs = Math.floor((mss / (1000 * 60 * 60)) % 60).toString()
    const days = Math.floor(mss / (1000 * 60 * 60 * 24)).toString()
    return `${days.padStart(2, '') == "0" ? "" : `${days.padStart(2, '')} jours, `}${hrs.padStart(2, '') == "0" ? "" : `${hrs.padStart(2, '')} heures, `}${min.padStart(2, '') == "0" ? "" : `${min.padStart(2, '')} minutes et `}${sec.padStart(2, '')} secondes`
}
const cl = new db.table("Color")
module.exports = {
    name: 'ebackup',
    aliases: [],
    run: async (client, message, args, prefix) => {
   
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            const create = args[0] === "create";
            const list = args[0] === 'list';
            const load = args[0] === 'load';
            const del = args[0] === 'delete'

             if (!args[0]) {
            const helpEmbed = new Discord.MessageEmbed()
                
                .setColor(color)
                .setTimestamp()

                .setFooter({text: `LuminaBots ${client.config.version}` })
                .addField('Backup:', `[\`ebackup create\`](https://discord.gg/LuminaBots) ・ Permet de créer une backup des emotes du serveur actuel\n[\`ebackup delete\`](https://discord.gg/LuminaBots) ・ Permet de supprimer une backup d emote\n[\`ebackup list\`](https://discord.gg/LuminaBots) ・ Permet d'afficher la liste de toutes les backup d emote`)
            message.channel.send({embeds : [helpEmbed]})
        } 

        if (create) {
            let code = args[1]
            if(!code) return message.reply(`Merci d'entrer un nom de backup !`)
            let bruh = `backupemoji_${client.user.id}`;
            message.channel.send(`Backup en cours...`)
                
                let emoji = message.guild.emojis.cache;
            
            
                let arr = new Array();
                emoji.forEach(e => arr.push(e.toString()));
                db.push(bruh, {
                    code: code,
                    server: message.guild.name,
                    emojis: arr,
                    size: emoji.size
                });
                
                return message.channel.send(`${emoji.size} ${emoji.size?"émojis ont été sauvegardés":"émoji à été sauvegardé"}`);
    }

    if (list) {
        let bkp = db.get(`backupemoji_${client.user.id}`)
        if(bkp === null) return message.channel.send(new Discord.MessageEmbed().setColor(color).setTitle("Aucune backup d'émoji enregistrée"))

       

      
       

            message.channel.send(`Voici Votre liste de backup d emoji:\n${bkp
            .map(r => r)
            .map((r, i) => `${r.code}`)
              .slice(0, 30)
            }`);
       
    }

   if (load) {
    let code = args[1]
    if(!code ) return
   let pog = db.get(`backupemoji_${client.user.id}`);
   if (pog) {
       let data = pog.find(x => x.code === code)
       if (!data) return
       if (!data.emojis) return
      if (!data.size) return
      message.channel.send(`Chargement de la backup...`)

       data.emojis.forEach(emote => {
           let emoji = Discord.Util.parseEmoji(emote);
           if (emoji.id) {
               const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
                   emoji.animated ? 'gif' : 'png'
               }`;
               message.guild.emojis
                   .create(`${Link}`, `${`${emoji.name}`}`)
                   .catch(error => {
                                         });
           }
   })
}
   }

   if (del) {
    let code = args[1]
    if(!code ) return
   let pog = db.get(`backupemoji_${client.user.id}`);
   if (pog) {
       let data = pog.find(x => x.code === code)
       if (!data) return
      
db.set(`backupemoji_${client.user.id}`,  db.get(`backupemoji_${client.user.id}`).filter(s => s.code !==code))
message.channel.send(`Backup supprimée`) 
}
        }
    }
    }
}
 