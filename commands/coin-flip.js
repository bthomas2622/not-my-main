const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coin-flip')
		.setDescription('Flip a coin'),
	async execute(interaction) {
		let num = Math.random();
        let coin;
        if (num < 0.5) { coin = "HEADS";} else { coin = "TAILS";}
        await interaction.reply(coin)
	},
};