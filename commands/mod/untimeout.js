const Discord = require("discord.js")
const db = require("quick.db")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const owner = new db.table("Owner")
const cl = new db.table("Color")
const ms = require("ms");

module.exports = {
    name: "untimeout",
    run: async(client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
            var reason = args.slice(1).join(" ");

            if (!reason) {
                reason = "`Aucune raison fournie`"
            }

            await message.guild.members.cache.get(target.id).timeout(ms("0"), reason);
            
            const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`Modération • Type: **\`unmute\`**`)
            .setColor(color)
            .setDescription(`<@${message.author.id}> a \`unmute\` ${target} pour la raison ${reason} `)
            .setFooter({text: `LuminaBots ${client.config.version}` , iconurl: message.author.displayAvatarURL()})
            message.channel.send({embeds: [embed]})
            }
            }
        }

