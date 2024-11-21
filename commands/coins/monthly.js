const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const cl = new db.table("Color")
module.exports = {
 name: "monthly",
    run: async (client, message, args) => {

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        let user = message.author;
        let timeout = 2629800000;
        let amount = 30000;

        let monthly = await db.fetch(`monthly_${message.guild.id}_${user.id}`);

        if (monthly !== null && timeout - (Date.now() - monthly) > 0) {
            let time = ms(timeout - (Date.now() - monthly));

            let timeEmbed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setDescription(`Tu as déja recuperer ta récompense du mois\n\nTu pourras de nouveau la collecter dans : ${time.days}j ${time.hours}h ${time.minutes}m ${time.seconds}s `);
            message.channel.send({embeds: [timeEmbed]})
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor(color)
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setDescription(` Tu as  recuperer ta récompense du mois de ${amount} coins`); 
            message.channel.send({embeds: [moneyEmbed]})
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`monthly_${message.guild.id}_${user.id}`, Date.now())


        }
    }
}