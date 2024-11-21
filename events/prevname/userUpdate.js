const Discord = require("discord.js");
const db = require("quick.db")

module.exports =  async (client, oldUser, newUser) => {


    if (oldUser.username !== newUser.username) {
        db.set(`prevname_${oldUser.id}_${parseInt(new Date() / 1000)}_${newUser.username}`, true);
        console.log(`${oldUser.username} => ${newUser.username}`);
    }


}