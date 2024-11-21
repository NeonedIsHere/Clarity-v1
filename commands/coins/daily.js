const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const cl = new db.table("Color")
module.exports = {
 name: "daily",
    run: async (client, message, args) => {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        let user = message.author;
        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setDescription(`Tu as déja recuperer ta récompense journalière\n\nTu pourras de nouveau la collecter dans : ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send({embeds: [timeEmbed]})
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setDescription(` Tu as  recuperer ta récompense journalière de ${amount} coins`); 
            message.channel.send({embeds: [moneyEmbed]})
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


        }
    }
}