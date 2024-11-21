const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const {
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")
module.exports = {
    name: "massiverole",
    description: "Ajoute un rôle à tout les membres de votre serveur",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        const addrole = db.get(`massiverolera_${message.guild.id}`)



        // avoir le nombre de membres concerné
        let memb = message.guild.members.cache.filter(m => m.roles.cache.has(addrole)).size
        // message pour dire si les bots sont concerns ou pas

        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        let embed = new MessageEmbed()
        .setColor(color)
        embed.setTitle(`${message.guild.name} massive Role`)
        embed.addFields({
            name: `Temps estimé`,
            value: `${ms([memb] * 1000)}`
        })



        let button1 = new MessageButton()
        button1.setCustomId("addrole")
        button1.setLabel("Rôle à ajouter")
        button1.setStyle("SECONDARY")

        let menum = new MessageActionRow()
        menum.addComponents(button1)

        let button = new MessageActionRow()
        button.addComponents(
            new MessageButton()
          .setCustomId("massiverole")
          .setLabel("Lancer le massiverole")
          .setStyle("SECONDARY")
        )
        message.channel.send({embeds: [embed], components: [menum,button]})

        let collector = message.channel.createMessageComponentCollector({
        });

        collector.on("collect", async (i) => {
            i.deferUpdate()
            if (i.user.id !== message.author.id) return message.channel.send("Vous ne pouvez pas utiliser cette intéraction.")
            if (i.customId === "addrole") {

                    let question = await message.channel.send({content: "Veuillez saisir le rôle à ajouter"})
                    let collected = await message.channel.awaitMessages({
                        filter: (m) => m.author.id === message.author.id,
                        max: 1,
                        time: 10000
                    }).then(collected => {
                        let msg = collected.first()
                        if (!msg) return message.channel.send("Veuillez saisir le rôle à ajouter")
                        let role = message.guild.roles.cache.get(msg.content) || msg.mentions.roles.first()
                        if (!role) return message.channel.send("Aucun rôle n'a été trouvé.")

                        db.set(`massiverolera_${message.guild.id}`, role.id)
                        message.channel.send({content: "Rôle configuré avec succès" + `${role}`})
                    })


            }
            if (i.customId === "massiverole") {
                let addrole = db.get(`massiverolera_${message.guild.id}`)
                let role = message.guild.roles.cache.get(addrole)
                if (!role) return message.channel.send("Aucun rôle n'a été trouvé.")
                message.channel.send({content: "Je suis entrain d'ajouter le rôle " + `${role}` + `à ${message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size} membres`}).then(m => {
                    message.guild.members.cache.filter(m => !m.user.bot && !m.roles.cache.has(role.id)).forEach(member => {
                      member.roles.add(role);
                    });
                    m.edit(`Le rôle ${role} a été ajouté à ${message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size} membres.`);
                  });
                db.set(`massiverolera_${message.guild.id}`, null)




            }


    })
}
}