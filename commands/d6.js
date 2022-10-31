const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('d6')
		.setDescription('Roll a d6'),
	async execute(interaction) {
        await interaction.reply(String(Math.floor(Math.random() * 6) + 1))
	},
};