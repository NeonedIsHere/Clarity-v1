const { MessageEmbed } = require("discord.js");
const ms = require("ms")

module.exports = {
    name: 'rules',
    run: async (client, message, args, prefix) => {
        


        let time1 = "5s";
        setTimeout(function () {


            let embed1 = new MessageEmbed()
            .setTitle(`Règlement de: \n\`${message.guild.name}\``)
            .setFooter({text: `LuminaBots ${client.config.version}` })
            .setDescription(`Les règles sont en place pour être respectées et pour assurer une bonne entente entre les joueurs et les membres du staff. Personne ne doit ignorer les règles, dans le cas où une ou plusieurs règles seraient enfreintes, nous nous permettons le droit de vous sanctionner.

            - == - == - == - == - == - == - == - == - == - == - == - == -.
            - Toute décision d'un administrateur ou d'un modérateur ou autres, qu'elle soit guidée par un article du règlement ou non, doit être respectée par les joueurs.
            - == - == - == - == - == - == - == - == - == - == - == - == -.
            \`I\` - Général
            
            .\`1\`- Politesse, respect et courtoisie sont demandés à chaque membre du serveur. Quelques expressions polies permettent une bonne compréhension et ne vous coûtent que quelques secondes de votre temps. On ne vous demande pas le sérieux qu'il faut dans une entreprise, mais un peu d'ouverture.
            .\`2\`- Vous êtes sur un serveur pour jouer et vous faire des amis, communiquer avec les autres, donc inutile de rager
            .\`3\`- Attaquer un ou plusieurs membres de la communauté de manière abusive ou insultante est interdit. Ne provoquez pas, ne trichez pas, n'insultez pas.
            .\`4\`- Vous êtes le maître de votre compte, vous êtes responsable si le cas se présente d'utilisation par un autre membre même si l'action n'est pas accordée par vous, nous sanctionnons le compte pas la personne`)


                  
            message.channel.send( {embeds: [embed1]}, ms(time1))
        })


        let time2 = "7s";
        setTimeout(function () {

            let embed2 = new MessageEmbed()
            .setDescription((`- == - == - == - == - == - == - == - == - == - == - == - == -
            \`II\`- Profil / Pseudo
            
            .\`1\`- Pseudo :
            -Ne pas être assimilé/confondre avec celui d'un membre du personnel, sous peine d'avertissement puis de bannissement si l'avertissement n'est pas pris en compte.
            - Ne doit pas contenir de propos racistes, homophobes, sexistes
            - Ne doit pas être pornographique
            
            
            .\`2\`- Photo de profil :
            -Concernant les avatars. Toutes les photos à caractère sexuel sont interdites (nature sexuelle = pornographie, érotisme, charme, image suggestive).
            -Nous n'acceptons pas les pp avec un caractère moqueur
            -Aucun pp ne s'excusait pour les sectes, les événements historiques sombres, ect ...
            
            Cette partie est la moins développée car les exemples étendus ne feront que nous compliquer la vie à tous. Cependant, ce qui suit est considéré comme intuitif afin que vous sachiez quoi faire et ne pas faire. Chaque cas sera à nouveau soumis à l'appréciation du personnel donc évitez de traîner dans les limites de l'acceptable`))

            message.channel.send({embeds: [embed2]})
        }, ms(time2))


        let time3 = "10s";
        setTimeout(function () {

            let embed3 = new MessageEmbed()
            .setDescription(`
            \`III\` - Contacter le personnel
            
            .\`1\`- Si vous avez besoin d'un admin, merci de lui envoyer un message privé
            .\`2\`- Ne révélez en aucun cas les informations de votre compte, même à un membre du personnel ! Si vous avez quelque chose à prouver, passez aux écrans.
            .\`3\`- Pour signaler des commentaires inappropriés ou interdits, n'hésitez pas à mentionner les membres du personnel, ou à les contacter par message privé.
            .\`4\`- Il est préférable de contacter courtoisement la personne concernée avant que les membres du personnel, si cela ne résout pas le problème, viennent ensuite au personnel pour discuter du problème en privé en cas de litige.
            .\`5\`- Un membre du personnel ne vous contactera jamais avec un autre compte que le leur.`)
            message.channel.send({embeds: [embed3]})
        }, ms(time3))
        
  


        let time4 = "13s";
        setTimeout(function () {

            let embed4 = new MessageEmbed()
            .setDescription(`\`IV\` - Modération Discord
            Les sanctions seront prises à la discrétion du membre du personnel en fonction de la gravité de la faute. Cela signifie que les pénalités décrites ci-dessus ne seront pas nécessairement les mêmes que celles qui vous sont infligées.
            .\`1\`- Les membres du staff se référeront aux règles en vigueur dans ce serveur pour vos sanctions. Cependant, si aucun article ne définit une situation problématique, la sanction sera laissée à l'appréciation du personnel, un avertissement vous sera donné avant toute sanction dans ce cas. En cas de récidive, vous devrez subir la sanction prévue de ce fait.
            .\`2\`- Tout abus de confiance excessif sera interdit pour une durée déterminée.
            .\`3\`- En cas d'attaque personnelle en privé, prévenez rapidement un modérateur, il interviendra directement pour tenter d'apaiser la situation si la situation ne s'améliore pas il passera aux sanctions.`)
            message.channel.send({embed4})
        }, ms(time4))


        let time5 = "16s";
        setTimeout(function () {

            let embed5 = new MessageEmbed()
            .setDescription("Vous devez respecter tous les utilisateurs, quel que soit votre goût pour eux. Traitez les autres comme vous aimeriez être traité")
            message.channel.send({embeds: [embed5]})
        }, ms(time5))


        let time6 = "19s";
        setTimeout(function () {

            let embed6 = new MessageEmbed()
            .setDescription("L'utilisation de blasphèmes doit être réduite au minimum. Cependant, tout langage désobligeant envers tout utilisateur est interdit.")
            message.channel.send({embeds: [embed6]})
        }, ms(time6))


        let time7 = "22s";

        setTimeout(function () {
            let embed7 = new MessageEmbed()
            .setDescription("N'envoyez pas beaucoup de petits messages les uns après les autres. Ne perturbez pas le chat en spammant.")
            message.channel.send({embeds: [embed7]})
        }, ms(time7))





        let time9 = "25s";

        setTimeout(function () {
            let embed9 = new MessageEmbed()
            .setDescription('Il vous sera demandé de changer votre nom ou votre photo si le personnel les juge inappropriés.')
            message.channel.send({embeds: [embed9]})
        }, ms(time9))



        let time10 = "31s";

        setTimeout(function () {

            let embed10 = new MessageEmbed()
            .setDescription('Les raids ou mentions de raids ne sont pas autorisés.')
            message.channel.send({embeds: [embed10]})
        }, ms(time10))

  


  
        let time11 = "34s";

        setTimeout(function () {

            let embed11 = new MessageEmbed()
            .setDescription('Les menaces contre les autres utilisateurs de DDoS, Death, DoX, abus et autres menaces malveillantes sont absolument interdites et interdites.')
            message.channel.send({embeds: [embed11]})
        }, ms(time11))


        let time12 = "37s";

        setTimeout(function () {

            let embed12 = new MessageEmbed()
            .setDescription(`- == - == - == - == - == - == - == - == - == - == - == - == -
            Veuillez prendre le temps de lire attentivement cette politique.
            
             Merci à tous de prendre en compte les T.O.S de Discord, pour cela, cliquez ci-dessous https://discordapp.com/terms
            - == - == - == - == - == - == - == - == - == - == - == - == -`)
            message.channel.send({embeds: [embed12]})
        }, ms(time12))


   
   
  
 
   

  
    

   

   
    

    
   
    }
    
}