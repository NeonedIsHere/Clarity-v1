const db = require("quick.db")
module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        const cmd = client.slashcom.get(interaction.commandName)
        if (!cmd) return interaction.reply({ content: "Une erreur est survenue", ephemeral : true});
           
        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        let user = interaction.user
        let message = interaction
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
}