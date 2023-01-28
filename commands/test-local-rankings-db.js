import { SlashCommandBuilder } from "discord.js";
import { getLocalRankingDb, updateLocalRankingDb } from "../bot-utils/localRankingDB.js";
import formatGameName from "../bot-utils/formatGameName.js";
import capitalizeFirstLetterOnly from "../bot-utils/capitalizeFirstLetterOnly.js";

const data = new SlashCommandBuilder()
  .setName("test-local-rankings-db")
  .setDescription("Test local rankings db");

/**
 * Execute the command to test local rankings db
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  let message = "nothing yet";

  await interaction.deferReply();


  try {
    const oldRankingData = await getLocalRankingDb();

    if (oldRankingData) {
      await updateLocalRankingDb();
      const newRankingData = await getLocalRankingDb();
      const rankingTiers = ["iron", "bronze", "silver", "gold", "platinum", "diamond", "master", "grandmaster", "challenger"];
      const changedRanks = { ben: [], alex: [], patrick: [] };
      let changedRanksCount = 0;

      // loop throughn oldRankingData and newRankingData and compare the values
      // if the values are different, add the difference to the changedRanks ranking object
      Object.keys(oldRankingData).forEach(player => {
        Object.keys(oldRankingData[player]).forEach(game => {
          const oldRankFormatted = oldRankingData[player][game] ? oldRankingData[player][game].split(" ")[0].toLowerCase() : "na";
          const newRankFormatted = newRankingData[player][game] ? newRankingData[player][game].split(" ")[0].toLowerCase() : "na";

          if (rankingTiers.includes(newRankFormatted) && rankingTiers.includes(oldRankFormatted)) {
            if (rankingTiers.indexOf(newRankFormatted) > rankingTiers.indexOf(oldRankFormatted)) {
              changedRanks[player].push({
                game,
                oldRanking: oldRankingData[player][game],
                newRanking: newRankingData[player][game]
              });
              changedRanksCount++;
            }
          }
        });
      });

      if (changedRanksCount > 0) {
        message = "**AWOKEN GRIND UPDATE:**\n";

        Object.keys(changedRanks).forEach(player => {
          message += `**${capitalizeFirstLetterOnly(player)}**\n`;
          changedRanks[player].forEach(update => {
            message += `${formatGameName(update.game)}: ~~${update.oldRanking}~~ ${update.newRanking}\n`;
          });
        });
      }
    }
  } catch (error) {
    console.log("error running daily ranking script");
    console.error(error);
  }

  await interaction.editReply(message);
}

export { data as testLocalRankingsDbCommandData, execute as testLocalRankingsDbCommandExecute };
