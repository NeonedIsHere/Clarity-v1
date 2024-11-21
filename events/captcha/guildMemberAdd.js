const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { Captcha } = require("discord.js-captcha");
const cl = new db.table("Color")
module.exports = async (client, member) => {
if (db.get(`captcha_${member.guild.id}`) === true){
    const guild = member.guild
    const channel = guild.channels.cache.get(db.get(`capchan_${guild.id}`))
    const role = guild.roles.cache.get(db.get(`caprole_${guild.id}`))
  
    if (!role) return;
    if (!channel) return;

    const captcha = new Captcha(client, {
        guildID: guild.id,
        roleID: role.id,
        channelID: channel.id,
        sendToTextChannel: true,
        addRoleOnSuccess: true,
        kickOnFailure: true,
        caseSensitive: false,
        attempts: 3,
        timeout: 60000,
        showAttemptCount: true,
        customPromptEmbed: new MessageEmbed().setDescription("> **Tu dois valider ce captcha pour pouvoir acceder au serveur**").setFooter({text: `LuminaBots ${client.config.version}` , iconURL: client.user.displayAvatarURL()}),
        customSuccessEmbed: new MessageEmbed().setDescription("Captcha validé :white_check_mark:").setColor("00FF00").setFooter({text: `LuminaBots ${client.config.version}` , iconURL: client.user.displayAvatarURL()}),
        customFailureEmbed: new MessageEmbed().setDescription("Captcha raté :x:").setColor('FF0000').setFooter({text: `LuminaBots ${client.config.version}` , iconURL: client.user.displayAvatarURL()}),
        CaptchaImageData: "../../Captcha/img/captchaimg.jpg"
    });
    
    captcha.present(member);

 



}
}