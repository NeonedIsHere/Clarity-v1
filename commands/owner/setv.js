const Discord = require('discord.js')
const db = require('quick.db')
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const owner = new db.table("Owner")
const {
    Client,
    Message,
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require('discord.js');
const cl = new db.table("Color")
module.exports = {
    name: 'verifc',
    aliases: [],
    run: async (client, message, args, prefix) => {

 
        



       
        
        

        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = client.config.color
        let guild = message.guild
try {

    
    const embed = new MessageEmbed()
    .setTitle(`${guild.name} Verif`)
    .setColor(color)
    .setFooter({text: `LuminaBots ${client.config.version}` })

    
    let menuoptions = new MessageSelectMenu()
    .setCustomId('MenuSelection')
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder("Choisis une option")
    .addOptions([
        {
            label: "Definir le role de base avant la verif",
            value: "nvr",
            emoji: "💫"
        },
        {
            label: "Definir le role après la verif",
            value: `vr`,
            emoji: "🎀",
        },
        {
            label: "Activer l autorole de la verif",
            value: "avr",
            emoji: "💥"
        },
        {
            label: "Désactiver l autorole de la verif",
            value: "dvr",
            emoji: "💢"
        },
        {
            label: 'Configuration verif',
            value: `vconf`,
            emoji: "➰",
        },
        {
            label: "Annulé",
            value: "cancel",
            emoji: "❌",
        },
       
    ])

    const menumsg = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })

    function menuselection(i) {
        used1 = true;
    }

    //Event
    let msg = menumsg


    let filter2 = (m) => m.author.id === message.author.id

    let filter1 = (i) => i.user.id === message.author.id;
    const col = await msg.createMessageComponentCollector({
        filter: filter1,
        componentType: "SELECT_MENU"
    })

    col.on("collect", async (i) => {
        if (i.values[0] == "cancel") {
            menumsg.delete()
        }

        if (i.values[0] == "nvr") {
            const ez = await message.channel.send(`Quel est le role de base avant de passer la verif?`)
            let collected = await message.channel.awaitMessages({
                filter: filter2,
                max: 1,
                time: 60000,
                errors: ["time"]
            }).then(collected => {

              
                var msg = collected.first();

                const nvr = message.mentions.roles.first() || message.guild.roles.cache.get(msg.content)

                




                db.set(`nvrole_${message.guild.id}`, nvr.id)
                msg.channel.send(`Le rôle que je donnerai avant la verif sera désormais: \`${msg.content || "rien"}`)
                ez.delete()
                collected.first().delete()


                
                
        })
    }

    if(i.values[0] == "vr") {
        const ez = await message.channel.send(`Quel est le role que je dois donné apres la verif?`)
        let collected = await message.channel.awaitMessages({
            filter: filter2,
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(collected => {

          
            var msg = collected.first();

            const vr = message.mentions.roles.first() || message.guild.roles.cache.get(msg.content)

           




            db.set(`verole_${message.guild.id}`, vr.id)
            msg.channel.send(`Le rôle que je donnerai après la verif sera désormais: \`${msg.content || "rien"}`)
            ez.delete()
            collected.first().delete()

    })
}

if (i.values[0] == "vconf") {
    let embed = new MessageEmbed()
    .setTitle(`${message.guild.name} Verif systeme`)
    .addField("Role avant la verif", db.get(`nvrole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`nvrole_${message.guild.id}`)}> (${db.get(`nvrole_${message.guild.id}`)})`)
    .addField("Role après la verif", db.get(`verole_${message.guild.id}`) === null ? "❌" : `<@&${db.get(`verole_${message.guild.id}`)}> (${db.get(`verole_${message.guild.id}`)})`)
    .setColor(color)
    .setFooter({text: `LuminaBots ${client.config.version}` })

    message.channel.send({embeds: [embed]})
}


if (i.values[0] == "avr") {
    let embed = new MessageEmbed()
    .setTitle(`${message.guild.name} Verif systeme`)
   .setDescription("L'autorole du systeme de verif a été activer !")
    .setColor(color)
    .setFooter({text: `LuminaBots ${client.config.version}` })
    db.set(`nvroleenable_${message.guild.id}`, true)
    message.channel.send({embeds: [embed]})
    
}


if (i.values[0] == "dvr") {
    let embed = new MessageEmbed()
    .setTitle(`${message.guild.name} Verif systeme`)
   .setDescription("L'autorole du systeme de verif a été désactiver !")
    .setColor(color)
    .setFooter({text: `LuminaBots ${client.config.version}` })
    db.set(`nvroleenable_${message.guild.id}`, false)
    message.channel.send({embeds: [embed]})
}

    })

}catch (err) {
    console.log(err)
}
        

    }
}
}
