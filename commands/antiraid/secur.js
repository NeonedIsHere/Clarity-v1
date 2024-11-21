const Discord = require ("discord.js");
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const db = require("quick.db")
const owner = new db.table("Owner")
const cl = new db.table("Color")
const atc = new db.table("antichannelcreate")
const atd = new db.table("antichanneldelete")
const acu = new db.table("antichannelupdate")
const atr = new db.table("antirolecreate")
const ard = new db.table("antiroledelete")
const aru = new db.table("antiroleupdate")
const agu = new db.table("Guildupdate")
module.exports = {
    name: "secur",
    run: async(client, message, args, prefix) => {
           let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)) {
            try   {
                const embed = new Discord.MessageEmbed()
                .setTitle(`${message.guild.name} AntiRaid`)
                .setFooter({text: `LuminaBots ${client.config.version}` })
                .setColor(color)
                let menuoptions = new MessageSelectMenu()
                .setCustomId('MenuSelection')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'AntiBan',
                        value: 'aba',
                    },
                    {

                        label: 'Anti Bot',
                        value: 'ab',

                    },
                    {
                        label: 'AntiLink',
                        value: `al`,

                    },
                    {
                        label: "AntiChannel",
                        value: "ac",

                    },
                    {
                        label: 'Anti Update',
                        value: 'au',

                    },
                    {
                        label :"AntiRole",
                        value: "ar",

                    },   {
                        label: 'AntiWebooks',
                        value: 'aw',
                    },
                    {
                        label: "RaidMode",
                        value: "rm",

                    },
                    {
                        label: "AntiMention",
                        value: "am"
                    },
                    {
                        label: "AntiAdmin",
                        value: "aa",

                    },
                    {
                        label: "Annulé",
                        value: "cancel",
                    }

                ])
                const acpanel = new MessageSelectMenu()
                .setCustomId('antichannel')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Anti Channel create',
                        value: 'acc',

                    },
                    {
                        label: 'Anti Channel delete',
                        value: 'acd',

                    },
                    {
                        label: 'Anti Channel update',
                        value: 'acu',

                    },

                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])


                const aapanel = new MessageSelectMenu()
                .setCustomId('antichanneld')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([

       {
        label: 'Activer',
        value: "aaon"
    },
    {
        label: 'Désactiver',
        value: "aaoff"
    },
                ])
                const acdpanel = new MessageSelectMenu()
                .setCustomId('antichanneld')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([

       {
        label: 'Activer',
        value: "acdon"
    },
    {
        label: 'Désactiver',
        value: "acdoff"
    },
                ])

                const acupanel = new MessageSelectMenu()
                .setCustomId('antichannelu')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([

       {
        label: 'Activer',
        value: "acuon"
    },
    {
        label: 'Désactiver',
        value: "acuoff"
    },
                ])
                const accpanel = new MessageSelectMenu()
                .setCustomId('antichannelc')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([

       {
        label: 'Activer',
        value: "accon"
    },
    {
        label: 'Désactiver',
        value: "accoff"
    },
                ])

                const arcpanel = new MessageSelectMenu()
                .setCustomId('antirolec')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([

       {
        label: 'Activer',
        value: "arcon"
    },
    {
        label: 'Désactiver',
        value: "arcoff"
    },
                ])

                const arupanel = new MessageSelectMenu()
                .setCustomId('antiroleu')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([

       {
        label: 'Activer',
        value: "aruon"
    },
    {
        label: 'Désactiver',
        value: "aruoff"
    },
                ])


                const ardpanel = new MessageSelectMenu()
                .setCustomId('antiroled')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([

       {
        label: 'Activer',
        value: "ardon"
    },
    {
        label: 'Désactiver',
        value: "ardoff"
    },
                ])
                const arpanel = new MessageSelectMenu()
                .setCustomId('antirole')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Anti Role create',
                        value: 'arc',

                    },
                    {
                        label: 'Anti Role delete',
                        value: 'ard',

                    },
                    {
                        label: 'Anti Role update',
                        value: 'aru',

                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])


                const rmpanel = new MessageSelectMenu()
                .setCustomId('raidmode')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Activer RaidMode',
                        value: "rmon"
                    },
                    {
                        label: 'Désactiver RaidMode',
                        value: "rmoff"
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])


                const alpanel = new MessageSelectMenu()
                .setCustomId('antilink')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Activer',
                        value: "alon"
                    },
                    {
                        label: 'Désactiver',
                        value: "aloff"
                    },
                    {
                        label: "Config",
                        value: "alc"
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])

                const alcpanel = new MessageSelectMenu()
                .setCustomId('antilink')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'All',
                        value: "alall"
                    },
                    {
                        label: 'Invite',
                        value: "alinv"
                    },
                    {
                        label: 'Web',
                        value: 'alweb'
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])

                const ampanel = new MessageSelectMenu()
                .setCustomId('antiwebhook')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Activer',
                        value: "amon"
                    },
                    {
                        label: 'Désactiver',
                        value: "amoff"
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])
                const awpanel = new MessageSelectMenu()
                .setCustomId('antiwebhook')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Activer',
                        value: "awon"
                    },
                    {
                        label: 'Désactiver',
                        value: "awoff"
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])


                const atbpanel = new MessageSelectMenu()
                .setCustomId('antibot')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Activer',
                        value: "atbon"
                    },
                    {
                        label: 'Désactiver',
                        value: "atboff"
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])


                const abpanel = new MessageSelectMenu()
                .setCustomId('antiban')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Activer',
                        value: "abon"
                    },
                    {
                        label: 'Désactiver',
                        value: "aboff"
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])





                const aupanel = new MessageSelectMenu()
                .setCustomId('antiupdate')
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Choisis une option")
                .addOptions([
                    {
                        label: 'Activer',
                        value: "auon"
                    },
                    {
                        label: 'Désactiver',
                        value: "auoff"
                    },
                    {
                        label: 'Retour',
                        value: "Retourdel",

                    },
                ])







                const menumsg = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents([menuoptions])] })



                const collectorX = message.channel.createMessageComponentCollector({
                    componentType: "SELECT_MENU",
                    filter: (i => i.user.id === message.author.id)
                });


                collectorX.on("collect", async (f) => {
                    f.deferUpdate()
                    const value = f.values[0];
                    //retour
                    if (value === "Retourdel") {

                        menumsg.edit({  components: [new MessageActionRow().addComponents([menuoptions])] })
                    }

                    if (value === "ac") {

                        menumsg.edit({ components: [new MessageActionRow().addComponents([acpanel])] })
                    }

                    if (value == "aa") {
                        menumsg.edit({  components: [new MessageActionRow().addComponents([aapanel])] })
                    }


                    if (value == "aaon") {
                        aa.set(`config.${message.guild.id}.antiadmin`, true)
                        menumsg.edit({  components: [new MessageActionRow().addComponents([menuoptions])] })
                    }

                    if(value == "aaoff"){
                        aa.set(`config.${message.guild.id}.antiadmin`, false)
                        menumsg.edit({  components: [new MessageActionRow().addComponents([menuoptions])] })
                    }

                    if (value === "acc") {

                        menumsg.edit({ components: [new MessageActionRow().addComponents([accpanel])] })
                    }

                    if (value === "accon") {

                        atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiChannel Create activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([acpanel])] })
                    }

                    if (value === "accoff") {

                        atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiChannel Create desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([acpanel])] })
                    }

                    if (value === "acd") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([acdpanel])] })
                    }


                    if (value === "rm") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([rmpanel])] })
                    }

                    if (value === "rmon") {
                        if (rm.get(`raidmode_${message.guild.id}`) === "on") return message.channel.send(`**Le serveur est déja en raidmode**`)

                        rm.set(`raidmode_${message.guild.id}`, "on")
                        let sec = new MessageEmbed()
                        .setDescription("Le serveur est maintenant en **raidmode**")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([rmpanel])] })
                    }


                    if(value === "alweb") {
                        al.set(`${message.guild.id}.antilinkweb`, true)
                        al.set(`config.${message.guild.id}.antilinkall`, false)
                        al.set(`config.${message.guild.id}.antilinkinvite`, false)
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`**L'Antilink** détecte maintenant **les liens de site**`)
                            .setColor(color)
                            .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({ embeds: [embed] })
                    }


                    if (value === "rmoff") {
                        if (rm.get(`raidmode_${message.guild.id}`) === false) return message.channel.send(`**Le serveur n'est pas en raidmode**`)
                        rm.set(`raidmode_${message.guild.id}`, false)

                        let sec = new MessageEmbed()
                        .setDescription("Le serveur n'est maintenant pus en **raidmode**")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([rmpanel])] })
                    }

                    if (value === "acdon") {

                        atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiChannel Delete activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components:  [new MessageActionRow().addComponents([acpanel])] })
                    }

                    if (value === "acdoff") {

                        atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiChannel Delete desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([acpanel])] })
                    }

                    if (value === "acu") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([acupanel])] })
                    }

                    if (value === "am") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([ampanel])] })
                    }

                    if(value ==="amon"){
                        ae.set(`${message.guild.id}.antieveryone`, true)
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`**L'Antieveryone** est maintenant **activé**`)
                            .setColor(color)
                            .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({ embeds: [embed] })
                    }

                    if(value ==="amoff"){
                        ae.set(`${message.guild.id}.antieveryone`, false)
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`**L'Antieveryone** est maintenant **désactivé**`)
                            .setColor(color)
                            .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({ embeds: [embed] })
                    }

                    if (value === "acuon") {

                        acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiChannel Update activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([acpanel])] })
                    }

                    if (value === "alall"){
                        al.set(`${message.guild.id}.antilinkall`, true)
                al.set(`config.${message.guild.id}.antilinkinvite`, false)
                al.set(`config.${message.guild.id}.antilinkweb`, false)
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**L'Antilink** détecte maintenant **tout les liens**`)
                    .setColor(color)
                    .setFooter({text: `LuminaBots ${client.config.version}` })
                message.channel.send({ embeds: [embed] })
                    }

                    if(value === "alinv"){
                        al.set(`${message.guild.id}.antilinkinvite`, true)
                        al.set(`config.${message.guild.id}.antilinkall`, false)
                        al.set(`config.${message.guild.id}.antilinkweb`, false)
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`**L'Antilink** détecte maintenant **les invitations de serveurs**`)
                            .setColor(color)
                            .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({ embeds: [embed] })
                    }

                    if (value === "acuoff") {

                        acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiChannel Update desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([acpanel])] })
                    }


                    if (value === "ar") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([arpanel])] })
                    }

                    if (value === "arc") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([arcpanel])] })
                    }

                    if (value === "arcon") {

                        atr.set(`config.${message.guild.id}.antirolecreate`, true)

                        let sec = new MessageEmbed()
                        .setDescription("AntiRole Create activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([arpanel])] })
                    }

                    if (value === "arcoff") {

                        atr.set(`config.${message.guild.id}.antirolecreate`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiRole Create desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([arpanel])] })
                    }

                    if (value === "ard") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([ardpanel])] })
                    }

                    if (value === "ardon") {

                        ard.set(`config.${message.guild.id}.antiroledelete`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiRole Delete activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([arpanel])] })
                    }

                    if (value === "ardoff") {

                        ard.set(`config.${message.guild.id}.antiroledelete`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiRole Delete desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([arpanel])] })
                    }

                    if (value === "aru") {

                        menumsg.edit({ components:  [new MessageActionRow().addComponents([arupanel])] })
                    }

                    if (value === "aruon") {

                        aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiRole Update activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([arpanel])] })
                    }

                    if (value === "aruoff") {

                        aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiRole Update desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([arpanel])] })
                    }

                    if (value === "al") {

                        menumsg.edit({  components: [new MessageActionRow().addComponents([alpanel])] })
                    }

                    if (value === "alc"){
                        menumsg.edit({  components: [new MessageActionRow().addComponents([alcpanel])] })
                    }

                    if (value === "alon") {

                        al.set(`config.${message.guild.id}.antilink`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiLink activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([alpanel])] })
                    }

                    if (value === "aloff") {

                        al.set(`config.${message.guild.id}.antilink`, false)
                        al.set(`${message.guild.id}.antilinkall`, false)
                        al.set(`config.${message.guild.id}.antilinkinvite`, false)
                        al.set(`config.${message.guild.id}.antilinkweb`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiLink desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([alpanel])] })
                    }

                    if (value === "aw") {

                        menumsg.edit({  components: [new MessageActionRow().addComponents([awpanel])] })
                    }

                    if (value === "awon") {

                        aw.set(`config.${message.guild.id}.antiwebhook`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiWebhook activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([awpanel])] })
                    }

                    if (value === "awoff") {

                        aw.set(`config.${message.guild.id}.antiwebhook`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiWebook desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([awpanel])] })
                    }

                    if (value === "au") {
                        menumsg.edit({  components: [new MessageActionRow().addComponents([aupanel])] })
                    }

                    if (value === "auon") {

                        agu.set(`guildupdate_${message.guild.id}`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiUpdate activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([aupanel])] })
                    }

                    if (value === "auoff") {

                        agu.set(`guildupdate_${message.guild.id}`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiUpdate desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([aupanel])] })
                    }

                    if (value === "ab") {


                        menumsg.edit({  components: [new MessageActionRow().addComponents([atbpanel])] })
                    }

                    if (value === "aba") {


                        menumsg.edit({  components: [new MessageActionRow().addComponents([abpanel])] })
                    }


                    if (value === "abaon") {

                        aba.set(`config.${message.guild.id}.antiban`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiBan activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([abpanel])] })
                    }

                    if (value === "abaoff") {

                        aba.set(`config.${message.guild.id}.antiban`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiBan desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([abpanel])] })
                    }


                    if (value === "atbon") {

                        atb.set(`config.${message.guild.id}.antibot`, true)
                        let sec = new MessageEmbed()
                        .setDescription("AntiBot activer")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([atbpanel])] })
                    }
                    if (value === "atboff") {

                        atb.set(`config.${message.guild.id}.antibot`, false)
                        let sec = new MessageEmbed()
                        .setDescription("AntiBot desactiver")
                        .setColor(color)
                        .setFooter({text: `LuminaBots ${client.config.version}` })
                        message.channel.send({embeds: [sec]})
                        menumsg.edit({  components: [new MessageActionRow().addComponents([atbpanel])] })
                    }

            })
            } catch(err) {
                console.log(err)
            }
        }
    }
}