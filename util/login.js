const { readdirSync} = require('fs');
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const login = (client) => {
const Discord = require("discord.js")
const db = require("quick.db")
const cl = new db.table("Color")
const wait = require("timers/promises").setTimeout;
const { MessageButton , MessageActionRow } = require("discord.js")
const { Captcha } = require("discord.js-captcha");
client.config = require("../config.json")

client.cooldown = new Array();
client.interaction = {}
client.guildInvites = new Map();
client.queue = new Map();
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.slashcom= new Discord.Collection();
client.snipes = new Map()
client.inter = new Array()
client.superagent = require('superagent');
const a = Date.now()
const realtime = Math.floor(a / 1000)

client.login(client.config.token)

client.on("ready", async() => {





    let color = client.config.color
    let support = new MessageActionRow
    support.addComponents(
        new MessageButton()
      .setLabel("Support")
      .setStyle("LINK")
      .setURL("https://discord.gg/clarity-fr")
      .setEmoji("1046061500072214600")
    )
    let join = new Discord.MessageEmbed()
    .addFields({
        name:`<t:${realtime}:R>`, value: ">>> __Je viens de démarrer__"
    }, {
        name: "Version Du Bot :", value: `\`${client.config.version}\``

    })
    .setFooter({text:`Clarity ${client.config.version}`})
    .setColor(color)

    if (!client.users.cache.has(client.config.buyer)) return
    client.users.cache.find(u => u.id === client.config.buyer).send({embeds: [join], components: [support]}).catch(e => { })



    let buy = db.all().filter(i => i.ID.startsWith("buyermd.")).map(i => i.ID.replace("buyermd.", ""))
    if (buy.length > 0) {
        buy.forEach(i => {
            client.users.cache.find(u => u.id === i).send({embeds: [join], components: [support]}).catch(e => { })
        })
    }




} )


















}




module.exports = {

    login
}