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
const wl = new db.table("Whitelist")
const part = new db.table("Partner")
const cl = new db.table("Color")
module.exports = {
    name: 'partner',
    aliases: [],
    run: async (client, message, args, prefix) => {        
 

        const PERMISSION_ERROR_MESSAGE = "Vous n'avez pas les permissions nécessaires pour exécuter cette commande.";
const ADD_PARTNER_ERROR_MESSAGE = "Veuillez spécifier le lien du serveur partenaire et la personne venant vous voir pour le partenariat : `partner add https://discord.gg/LuminaBots-fr` <@1072553881134972970>";
const REMOVE_PARTNER_ERROR_MESSAGE = "Veuillez spécifier le lien du serveur partenaire et la personne venant vous voir pour le partenariat : `partner remove https://discord.gg/LuminaBots-fr` <@1072553881134972970>";
const NO_PARTNERS_MESSAGE = "Aucun partenariat n'a été ajouté à la liste des partenariats";
if (!message.member.permissions.has("ADMINISTRATOR")) {
    return message.channel.send(PERMISSION_ERROR_MESSAGE);
  }
        let color = cl.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color
        const partnerlog = db.get(`partnerlog_${message.guild.id}`)
        if (args[0] == "add") {
            if (!args[1]) return message.channel.send("Veuillez spécifier le lien du serveur partenaire exemple : `partner add https://discord.gg/LuminaBots-fr`");
            if (!args[2]) return message.channel.send("Veuillez spécifier la personne venant vous voir pour le partenariat : `partner add https://discord.gg/LuminaBots-fr` <@1072553881134972970>");

                        if (!args[1].startsWith("https://discord.gg/")) return message.channel.send("Veuillez spécifier le lien du serveur parteneraire exemple : `partner add https://discord.gg/LuminaBots-fr`");

                        let user = message.mentions.members.first() || message.guild.members.cache.get(args[2])
                        if (!user) return message.channel.send("Veuillez spécifier la personne venant vous voir pour le partenariat : `partner add https://discord.gg/LuminaBots-fr` <@1072553881134972970>");
                        if (user.id === message.author.id) return message.channel.send("Vous ne pouvez pas partenariat avec vous-même");
                        if (user.id === client.user.id) return message.channel.send("Vous ne pouvez pas partenariat avec le bot");
                        let link = args[1]; 



                        // si le lien est spécifié et le membre est aussi mentionné alors on ajoute le partenariat a la db 

                        
                      
                        db.set(`partner_${message.guild.id}_${user.id}`, link)
                        db.set(`partner_${message.guild.id}_${message.author.id}`, link)

                        const partnerchannel = message.guild.channels.cache.get(partnerlog)
                        let embed = new MessageEmbed()
                        embed.setColor(color)
                        embed.setTitle("Nouveau partenariat")
                        embed.addFields({
                            name: "Utilisateur venu pour le partenariat",
                            value: `${user}`
                        }, {
                            name: "Lien du partenariat",
                            value: `${link}`
                        })

                        message.channel.send(`${user} a bien été ajouté à la liste des partenariats avec le lien : ${link}`)
                        if (partnerchannel) partnerchannel.send({ embeds: [embed] }).catch(() => false)



                }       
                if (args[0] == "remove") {
                    if (!args[1]) return message.channel.send("Veuillez spécifier le lien du serveur parteneraire exemple : `!partner remove https://discord.gg/LuminaBots-fr`");
                    if (!args[2]) return message.channel.send("Veuillez spécifier la personne etant venu vous voir pour le partenariat : `partner remove https://discord.gg/LuminaBots-fr` <@1072553881134972970>");
                    let user = message.mentions.members.first() || message.guild.members.cache.get(args[2])
                    if (!user) return message.channel.send("Veuillez spécifier la personne etant venu vous voir pour le partenariat : `partner remove https://discord.gg/LuminaBots-fr` <@1072553881134972970>");
                    if (user.id === message.author.id) return message.channel.send("Vous ne pouvez pas partenariat avec vous-même");
                    if (user.id === client.user.id) return message.channel.send("Vous ne pouvez pas partenariat avec le bot");
                    let link = args[1];
                    db.delete(`partner_${message.guild.id}_${user.id}`)
                    db.delete(`partner_${message.guild.id}_${message.author.id}`)
                    message.channel.send(`${user} a bien été retiré de la liste des partenariats avec le lien : ${link}`)
                }

                else if (!args[0]) {
                    let help = new MessageEmbed()
                    help.setColor(color)
                    help.setTitle("Liste des commandes")
                    help.addFields({
                        name: `\`${prefix}partner\` add`,
                        value: "Ajoute un partenariat à la liste des partenariats"
                    }, {
                        name: `\`${prefix}partner\` remove`,
                        value: "Retire un partenariat de la liste des partenariats"
                    })
                    help.setTimestamp()
                    message.channel.send({ embeds: [help] })
                }

               
             }
             
    }
 