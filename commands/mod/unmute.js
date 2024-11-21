const Discord = require("discord.js"),
ms = require("ms"), 
cooldown = {}
const db = require("quick.db")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const owner = new db.table("Owner")
const ml = new db.table("modlog")
const cl = new db.table("Color")


module.exports = {
    name: 'unmute',
    aliases: [],
    run: async (client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const perm1 = p1.fetch(`perm1_${message.guild.id}`)
        const perm2 = p2.fetch(`perm2_${message.guild.id}`)
        const perm3 = p3.fetch(`perm3_${message.guild.id}`)
        
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){  
            let muted = await db.fetch(`muterole_${message.guild.id}`)
            let muterole = await message.guild.roles.cache.get(muted) || message.guild.roles.cache.find(role => role.name === `muet`) || message.guild.roles.cache.find(role => role.name === `Muted`) || message.guild.roles.cache.find(role => role.name === `Mute`)
            const target = message.mentions.members.first()

            var reason = args.slice(1).join(" ");

            if (!muterole) return message.channel.send(`**Ce serveur ne possède pas de role muet** \`${prefix}muterole\``)

            if (!args[0]) return message.channel.send(`**Veuillez mentionner un utilisateur !**`)
            if (!target) return message.channel.send(`**Veuillez mentionner un utilisateur !**`)

            if (!reason) {
                reason = '`Aucune raison fournie`';
            }

            try {
                await target.roles.remove(muterole);

                message.channel.send({ content: `${target} a été unmute par <@${message.author.id}> pour la raison ${reason}` })
                const log = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
                .setTitle(`Modération • Type: **\`unmute\`**`)
                    .setColor(color)
                    .setDescription(`<@${message.author.id}> a \`unmute\` ${target} pour la raison ${reason} `)
                    .setTimestamp()
                    .setFooter({ text: `LuminaBots ${client.config.version}`  })
                client.channels.cache.get(ml.get(`${message.guild.id}.modlog`)).send({ embeds: [log] }).catch(console.error)
            } catch (err) {
                return
            }

           

            


                
    }
    }

}