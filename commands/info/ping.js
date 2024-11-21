const {MessageEmbed} = require("discord.js")
const db =  require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name: "ping",
    description: "Regarde la latence du bot",
    run: async(client, message, args) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const embed = new MessageEmbed()
        .addField("Ping", `${client.ws.ping}ms`)
        .setFooter({text: `LuminaBots ${client.config.version}` })
        .setColor(color);
    const msg = await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
}