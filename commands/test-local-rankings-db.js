const { SlashCommandBuilder } = require('discord.js');
const { getLocalRankingDb } = require('../bot-utils/local-ranking-db.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test-local-rankings-db')
        .setDescription('Test local rankings db'),
    async execute(interaction) {
        let localRankingDb = await getLocalRankingDb();
        await interaction.reply(`test-local-rankings-db: ${JSON.stringify(localRankingDb)}`)
	},
};