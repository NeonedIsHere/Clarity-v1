const axios = require('axios');
const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = async (client, invite) => {


    let invites = await invite.guild.invites.fetch();
    if(invite.guild.vanityURLCode) invites.set(invite.guild.vanityURLCode, await invite.guild.fetchVanityData());
    client.guildInvites.set(invite.guild.id, invites);

    db.set(`invites.${invite.code}`, {
        inviterId: invite.inviter?.id,
        code: invite.code,
        uses: invite.uses
    });
}