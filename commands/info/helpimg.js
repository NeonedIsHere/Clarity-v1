const db = require("quick.db")

module.exports = {
    name : "sethelpimg",
    description : "Permet de changer l'image du panel d'aide",
    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        if(!args[0]) return message.channel.send("Veuillez spécifier l'image de l'aide.")
        db.set(`helpimg_${message.guild.id}`, args[0])
        message.channel.send("L'image du panel d'aide a été changé.")

    }
}