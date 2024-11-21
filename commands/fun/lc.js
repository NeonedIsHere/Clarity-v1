const currentGames = {};
const Discord = require("discord.js"),
db = require("quick.db")
md5 = require("md5");
const cl = new db.table("Color")
module.exports = {
    name :"lc",
    aliases:["lovecalc"],
    description:"calcul un pourcentage d'amour entre deux membres mentionnés",
    run: async(client, message, args) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const firstMember = message.mentions.members.filter(m => m.id !== message.author.id).first();
        if (!firstMember)
        return message.channel.send("MISSING MEMBER");
        const secondMember =
        message.mentions.members
        .filter(m => m.id !== firstMember.id)
        .filter(m => m.id !== message.author.id)
        .first() || message.member;
        if(!secondMember)
        return message.error("MISSING MEMBER");
        const members = [firstMember, secondMember].sort(
                (a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)
            );
            const hash = md5(
                `${members[0].id}${members[1].user.username}${members[0].user.username}${members[1].id}`
            );

        const string = hash
        .split("")
        .filter(e => !isNaN(e))
        .join("");
        const percent = parseInt(string.substr(0, 2), 10);

        const embed = new Discord.MessageEmbed()
        .setTitle("❤️ LoveCalc")
        .setDescription(`${firstMember.user.username} et ${secondMember.user.username} s'aime à ${percent}% `)
          .setImage(firstMember.user.displayAvatarURL({ dynamic: true }) + secondMember.user.displayAvatarURL({ dynamic: true }))
          .setColor(color)
          message.channel.send({embeds: [embed]})
    }
}