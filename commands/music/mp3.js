const Discord = require ("discord.js");
const ytsearch = require('yt-search');
const ytdl = require('ytdl-core');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, entersState, StreamType,  AudioPlayerStatus,  VoiceConnectionStatus } = require("@discordjs/voice");
const Player = createAudioPlayer();
const db = require("quick.db")
const cl = new db.table("Color")
module.exports = {
    name: "mp3",
    run: async(client , message, args , prefix) => {
        const file = message.attachments.first();
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Connectez vous a un channel vocal!');
   

        const connection = await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
    
        try {
            connection;
            connection.subscribe(Player);

          
            const resource = createAudioResource(file.url, {
                inputType: StreamType.Arbitrary
              });

              Player.play(resource);
          
            



            let play = new MessageEmbed()
            .setDescription(`J ecoute: ` + file.name + "\nTaille:" + file.size + "B")
            .setColor(color)


            await message.reply({embeds: [play]})
            
        }  catch (error) {
            message.channel.send({ content:  "Erreur" });
        }
    }
}