const Discord = require('discord.js')
const db = require("quick.db")
const moment = require('moment')
const axios = require('axios')
const fetch = require('node-fetch')
getNow = () => { return { time: new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
const cl = new db.table("Color")
module.exports = {
    name: "github",
    run: async(client, message, args, prefix) => {
         let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (!args[0]) return message.reply(`${prefix}github pseudo du github pour avoir les infos`)

        fetch(`https://api.github.com/users/${args.join('-')}`)
        .then(res => res.json()).then(body => {
            if (body.message) return message.channel.send(`Utilisateur inconnu | Merci de me donner un nom d'utilisateur valide !`);
            let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
        
            const embed2 = new Discord.MessageEmbed()
            embed2.setAuthor(`${login} Informations !`, avatar_url)
                                embed2.setThumbnail(`${avatar_url}`)
                                embed2.addField(`Pseudo`, `${login}`)
                                embed2.addField(`ID`, `${id}`)
                                embed2.addField(`Bio`, `${bio || "No Bio"}`)
                                embed2.addField(`Répertoires publique`, `${public_repos || "Aucun"}`, true)
                                embed2.addField(`Abonnés`, `${followers}`, false)
                                embed2.addField(`Abonnés à`, `${following}`, false)
                                embed2.addField(`Location`, `${location || "Pas de location"}`)
                                embed2.addField(`Date de création`, moment.utc(created_at).format("dddd, MMMM, YYYY"))
                                embed2.setFooter({text: `LuminaBots ${client.config.version}` })
                                embed2.setTimestamp()
                                embed2.setColor(color)

                                return message.reply({embeds: [embed2]})
        })
    }
    }

 