const Discord = require ("discord.js");
const { MessageEmbed , MessageActionRow, MessageSelectMenu } = require('discord.js')
const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const db = require('quick.db');
const cl = new db.table('Color')

module.exports = {
    name: "radio",
    run: async(client, message, args, prefix) => {
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        // recupere tout les chanels du serveur
        const channels = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE')
        // selectmenu pour avoir tout les channels vocaux du serveur
        const voiceMenu = new MessageActionRow ()
        .addComponents(
        new MessageSelectMenu()
        .setCustomId('voice')
        .setPlaceholder('Sélectionne un channel')
        .setMinValues(1)
        .setMaxValues(1)
        .addOptions(channels.map(c => {
            return {
                label: c.name,
                description: c.name,
                value: c.id
            }
        }))
        )
        const menu = new MessageActionRow ()
        .addComponents(
            new MessageSelectMenu()
.setCustomId('select')
.setPlaceholder('Choisis ta Radio')
.addOptions([{
    label: '📻 NRJ',
    description: '',
    value: 'nrj'
}, {
    label: '📻 SkyRock',
    description: '',
    value: 'skyrock'
}, {
    label: '📻 Mouv',
    description: '',
    value: 'mouv'
}, {
    label: '📻 France Info',
    description: '',
    value: 'finfo'
},{
    label: '📻 RTL',
    description: '',
    value: 'rtl'
}, {
    label: '📻 Virgin',
    description: '',
    value: 'virgin'
}, {
    label: '📻 Radio Latina',
    description: '',
    value: 'latina'
}, {
    label: '📻 Nostalgie',
    description: '',
    value: 'nostalgie'
}, {
    label: '📻 Evasion',
    description: '',
    value: 'evasion'
}, {
    label: '📻 RMC',
    description: '',
    value: 'rmc'
}, {
    label: '📻 Cherie FM',
    description: '',
    value: 'cherie'
}
])
)

let start = new MessageActionRow()
  .addComponents(
        new Discord.MessageButton()
      .setCustomId('start')
      .setLabel('Lancer la Radio')
      .setStyle('SUCCESS')
      .setEmoji("990732155510480936")
  )
const embed0 = new Discord.MessageEmbed()
.setColor(color)
.setFooter({text: `LuminaBots ${client.config.version}` , iconURL: message.author.displayAvatarURL()})
.setTitle(`Choisis Ta Radio`)
.setDescription(`${message.author.username} Je te l'aisse choisir ta radios`)
.setThumbnail(message.member.user.avatarURL({dynamic: true}))


const collector = message.channel.createMessageComponentCollector({
    component_type: 'SELECT_MENU'
    })
    const filter = i => i.customId === 'voice' && i.user.id === message.author.id;

    collector.on('collect', async (collected) => {
        collected.deferUpdate()

        if (collected.customId === 'voice') {
        const channel = message.guild.channels.cache.get(collected.values[0]);
        await message.reply(`La radio sera jouée dans ${channel}`);
        }

                if (collected.customId ==='select') {
            
        if(collected.values[0] === 'nrj') {
            let radioc = db.get(`radiochannel_${message.guild.id}`)


            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://cdn.nrjaudio.fm/audio1/fr/40101/aac_576.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`NRJ\` dans ${channel}.`)
        }


        if(collected.values[0] === 'skyrock') {

            let radioc = db.get(`radiochannel_${message.guild.id}`)


            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://www.skyrock.fm/stream.php/tunein16_64mp3.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`SkyRock\` dans ${channel}.`)


        }

        if(collected.values[0] === 'mouv') {
            let radioc = db.get(`radiochannel_${message.guild.id}`)

            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://direct.mouv.fr/live/mouv-midfi.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Mouv\` dans ${channel}.`)


        }


        if(collected.values[0] === 'finfo') {

            let radioc = db.get(`radiochannel_${message.guild.id}`)
            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://icecast.radiofrance.fr/franceinfo-midfi.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`France Info\` dans ${channel}.`)


        }


        if(collected.values[0] === 'rtl') {
            let radioc = db.get(`radiochannel_${message.guild.id}`)
            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://icecast.rtl.fr/rtl-1-44-128?listen=webCwsBCggNCQgLDQUGBAcGBg")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`RTL\` dans ${channel}.`)


        }

        if(collected.values[0] === "virgin"){
            let radioc = db.get(`radiochannel_${message.guild.id}`)
            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://stream.virginradio.fr/virgin.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Virgin\` dans ${channel}.`)
        }


        if(collected.values[0] === "latina"){
            let radioc = db.get(`radiochannel_${message.guild.id}`)
            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://start-latina.ice.infomaniak.ch/start-latina-high.mp3")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Radio Latina\` dans ${channel}.`)

        }


        if(collected.values[0] === "nostalgie"){
            let radioc = db.get(`radiochannel_${message.guild.id}`)
            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://scdn.nrjaudio.fm/adwz2/fr/30601/mp3_128.mp3?origine=fluxradios")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Nostalgie\` dans ${channel}.`)

        }


        if(collected.values[0] === "evasion"){
            let radioc = db.get(`radiochannel_${message.guild.id}`)
            let channel = client.channels.cache.get(radioc)
            const connection = await joinVoiceChannel({
                channelId: channel,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            });

            const player = createAudioPlayer();
            const resource = createAudioResource("http://stream1.evasionfm.com/Oise")

            await player.play(resource);
            connection.subscribe(player);
           await message.reply(`J'écoute \`Evasion\` dans ${channel}.`)

        }
    }
    })
return message.channel.send({
    embeds: [embed0],
    components: [menu, voiceMenu]


});

    }
}