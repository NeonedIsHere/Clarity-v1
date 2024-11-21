const Discord = require('discord.js')
const db = require('quick.db')
const messlog = new db.table("messlog")
module.exports = async(client, message) => {
    if (!message.author) return;
    let color = client.config.color;
    let chan = db.get(`msglog_${message.guild.id}`)
    if (!chan) return;

    let logc = client.channels.cache.get(chan)
    if (!logc) return;

    const mess = message.content

            const embed = new Discord.MessageEmbed()
            if (message.attachments.size > 0) {
                image = message.attachments.first().url
                embed.setImage(image)
            }
            embed.setAuthor({name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}`})
            embed.setTitle("**Message Supprimé**")
            embed.setThumbnail(`${message.author.displayAvatarURL()}`)
            embed.setDescription(`**${message.author.tag}**(\`${message.author.id}\`) a supprimé son message ${message.channel}\n
            ${mess}
            `)
            embed.setFooter({text: `LuminaBots ${client.config.version}`})
            embed.setTimestamp(Date.now())
            embed.setColor(color)
           if (logc) return logc.send({embeds: [embed]})
           


}


