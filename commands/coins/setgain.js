const Discord = require("discord.js")
const ms = require("ms");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js')
const db = require('quick.db');
const cl = new db.table("Color")
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)})}

      module.exports = {
        name : "setgain",
        run: async(client,message,args,prefix) => {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = client.config.color
               
            if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("**Perm requise - [ADMINISTRATOR]**")

            let money = await db.get(`money_${message.guild.id}_${message.author.id}`)
            if(money === null ) money = 0
           
            const embed = new Discord.MessageEmbed()
            embed.setTitle('Paramètre des récompenses')
            embed.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
      1️⃣・Changer les récompense vocal (coins/temps)
      2️⃣・Changer le nombre de coins gagné par message
      3️⃣・Changer le nombre de coins gagné par lancement de caméra
      4️⃣・Changer le nombre de coins gagné par lancement de stream
      5️⃣・Changer les récompense des batiment (coins/temps)
      
      
                       `)
          
                
           
           embed.setColor(color)
           embed.setFooter({text: `LuminaBots ${client.config.version}` })


           let gainbut = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("chrv")
                .setEmoji("1️⃣")
                .setStyle("SECONDARY")
            )
            .addComponents(
                new MessageButton()
                .setCustomId("chrm")
                .setEmoji("2️⃣")
                .setStyle("SECONDARY")
            )
            .addComponents(
                new MessageButton()
                .setCustomId("chlc")
                .setEmoji("3️⃣")
                .setStyle("SECONDARY")
            )
            .addComponents(
                new MessageButton()
                .setCustomId("chls")
                .setEmoji("4️⃣")
                .setStyle("SECONDARY")
            )
            .addComponents(
                new MessageButton()
                .setCustomId("chrb")
                .setEmoji("5️⃣")
                .setStyle("SECONDARY")
            )

            const msg = await message.channel.send({
                embeds: [embed],
                components: [gainbut]
            
                
            });


            let buybut = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("cfgb")
                    .setEmoji("​🍾")
                    .setStyle("SECONDARY")
                
            )
            .addComponents(
                new MessageButton()
                .setCustomId("cfga")
                .setEmoji("🚘")
                .setStyle("SECONDARY")
            )
            .addComponents(
                new MessageButton()
                .setCustomId("cfgm")
                .setEmoji("🏪")
                .setStyle("SECONDARY")
            )
            .addComponents(
                new MessageButton()
                .setCustomId("cfgc")
                .setEmoji("📽️")
                .setStyle("SECONDARY")
            )
            .addComponents(
                new MessageButton()
                .setCustomId("cfgr")
                .setEmoji("🚆")
                .setStyle("SECONDARY")
            )


            let filter2 = (m) => m.author.id === message.author.id

let filter1 = (i) => i.user.id === message.author.id;




const collector = message.channel.createMessageComponentCollector({
    componentType: "BUTTON",
})

collector.on("collect", async(c) => {
    
    const value = c.customId

    if (value == "chrv") {
        const ez = await message.channel.send(`Veuillez entrer le **nombre de coins gagné** en vocal. (*Mettez \`non\` pour le mettre par default*)`)
        let collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(cld => {
            if(cld.first().content === "non") {
                ez.delete()
                cld.first().delete()
                db.set(`msg_${message.guild.id}`, null)

                
            }else {
                var msg = cld.first();
        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
        
        ez.delete()
        cld.first().delete()
                                                  
        db.set(`voc_${message.guild.id}`, msg.content)
            }
        })
    }

    if (value == "chrm") {
        const ez = await message.channel.send(`Veuillez entrer le **nombre de coins gagné** par message. (*Mettez \`non\` pour le mettre par default*)`)
        let collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(cld => {
            if(cld.first().content === "non") {
                ez.delete()
                cld.first().delete()
                db.set(`msg_${message.guild.id}`, null)

                
            }else {
                var msg = cld.first();
        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
        
        ez.delete()
        cld.first().delete()
                                                  
        db.set(`voc_${message.guild.id}`, msg.content)
            }
        })
    }

    if (value == "chlc") {
        const ez = await message.channel.send(`Veuillez entrer le **nombre de coins gagné** par lancement d"une caméra. (*Mettez \`non\` pour le mettre par default*`)
        let collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(cld => {
            if(cld.first().content === "non") {
                ez.delete()
                cld.first().delete()
                db.set(`cam_${message.guild.id}`, null)

                
            }else {
                var msg = cld.first();
        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
        
        ez.delete()
        cld.first().delete()
                                                  
        db.set(`cam_${message.guild.id}`, msg.content)
            }
        })
    }


    if (value == "chls") {
        const ez = await message.channel.send(`Veuillez entrer le **nombre de coins gagné** par lancement d"un stream. (*Mettez \`non\` pour le mettre par default*`)
        let collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(cld => {
            if(cld.first().content === "non") {
                ez.delete()
                cld.first().delete()
                db.set(`stream_${message.guild.id}`, null)

                
            }else {
                var msg = cld.first();
        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
        
        ez.delete()
        cld.first().delete()
                                                  
        db.set(`stream_${message.guild.id}`, msg.content)
            }
        })
    }


    if (value == "chrb") {
        let slm = new MessageEmbed()
        slm.setTitle(`・・・・・`)
        slm.setColor(color)
        slm.setFooter({text: `LuminaBots ${client.config.version}` })
    
        slm.setDescription(`Veuillez choisir les actions avec les réactions suivantes:
        ​🍾・Configurer le salaire **d'un bar**
        🚘・Configurer le salaire **d'un garage**
        🏪・Configurer le salaire **d'un magasin**
        📽️・Configurer le salaire **d'un cinéma**
        🚆・Configurer le salaire **d'une gare**

       `)
       msg.edit({embeds: [slm], components: [buybut]})
    }
})



const collectorx = message.channel.createMessageComponentCollector({
    componentType: "BUTTON",
})



collectorx("collect", async(c) => {
    if(value == "cfgb") {
        const ez = await message.channel.send(`Veuillez entrer un **salaire (coins)**. (*Mettez \`non\` pour le mettre par default*)`)
        let collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(cld => {
            if(cld.first().content === "non") {
                ez.delete()
                cld.first().delete()
                db.set(`stream_${message.guild.id}`, null)

                
            }else {
                var msg = cld.first();
        if(isNaN(msg.content)) return  message.channel.send(`Aucun nombre trouvé pour \`${msg.content}\`.`);
        
        ez.delete()
        cld.first().delete()
                                                  
        db.set(`stream_${message.guild.id}`, msg.content)
            }

    })
}
})

           




      }
      }