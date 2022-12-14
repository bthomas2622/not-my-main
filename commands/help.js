const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('List all available commands'),
    async execute(interaction) {
        let str = '';
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
        const command = require(`./${file}`);
            if (command.data.name) {
                str += `**/${command.data.name}** - ${command.data.description} \n`;
            }
        }

        return interaction.reply({
            content: str,
            ephemeral: true,
        });
    },
};
