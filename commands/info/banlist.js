const Discord = require('discord.js');
const db = require('quick.db');
const cl = new db.table("Color");
module.exports = {
    name: "banlist",
    description : "Affiche la liste des utilisateurs bannis",
    aliases : ["banl"],
    run: async(client, message, args) => {
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.");

        let guild = message.guild;

        let bans = await guild.bans.fetch();
        
        if(bans.size === 0) return message.channel.send("Aucun utilisateur bannis.");


                let color = cl.get(`color_${message.guild.id}`) || client.config.color;

              // affiche la banlist dans un embed
              const embed = new Discord.MessageEmbed()
            .setColor(color)
            .setTitle(`\`${message.guild.name}\` Ban List`)
            .setDescription(`Il y a **${bans.size}** membres bannis.\n
            `)
            .addFields({
                name: "Membres bannis",
                value: bans.map(ban => `[\`${ban.user.tag}\`](https://discord.com/users/${ban.user.id}) | \`${ban.reason || 'Aucune Raison donner'}\``).join("\n"),
                inline: true
            })
                message.channel.send({embeds: [embed]});
    }
}