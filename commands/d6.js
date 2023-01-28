import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("d6")
  .setDescription("Roll a d6");

/**
 * Execute the command to roll a d6
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  await interaction.reply(String(Math.floor(Math.random() * 6) + 1));
}

export { data as d6CommandData, execute as d6CommandExecute };
