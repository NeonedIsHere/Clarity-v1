const { MessageEmbed } = require('discord.js');
const permissions = require('../../util/perms.json');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const db = require("quick.db")
const p1 = new db.table("Perm1")
const p2 = new db.table("Perm2")
const p3 = new db.table("Perm3")
const p4 = new db.table("Perm4")
const p5 = new db.table("Perm5")
const p6 = new db.table("Perm6")
const p7 = new db.table("Perm7")
const p8 = new db.table("Perm8")
const pgs = new db.table("PermGs")
const pgp = new db.table("PermGp")
const pga = new db.table("PermGa")
const rolestaff = new db.table("Rolestaff")
const cl = new db.table("Color")
module.exports = {
    name: 'perml',
    aliases: [],
    description: '',
    run: async (client, message, args, prefix) => {

          const color = await cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
            
            let perm1 = `<@&${p1.fetch(`perm1_${message.guild.id}`)}>`
            if (perm1 == `<@&null>`) perm1 = "Non configuré"

            let perm2 = `<@&${p2.fetch(`perm2_${message.guild.id}`)}>`
            if (perm2 == `<@&null>`) perm2 = "Non configuré"

            let perm3 = `<@&${p3.fetch(`perm3_${message.guild.id}`)}>`
            if (perm3 == `<@&null>`) perm3 = "Non configuré"

            let perm4 = `<@&${p4.fetch(`perm4_${message.guild.id}`)}>`
            if (perm4 == `<@&null>`) perm4 = "Non configuré"
           
            let perm5 = `<@&${p5.fetch(`perm5_${message.guild.id}`)}>`
            if (perm5 == `<@&null>`) perm5 = "Non configuré"

            let perm6= `<@&${p6.fetch(`perm6_${message.guild.id}`)}>`
            if (perm6 == `<@&null>`) perm6 = "Non configuré"

            let perm7 = `<@&${p7.fetch(`perm7_${message.guild.id}`)}>`
           
            if (perm7 == `<@&null>`) perm7 = "Non configuré"
            
            let perm8 = `<@&${p8.fetch(`perm8_${message.guild.id}`)}>`
            if (perm8 == `<@&null>`) perm8 = "Non configuré"

            let permgs = `<@&${pgs.fetch(`permgs_${message.guild.id}`)}>`
            if (permgs == `<@&null>`) permgs = "Non configuré"

            let permgp = `<@&${pgp.fetch(`permgp_${message.guild.id}`)}>`
            if (permgp == `<@&null>`) permgp = "Non configuré"

            let permga = `<@&${pga.fetch(`permga_${message.guild.id}`)}>`
            if (permga == `<@&null>`) permga = "Non configuré"


            let permtick = `<@&${rolestaff.fetch(`rolestaff_${message.guild.id}`)}>`
            if (permtick == `<@&null>`) permtick = "Non configuré"


            const embed = new MessageEmbed()
                .setTitle('Permission du serveur')
                .addField(`Permission 1`, `${perm1}`)
                .addField(`Permission 2`, `${perm2}`)
                .addField(`Permission 3`, `${perm3}`)
                .addField(`Permission 4`, `${perm4}`)
                .addField(`Permission 5`, `${perm5}`)
                .addField(`Permission 6`, `${perm6}`)
                .addField(`Permission 7`, `${perm7}`)
                .addField(`Permission 8`, `${perm8}`)
                .addField(`Gestion Staff`, `${permgs}`)
                .addField(`Gestion Permissions`, `${permgp}`)
                .addField(`Permission Giveaway`, `${permga}`)
                .addField(`Perm Ticket`, `${permtick}`)
                .setFooter({ text: `LuminaBots ${client.config.version}`  })
                .setColor(color)

            message.channel.send({ embeds: [embed] })
            return
     


    
        }
    }  