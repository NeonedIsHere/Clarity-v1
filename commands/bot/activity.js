const db = require('quick.db')

module.exports = {
    name: 'activity',
    usage: 'activity [ton status] [Acitiviter name]',
    description: 'Changer le statut du bot',
    run: async(client, message, args, prefix) => {
        if (client.config.owner.includes(message.author.id) || owner.get(`ownermd.${message.author.id}`) ) {
        const activityType = args[0];
        const activityName = args.slice(1).join(' ');
        let activity;
    
        if (activityType === 'playto' || activityType === 'play') {
          activity = { name: activityName, type: 'PLAYING' };
        } else if (activityType === 'watch' || activityType === 'watch') {
          activity = { name: activityName, type: 'WATCHING' };
        } else if (activityType === 'listen' || activityType === 'listen') {
          activity = { name: activityName, type: 'LISTENING' };
        } else if (activityType === 'stream') {
          activity = { name: activityName, type: 'STREAMING', url: 'https://www.twitch.tv/oni145' };
        } else if (activityType === 'reset') {
          await db.delete('nomstatut');
          await db.delete('type');
          message.channel.send('Statut **réinitialisé** avec succès !');
          activity = { name: "Cloud's Bot v1", type: 'PLAYING', url: 'https://www.twitch.tv/oni145' };
        } else {
          return message.reply({content: "Veuillez spécifier un type d\'activité valide : \`playto\`, \`watch\`, \`listen\` ou \`stream\`",allowedMentions: { repliedUser: false }});
        }
      
        client.user.setActivity(activity.name, { type: activity.type, url: activity.url });
        await db.set('nomstatut', activity.name);
        await db.set('type', activity.type);
        message.reply({content: `L'activité du bot a été changée en \`${activityType}\` \`${activityName || `par ${message.author.tag}`}\`.`,allowedMentions: { repliedUser: false }});
        
      }
    }
  };
  