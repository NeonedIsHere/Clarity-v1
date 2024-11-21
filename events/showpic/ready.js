const Discord = require('discord.js')
const db = require('quick.db')
const cl = new db.table("Color")
const pfp = new db.table("Pfp")
const bfp = new db.table("Bfp")
const {MessageButton, MessageActionRow} = require('discord.js')
const ms = require("ms")
module.exports = async(client) => {
    setInterval(() => {
        client.guilds.cache.forEach(async guild => {
            
            let color = cl.fetch(`color_${guild.id}`)
            if (color == null) color = client.config.color

            const channelId = pfp.get(`${guild.id}.channelpfp`)
            if (!channelId) return;
            const channel = guild.channels.cache.get(channelId)
            if (!channel) return;
            const user = client.users.cache.random();
            let status = pfp.get(`${guild.id}.statuspfp`)
            if (status == false) return;
            


            let dl = new MessageButton()
            dl.setStyle("LINK")
            dl.setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
            dl.setLabel("Télécharger")
            const row = new MessageActionRow()
            row.addComponents(dl)
            const embed = new Discord.MessageEmbed({ footer: { text: user.username } })
               
                .setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
                .setColor(color)
                .setFooter({text: `${user.username} - LuminaBots ${client.config.version}`});
        
          
            channel.send({ embeds: [embed], components: [row]});
        })
    }, ms("3s"))

    setInterval(() => {
        client.guilds.cache.forEach(async guild => {
            
            let color = cl.fetch(`color_${guild.id}`)
     

            const channelId = bfp.get(`${guild.id}.channelbfp`)
            if (!channelId) return;
            const channel = guild.channels.cache.get(channelId)
            if (!channel) return;
            let status = bfp.get(`${guild.id}.statusbfp`)
            if (status == false) return;
            async function getUserBannerURL() {
                return new Promise(async (resolve, reject) => {
                    const memberBanner = guild.members.cache.filter((member) => member.displayAvatarURL({ format: 'png', size: 512, dynamic: true })).random();
                    const mBanner = await memberBanner.user.fetch(true);
                    resolve(mBanner);
                });
            };
            getUserBannerURL().then(user => {
                if(!user.bannerURL({ format: 'png', size: 512, dynamic: true })) getUserBannerURL();
                else {
                    const embedBanner = new Discord.MessageEmbed({ image: { url: user.bannerURL({ format: 'png', size: 512, dynamic: true }) }, color: color, footer: {text:`${user.username} - LuminaBots ${client.config.version}`} });
                    let dl = new MessageButton()
                    .setStyle("LINK")
                    dl.setLabel("Télécharger")
                    dl.setURL(user.bannerURL({ format: 'png', size: 512, dynamic: true }))
                    channel.send({ embeds: [embedBanner], components: [new MessageActionRow().addComponents(dl)] }); //
                
                };
            });
        
          
          
        })
    }, ms("3s"))


  


    }



    