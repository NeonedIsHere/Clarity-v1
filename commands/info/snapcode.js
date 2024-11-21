const { MessageEmbed } = require('discord.js')
const ms = require("ms");
const { search } = require('superagent');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const db = require('quick.db');
const cl = new db.table('Color');
module.exports = {
    name: 'snapcode',
    aliases: [],
    description: '',
    run: async (client, message, args, prefix) => {
       
        const pseudo = args[0]
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const snapcode = `https://feelinsonice.appspot.com/web/deeplink/snapcode?username=${pseudo}&size=320&type=PNG`

        const searche = new MessageEmbed()
        .setDescription(`${message.author}, mettre un pseudo Snap pour faire la recherche.`)

        if (!args.length) return message.channel.send(searche)
       
       
        const embed = new MessageEmbed()
        .setDescription("Voici votre recherche du snapcode: `\n"+pseudo+"`")
        .setImage(snapcode)
        .setColor(color)         
        message.channel.send({embeds: [embed]});

    }
}