const Discord = require('discord.js')
const db = require('quick.db')
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
module.exports = {
    name: 'clearprevname',
    aliases: ['clearprev'],
    description:"Supprime les anciens noms d'utilisateur de l'auteur dans la base de données",
    run: async (client, message, args, prefix) => {
       let color = cl.fetch(`color_${message.guild.id}`)

            const data = db.all().filter(data => data.ID.startsWith(`prevname_${message.author.id}`));


          let clear = 0;
        for (let i = 0; i < data.length; i++) {
            db.delete(data[i].ID);
            clear++;
        };

        let success = new Discord.MessageEmbed()
        .setTitle("Prevname")
        .setDescription(`${data.length ? data.length : 0} ${data.length > 1 ? "pseudo ont été supprimés " : "pseudo a été supprimé"} de votre prevname`)
        .setColor(color)
        .setFooter(` LuminaBots ${client.config.version}` )
        return message.channel.send({ embeds: [success] })






}
}