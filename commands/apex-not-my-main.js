import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import legends from "../apex_legends.json" assert { type: 'json' };

const data = new SlashCommandBuilder()
  .setName("apex-not-my-main")
  .setDescription("Generate a random Apex Legends champion, if you lose it's ok! It's not your main");

/**
 * Execute the command to generate a random Apex Legends champion
 * @param {Interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  const apexLegendList = Object.keys(legends);
  const chosenLegend = apexLegendList[Math.floor(Math.random() * apexLegendList.length)];
  const chosenLegendVoiceLines = legends[chosenLegend];
  const response = `**${chosenLegend.replace(/_/u, " ")}** - ${chosenLegendVoiceLines[Math.floor(Math.random() * chosenLegendVoiceLines.length)]}`;
  const attachment = new AttachmentBuilder().setName(`${chosenLegend}.png`).setFile(`./pics/apex/${chosenLegend}.png`);

  await interaction.reply({
    content: response,
    files: [attachment]
  });
}

export { data as apexCommandData, execute as apexCommandExecute };
