const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const cl = new db.table("Color")
module.exports = {
 name: "weekly",
    run: async (client, message, args) => {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        let user = message.author;
        let timeout = 604800000;
        let amount = 5000;

        let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            let timeEmbed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setDescription(`Tu as déja recuperer ta récompense hedbomadaire\n\nTu pourras de nouveau la collecter dans : ${time.days}j ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send({embeds: [timeEmbed]})
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setDescription(` Tu as  recuperer ta récompense hedbomadaire de ${amount} coins`); 
            message.channel.send({embeds: [moneyEmbed]})
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


        }
    }
}