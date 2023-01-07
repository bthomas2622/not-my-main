import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("d20")
  .setDescription("Roll a d20");

/**
 * Execute the command to roll a d20
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
export async function execute(interaction) {
  await interaction.reply(String(Math.floor(Math.random() * 20) + 1));
}
