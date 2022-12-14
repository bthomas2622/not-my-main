const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const legends = require('../apex_legends.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apex-not-my-main')
		.setDescription('Generate a random Apex Legends champion, if you lose it\'s ok! It\'s not your main'),
	async execute(interaction) {
                const apexLegendList = Object.keys(legends);
                let chosenLegend = apexLegendList[Math.floor(Math.random() * apexLegendList.length)];
                let chosenLegendVoiceLines = legends[chosenLegend];
                let response = "**" + chosenLegend.replace(/_/g, ' ') + "**" + " - " + '"' + chosenLegendVoiceLines[Math.floor(Math.random() * chosenLegendVoiceLines.length)] + '"';
                let attachment = new AttachmentBuilder().setName(chosenLegend + '.png').setFile('./pics/apex/' + chosenLegend + '.png');
                await interaction.reply({
                        content: response, 
                        files: [attachment]
                });
	},
};
