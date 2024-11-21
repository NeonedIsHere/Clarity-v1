const Discord = require('discord.js')
const db = require('quick.db')
const cl = new db.table("Color")
module.exports = {
    name: 'addbot',
    aliases: [],
    run: async (client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        

            const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor(color)
   .setDescription(`[\`Invite Moi\`](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
        message.channel.send({embeds: [embed]});
            

        


    }
}  