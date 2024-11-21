const ytsearch = require('yt-search');
const ytdl = require("ytdl-core")
const Discord = require('discord.js')
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior
} = require('@discordjs/voice');
const db = require("quick.db")
const cl = new db.table("Color")

module.exports = {
    name: "play",
    run: async(client , message, args , prefix ) => {
        const color = await cl.fetch(`color_${message.guild.id}`)
        if (!args[0]) return message.reply(`Veuillez entrer une recherche valide `);

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Please connect to a voice channel!');
        if (!args.length) return message.channel.send('Please Provide Something To Play!')

        const connection = await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        const videoFinder = async (query) => {
            const videoResult = await ytsearch(query);
            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;


        }
        const video = await videoFinder(args.join(' '));
        if (video) {
            const stream = ytdl(video.url, { filter: 'audioonly' });
            const player = createAudioPlayer();
            const resource = createAudioResource(stream)

            await player.play(resource);
            connection.subscribe(player);
            



            const embed = new Discord.MessageEmbed()
            .setTitle(`Lancement de votre musique`)
            .setDescription(`J'écoute: **${video.title}**`)
            .setColor(color)

            await message.reply({embeds: [embed]})
            
        } else {
            message.channel.send(`Aucune video trouvée pour: \`${args[0]}\``);
        }



    }
    

    }
