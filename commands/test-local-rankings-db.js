import { SlashCommandBuilder } from "discord.js";
import { getLocalRankingDb } from "../bot-utils/local-ranking-db.js";

export const data = new SlashCommandBuilder()
  .setName("test-local-rankings-db")
  .setDescription("Test local rankings db");

/**
 * Execute the command to test local rankings db
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
export async function execute(interaction) {
  const localRankingDb = await getLocalRankingDb();

  await interaction.reply(`test-local-rankings-db: ${JSON.stringify(localRankingDb)}`);
}
