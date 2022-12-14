const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pick-one')
        .setDescription('Input a comma separated list of options and pick one randomly')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Comma separated list of things to choose from')
                .setRequired(true)
                .setMinLength(1)),
    async execute(interaction) {
        const options = interaction.options.getString('options');
        const optionsArray = options.split(',');
        await interaction.reply(`**Options Given**: ${options}\n**Chosen**: ${optionsArray[Math.floor(Math.random() * optionsArray.length)]}`)
	},
};
