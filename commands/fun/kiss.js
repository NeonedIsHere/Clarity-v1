const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const cl = new db.table("Color")

module.exports = {
    name: "kiss",
    description:"Embrassez quelqu\'un!",
    run: async(client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        image = [
            "https://cdn.discordapp.com/attachments/580101214079942667/586670240104972288/tenorkiss.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905770058547200/kiss-2.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905771404787712/kiss-1.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905771241340945/kiss-8.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905779789332501/kiss-3.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905780304969818/kiss-4.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905787263451157/kiss-5.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905791797624843/kiss-7.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647905791587909653/kiss-6.gif",
                     "https://cdn.discordapp.com/attachments/591293302360506388/647906585049563147/kiss-9.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674396062752047125/gif-calin-cute-manga-6_1.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395754512777256/tenor_1.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395753367732224/tenor_2.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395752700575754/tumblr_m3fcr3yCQw1rp30e7o1_500.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395752193196063/giphy_2.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395751547404308/giphy_3.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395750884573184/d4739c99c24a26149802e55ce28d8f6c.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395399808876544/HJkxXNtjZ.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395399250903050/rJeB2aOP-.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674395398282149898/SJ3dXCKtW.gif",
                     "https://cdn.discordapp.com/attachments/663425106412044300/674394383914893328/tenor_4.gif"    
             ];
             
          let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
       
              
                   const embed = new MessageEmbed()
                  .setColor(color)
                   
               .setDescription(`${message.author} embrasse ${victim} `)
               .setImage(image[Math.floor(Math.random()*image.length)])
                .setTimestamp()
                .setFooter({text: `LuminaBots ${client.config.version}` })
           
             message.channel.send({embeds: [embed]});

    }
}