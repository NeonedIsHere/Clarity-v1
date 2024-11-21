const Discord = require('discord.js')
const db = require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name: "serverinv",
    run: async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if (args[0].length > 10){

            const guild = client.guilds.cache.get(args[0])
            if (!guild) return message.channel.send(`Aucun serveur de trouvé pour \`${args[0] ||"rien"}\``)

            guild.channels.cache.filter((e) => e.isText()).first().createInvite()
            .then(invite => message.channel.send('https://discord.gg/' + invite.code))
            .catch (() => message.channel.send(`Impossible d'avoir l'invitation de \`${guild.name}\``))
        }
        else{
            const num = parseInt(args[0]) - 1
            const Guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(x => x.id)
            const GuildID = Guilds[num]
            const myGuild = client.guilds.cache.get(GuildID)
            if (!myGuild) return message.channel.send(`Aucun serveur de trouvé pour le ${args.length > 1 ? "nombre" : "chiffre"} \`${args[0] ||"rien"}\``)
            const id = myGuild.channels.cache.filter(e => e.isText()).first() 
            const invite = id.createInvite()

                .then(invite => message.channel.send('https://discord.gg/' + invite.code))
                .catch (() => message.channel.send(`Impossible d'avoir l'invitation de \`${myGuild.name}\``))

        }            
    }
};
 