const Discord = require('discord.js')
const db = require('quick.db')
const owner = new db.table("Owner")
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);
const cl = new db.table("Color")
module.exports = {
    name: "stream",


run: async(client, message, args) => {
    // si l utilisateur n est pas dans les owners du bot via la db il ne peut pas utiliser cette commande

    
    if(client.config.buyer.includes(message.author.id) || db.get(`buyermd.${message.author.id}`)) { 
    
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color


    const streamerr =   new MessageEmbed()
    .setColor(color)
    .setDescription(`:x: Vous devez spécifier le nom de votre stream.`)
    .setFooter({text: `LuminaBots ${client.config.version}` , iconURL: client.user.displayAvatarURL()})
   // recupere le nom de votre stream avec un args.join(" ")

       const stream = args.join(" ")
    if (!stream) return  message.channel.send(streamerr)
    


    // defini le status du bot en streaming

    client.user.setActivity(stream, {
        type: "STREAMING",
        url: "https://www.twitch.tv/evenac"
    })

    // envoie un embed avec : votre stream désormais ${stream}

    const streamsuccess = new MessageEmbed()
    .setColor(color)
    .setTitle(`🎥 Votre Stream désormais **${stream}**`)
    .setDescription(`:white_check_mark: Votre stream a bien été mis à jour.`)
    .setFooter({text: `LuminaBots ${client.config.version}` , iconURL: client.user.displayAvatarURL()})


    message.channel.send({embeds: [
        streamsuccess
]})




}
}
}