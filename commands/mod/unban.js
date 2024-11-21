const Discord = require('discord.js')
const db = require('quick.db')
function unban(message, user, authorcooldown) {
    message.guild.members.unban(user.id, {reason: `Debannis par ${message.author.tag}`}).then(r => {
    authorcooldown.limit++
    setTimeout(() => {
        authorcooldown.limit = authorcooldown.limit - 1
        }, 120000);
    })
};
const owner = new db.table("Owner")
const ml = new db.table("modlog")
const getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; }
const cl = new db.table("Color")
const cooldown = {}
module.exports = {
    name: 'unban',
    aliases: [],
    run: async (client, message, args, prefix) => {
         let color = cl.fetch(`color_${message.guild.id}`)
        

            if(args[0] == "all") {
           
                if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id)){    
                try {
              message.guild.bans.fetch().then(bans => {
                if (bans.size == 0) {
                    message.channel.send({ content: "Aucune personne n'est ban." })
                } else {
                    bans.forEach(ban => {
                        setInterval(()=> {if(ban.user) message.guild.members.unban(ban.user.id,  `Unbanall par ${message.author.tag}`).catch(err => {});}, 250)
                       
                    })
                    let chx = db.get(`modlog_${message.guild.id}`);


                    message.channel.send({ content: `${bans.size} ${bans.size > 1 ? "utilisateurs ont": "utilisateur a"} été unban` });
                    let unbanall = new Discord.MessageEmbed()
                    
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
             .setColor(color)
               .setTitle(` Modération • Type: **\`unban\`**`)
              
                 .setDescription(`${message.author} a **unban** tout les membres bannis`)
                 .setThumbnail(client.user.displayAvatarURL())
                 .setFooter({text:` LuminaBots ${client.config.version}` })
            
                
                   client.channels.cache.get(ml.fetch(`${message.guild.id}.modlog`)).send({ embeds: [unbanall] }).catch(console.error)
                      
                }
                
            }
            )
        
          } catch (error) {
              return;
          } 
        
            } else if(args[0]) {
              
                if(client.config.owner.includes(message.author.id) || owner.get(`${message.guild.id}.ownermd.${message.author.id}`) || db.get(`buyermd.${message.author.id}`) || client.config.buyer.includes(message.author.id))  {  
                    if(!cooldown[message.author.id]) cooldown[message.author.id] = { limit: 0 }
        var authorcooldown = cooldown[message.author.id]
        if(authorcooldown.limit > 5) return message.channel.send({ content: `Vous avez atteint votre limite de **bannisement**, veuillez retenter plus tard!` }); 
              
        let user =  client.users.cache.get(args[0]) || await client.users.fetch(args[0]) 
        if(!user) return  message.channel.send({ content: `Aucun membre trouvée pour: \`${args[0]}\`` })
    
        const banList = await message.guild.bans.fetch();;
        const bannedUser = banList.find(slm => slm.id === user.id);

       if(!bannedUser) return message.channel.send({ content: `Aucun membre banni trouvée pour: \`${args[0]}\`` })

       message.channel.send({ content: `${user.tag} n'est plus banni` });
       let unbane =    new Discord.MessageEmbed()
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
.setColor(color)
  .setTitle(`Modération • Type: **\`unban\`**`)

    .setDescription(`${message.author} a **unban** ${user}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({text:` LuminaBots ${client.config.version}` })
       unban(message, user, authorcooldown)
    
       client.channels.cache.get(ml.fetch(`${message.guild.id}.modlog`)).send({ embeds: [unbane] }).catch(console.error)
                }
            }
        }
    
    }
}  