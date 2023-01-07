import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("d-num")
  .setDescription("Input the number of sides on a die and roll it")
  .addIntegerOption(option => option.setName("sides")
    .setDescription("The number of sides on the die")
    .setRequired(true)
    .setMaxValue(Number.MAX_SAFE_INTEGER)
    .setMinValue(2));

/**
 * Execute the command to roll a die
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
export async function execute(interaction) {
  const sides = interaction.options.getInteger("sides");

  await interaction.reply(`**Sides**: ${sides}\n**Rolled**: ${String(Math.floor(Math.random() * sides) + 1)}`);
}
