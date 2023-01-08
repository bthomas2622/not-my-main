import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("d20")
  .setDescription("Roll a d20");

/**
 * Execute the command to roll a d20
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  await interaction.reply(String(Math.floor(Math.random() * 20) + 1));
}

export { data as d20CommandData, execute as d20CommandExecute };
