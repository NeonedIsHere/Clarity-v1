const Discord = require('discord.js')
const db = require('quick.db')
function unban(message, user, authorcooldown) {
    message.guild.members.unban(user.id, { reason: `Debannis par ${message.author.tag}` }).then(r => {
        authorcooldown.limit++
        setTimeout(() => {
            authorcooldown.limit = authorcooldown.limit - 1
        }, 120000);
    })
};
const owner = new db.table("Owner")
module.exports = {
    name: 'clear',
    aliases: [],
    description:"permet de supprimer des messages en masse",
    run: async (client, message, args, prefix) => {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send({ content: " Vous n'avez pas les permissions utiliser cette commande - [MANAGE_MESSAGES]" });
            if (message.mentions.members.first()) {

                message.delete()
                message.channel.messages.fetch({ limit: 100 })
                    .then((messages) => {
                        var filterUser = message.mentions.members.first().id;
                        var filtered = messages.filter(m => m.author.id === filterUser).array().slice(0, 100);
                        message.channel.bulkDelete(filtered, true)

                    }).catch();
            } else if (args[0]) {
if(isNaN(args.slice(0).join(" "))) return
                        let amount = 0;
                        if (args.slice(0).join(" ") === '1' || args.slice(0).join(" ") === '0') {
                            amount = 1;
                        } else {
                            message.delete()
                            amount = args.slice(0).join(" ");
                            if (amount > 100) {
                                amount = 100;
                            }
                        }
                        await message.channel.bulkDelete(amount, true).then((_message) => {

                        });

                } else {

                    message.delete()
                    await message.channel.bulkDelete(100, true).then(async (_message) => {
                        setTimeout(async function () {
                            await message.channel.bulkDelete(100, true)


                        }, 1000);


                    });
                }

        }
    }
