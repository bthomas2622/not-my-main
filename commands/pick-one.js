import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("pick-one")
  .setDescription("Input a comma separated list of options and pick one randomly")
  .addStringOption(option => option.setName("options")
    .setDescription("Comma separated list of things to choose from")
    .setRequired(true)
    .setMinLength(1));

/**
 * Execute the command to pick one option from a list
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
export async function execute(interaction) {
  const options = interaction.options.getString("options");
  const optionsArray = options.split(",");

  await interaction.reply(`**Options Given**: ${options}\n**Chosen**: ${optionsArray[Math.floor(Math.random() * optionsArray.length)]}`);
}
