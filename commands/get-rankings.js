import { SlashCommandBuilder } from "discord.js";
import getTFTRankings from "../bot-scripts/get-tft-ranking.js";
import getApexRanking from "../bot-scripts/get-apex-ranking.js";
import staggerApexRankings from "../bot-utils/staggerApexApi.js";
import rankingsFormatter from "../bot-utils/rankingsFormatter.js";

const data = new SlashCommandBuilder()
  .setName("get-rankings")
  .setDescription("Get Awoken rankings")
  .addStringOption(option => option.setName("options")
    .setDescription("awoken, ben, patrick, alex")
    .setRequired(true)
    .setMinLength(1)
    .setMaxLength(7));

/**
 * Execute the get-rankings command to get Awoken rankings
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  const target = interaction.options.getString("options").toLowerCase();
  const options = ["awoken", "ben", "patrick", "alex"];

  if (!options.includes(target)) {
    await interaction.reply(`Invalid option. Valid options are: ${options.join(", ")}`);
  } else {
    if (target === "awoken") {
      try {
        await interaction.deferReply();
        const patrickTFTRankings = await getTFTRankings("FigFire");
        const benTFTRankings = await getTFTRankings("freeBrunch");
        const awokenApexRankings = await staggerApexRankings(["freeBrunch", "FigFire1", "alliedengineer"]);
        const patrickApexRanking = awokenApexRankings.FigFire1;
        const benApexRanking = awokenApexRankings.freeBrunch;
        const alexApexRanking = awokenApexRankings.alliedengineer;

        await interaction.editReply(`**Patrick**\n${rankingsFormatter(patrickTFTRankings, true, patrickApexRanking, true)}**Ben**\n${rankingsFormatter(benTFTRankings, true, benApexRanking, true)}**Alex**\n${rankingsFormatter(null, false, alexApexRanking, true)}`);
      } catch (error) {
        console.log("error retrieving awoken rankings in get-rankings.js");
        console.error(error);
        await interaction.editReply("Unable to retrieve rankings for Awoken");
      }
    } else if (target === "ben") {
      const benTFTRankings = await getTFTRankings("freeBrunch");
      const benApexRanking = await getApexRanking("freeBrunch");

      if (benTFTRankings.length === 0 && benApexRanking === null) {
        await interaction.reply("No rankings found for Ben");
      } else {
        await interaction.reply(`**Ben**\n${rankingsFormatter(benTFTRankings, true, benApexRanking, true)}`);
      }
    } else if (target === "patrick") {
      const patrickTFTRankings = await getTFTRankings("FigFire");
      const patrickApexRanking = await getApexRanking("FigFire1");

      if (patrickTFTRankings.length === 0 && patrickApexRanking === null) {
        await interaction.reply("No rankings found for Patrick");
      } else {
        await interaction.reply(`**Patrick**\n${rankingsFormatter(patrickTFTRankings, true, patrickApexRanking, true)}`);
      }
    } else if (target === "alex") {
      const alexApexRanking = await getApexRanking("alliedengineer");

      if (alexApexRanking === null) {
        await interaction.reply("No rankings found for Alex");
      } else {
        await interaction.reply(`**Alex**\n${rankingsFormatter(null, false, alexApexRanking, true)}`);
      }
    }
  }
}

export { data as getRankingsCommandData, execute as getRankingsCommandExecute };
