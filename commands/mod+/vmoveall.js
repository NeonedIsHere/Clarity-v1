const Discord = require("discord.js")
const { Client, Message, MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
    name: 'vmoveall',
    description:"Permet de  déplacer tous les membres dans votre salon vocal",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        let perm = ""
        let color = await db.fetch(`color_${message.guild.id}`)
        message.member.roles.cache.forEach(role => {
            if(db.get(`modsp_${message.guild.id}_${role.id}`)) perm = true
            if(db.get(`admin_${message.guild.id}_${role.id}`)) perm = true
        if(db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
        })
        let channel = message.member.voice.channel
            if (!channel) return message.channel.send("tu n'est pas en vocal");
            if (!message.guild.me.voice.connection) {

                    message.channel.send(`Déplace toi dans le salon ou tu souhaite que je déplace toutes les personnes du salon!`)


                    client.on("voiceStateUpdate", async (oldmem, newmem) => {
                        if (newmem.member.voice.channel && newmem.member.voice.channel.id !== channel.id) {
                            let newchannel = message.guild.channels.cache.get(newmem.member.voice.channel.id);
                            if (message.author.id === newmem.member.user.id) {
                                    channel.members.forEach(e => {
                                        e.voice.setChannel(newchannel, `Moveall par ${message.author.tag}`);

                                    })

                            }
                        }

                })

        }



        }

    }
