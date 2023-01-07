import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("coin-flip")
  .setDescription("Flip a coin");

/**
 * Execute the command to flip a coin
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
export async function execute(interaction) {
  const num = Math.random();
  let coin;

  if (num < 0.5) {
    coin = "HEADS";
  } else {
    coin = "TAILS";
  }
  await interaction.reply(coin);
}
