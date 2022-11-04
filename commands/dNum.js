const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dNum')
        .setDescription('Input the number of sides on a die and roll it!')
        .addIntegerOption(option =>
            option.setName('Sides')
                .setDescription('The number of sides on the die')
                .setRequired(true)
                .setMaxValue(MAX_SAFE_INTEGER)
                .setMinValue(2)),
    async execute(interaction) {
        const sides = interaction.options.getInteger('sides');
        await interaction.reply(String(Math.floor(Math.random() * sides) + 1))
	},
};