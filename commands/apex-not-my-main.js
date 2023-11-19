import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import legends from "../apex_legends.js";

const data = new SlashCommandBuilder()
  .setName("apex-not-my-main")
  .setDescription("Generate a random Apex Legends champion, if you lose it's ok! It's not your main")
  .addStringOption(option =>
    option.setName("class")
      .setDescription("Champion Class")
      .setRequired(true)
      .addChoices(
        { name: "Any", value: "any" },
        { name: "Assault", value: "assault" },
        { name: "Controller", value: "controller" },
        { name: "Recon", value: "recon" },
        { name: "Skirmisher", value: "skirmisher" },
        { name: "Support", value: "support" }
      ));

/**
 * Execute the command to generate a random Apex Legends champion
 * @param {Interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  const chosenCLass = interaction.options.getString("class");

  const apexLegendList = Object.keys(legends);
  const assaultLegendList = apexLegendList.filter(legend => legends[legend].class === "assault");
  const controllerLegendList = apexLegendList.filter(legend => legends[legend].class === "controller");
  const reconLegendList = apexLegendList.filter(legend => legends[legend].class === "recon");
  const skirmisherLegendList = apexLegendList.filter(legend => legends[legend].class === "skirmisher");
  const supportLegendList = apexLegendList.filter(legend => legends[legend].class === "support");
  let chosenLegend;

  if (chosenCLass === "any") {
    chosenLegend = apexLegendList[Math.floor(Math.random() * apexLegendList.length)];
  } else if (chosenCLass === "assault") {
    chosenLegend = assaultLegendList[Math.floor(Math.random() * assaultLegendList.length)];
  } else if (chosenCLass === "controller") {
    chosenLegend = controllerLegendList[Math.floor(Math.random() * controllerLegendList.length)];
  } else if (chosenCLass === "recon") {
    chosenLegend = reconLegendList[Math.floor(Math.random() * reconLegendList.length)];
  } else if (chosenCLass === "skirmisher") {
    chosenLegend = skirmisherLegendList[Math.floor(Math.random() * skirmisherLegendList.length)];
  } else if (chosenCLass === "support") {
    chosenLegend = supportLegendList[Math.floor(Math.random() * supportLegendList.length)];
  } else {
    await interaction.reply("Invalid class");
    return;
  }

  const chosenLegendVoiceLines = legends[chosenLegend].lines;
  const response = `**${chosenLegend.replace(/_/u, " ")}** - ${chosenLegendVoiceLines[Math.floor(Math.random() * chosenLegendVoiceLines.length)]}\n**Class Rolled**: ${chosenCLass.charAt(0).toUpperCase() + chosenCLass.slice(1)}\n`;
  const attachment = new AttachmentBuilder().setName(`${chosenLegend}.png`).setFile(`./pics/apex/${chosenLegend}.png`);

  await interaction.reply({
    content: response,
    files: [attachment]
  });
}

export { data as apexCommandData, execute as apexCommandExecute };
