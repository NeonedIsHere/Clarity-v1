const currentGames = {};
const Discord = require("discord.js"),
md5 = require("md5");
const db = require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name: 'gay',
    description:"À quel taux êtes-vous Homo?",
    run: async (client, message, args, prefix ) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const member = message.mentions.members.filter(m => m.id !== message.author.id).first();
       

        
        if(member.id === "1072553881134972970") {

            let noyou = new Discord.MessageEmbed().setTitle("Gay 🏳️‍🌈").setDescription(`<@1072553881134972970> est gay à 0%!`).setColor(color).setThumbnail(member.user.avatarURL({dynamic: true}))
        .setFooter({text:`LuminaBots ${client.config.version}` })
            return message.channel.send({embeds: [noyou]})

        } else if (member.id === "943308906208297061"){
            let noyou = new Discord.MessageEmbed().setDescription(`<@943308906208297061> est gay à 0%!`).setColor(color).setThumbnail(member.user.avatarURL({dynamic: true}))
        .setFooter({text:`LuminaBots ${client.config.version}` })
            return message.channel.send({embeds: [noyou]})
        }  else if (member.id === "428992946168397832") {
            let noyou = new Discord.MessageEmbed().setDescription(`<@428992946168397832> est gay à 0%!`).setColor(color).setThumbnail(member.user.avatarURL({dynamic: true}))
        .setFooter({text:`LuminaBots ${client.config.version}` })
            return message.channel.send({embeds: [noyou]})

        }else {
        const hash = md5(
            `${member.id}${member.user.username}`
        );

        const string = hash 
        .split("")
        .filter(e => !isNaN(e))
        .join("");
        const percent = parseInt(string.substr(0, 2), 10);

        const embed = new Discord.MessageEmbed()
        .setTitle("Gay 🏳️‍🌈")
        .setDescription(`${member.user.username} est gay à ${percent}%`)
        .setColor(color)
        .setThumbnail(member.user.avatarURL({dynamic: true}))
        .setFooter({text:`LuminaBots ${client.config.version}` })

        message.channel.send({embeds: [embed]})
        }
    } 
}