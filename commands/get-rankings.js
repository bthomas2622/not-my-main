const { SlashCommandBuilder } = require('discord.js');
const { getTFTRankings } = require('../bot-scripts/get-tft-ranking.js');
const { getApexRanking } = require('../bot-scripts/get-apex-ranking.js');
const { staggerApexRankings } = require('../bot-utils/staggerApexApi.js');
const { rankingsFormatter } = require('../bot-utils/rankingsFormatter.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get-rankings')
		.setDescription('Get Awoken rankings')
        .addStringOption(option =>
            option.setName('options')
                .setDescription('awoken, ben, patrick, alex')
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(7)),
	async execute(interaction) {
        const target = interaction.options.getString('options').toLowerCase();
        let options = ['awoken', 'ben', 'patrick', 'alex'];
        if (!options.includes(target)) {
            await interaction.reply(`Invalid option. Valid options are: ${options.join(', ')}`)
        } else {
            if (target === 'awoken') {
                try {
                    await interaction.deferReply();
                    let patrickTFTRankings = await getTFTRankings('FigFire');
                    let benTFTRankings = await getTFTRankings('freeBrunch');
                    let awokenApexRankings = await staggerApexRankings(['freeBrunch', 'FigFire1', 'alliedengineer']);
                    let patrickApexRanking = awokenApexRankings.FigFire1;
                    let benApexRanking = awokenApexRankings.freeBrunch;
                    let alexApexRanking = awokenApexRankings.alliedengineer;
                    await interaction.reply(`**Patrick**\n${rankingsFormatter(patrickTFTRankings, true, patrickApexRanking, true)}\n**Ben**\n${rankingsFormatter(benTFTRankings, true, benApexRanking, true)}\n**Alex**\n${rankingsFormatter(null, false, alexApexRanking, true)}`)    
                } catch (error) {
                    console.log('error retrieving awoken rankings in get-rankings.js');
                    console.error(error);
                    await interaction.reply('Unable to retrieve rankings for Awoken')
                }
            } else if (target === 'ben') {
                let benTFTRankings = await getTFTRankings('freeBrunch');
                let benApexRanking = await getApexRanking('freeBrunch');
                if (benTFTRankings.length === 0 && benApexRanking === null) {
                    await interaction.reply('No rankings found for Ben')
                } else {
                    await interaction.reply(`**Ben**\n${rankingsFormatter(benTFTRankings, true, benApexRanking, true)}`)
                }
            } else if (target === 'patrick') {
                let patrickTFTRankings = await getTFTRankings('FigFire');
                let patrickApexRanking = await getApexRanking('FigFire1');
                if (patrickTFTRankings.length === 0 && patrickApexRanking === null) {
                    await interaction.reply('No rankings found for Patrick')
                } else {
                    await interaction.reply(`**Patrick**\n${rankingsFormatter(patrickTFTRankings, true, patrickApexRanking, true)}`)
                }
            } else if (target === 'alex') {
                let alexApexRanking = await getApexRanking('alliedengineer');
                if (alexApexRanking === null) {
                    await interaction.reply('No rankings found for Alex')
                } else {
                    await interaction.reply(`**Alex**\n${rankingsFormatter(null, false, alexApexRanking, true)}`)
                }
            }
        }
	},
};