const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('d20')
		.setDescription('Roll a d20'),
	async execute(interaction) {
        await interaction.reply(String(Math.floor(Math.random() * 20) + 1))
	},
};