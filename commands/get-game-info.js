import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import getRAWGGameId from "../bot-scripts/rawg-get-game-id.js";
import getRAWGGameInfo from "../bot-scripts/rawg-get-game-info.js";

const data = new SlashCommandBuilder()
  .setName("get-game-info")
  .setDescription("Get information about a game")
  .addStringOption(option => option.setName("game")
    .setDescription("The name of the game")
    .setRequired(true)
    .setMinLength(1));

/**
 * Execute the command to search the RAWG API for a game
 * @param {Interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  try {
    const game = interaction.options.getString("game");
    const gameId = await getRAWGGameId(game);

    if (gameId === null) {
      await interaction.reply(`Sorry, I couldn't find any information about ${game}`);
    } else {
      const gameInfo = await getRAWGGameInfo(gameId);
      const embed = new EmbedBuilder();

      if (gameInfo.name !== null && gameInfo.name !== "") {
        embed.setTitle(gameInfo.name);
      }
      embed.setColor("Random");
      if (gameInfo.description_raw !== null && gameInfo.description_raw !== "") {
        if (gameInfo.description_raw.length > 300) {
          embed.setDescription(`${gameInfo.description_raw.slice(0, 300)}...`);
        } else {
          embed.setDescription(gameInfo.description_raw);
        }
      }
      if (gameInfo.released !== null) {
        embed.addFields({ name: "Release date", value: gameInfo.released });
      }
      if (gameInfo.background_image !== null && gameInfo.background_image !== "") {
        embed.setImage(gameInfo.background_image);
      }
      if (gameInfo.website !== null && gameInfo.website !== "") {
        embed.setURL(gameInfo.website);
      }
      if (gameInfo.developers !== null && gameInfo.developers.length > 0) {
        embed.setAuthor({ name: gameInfo.developers[0].name });
      }
      if (gameInfo.metacritic_url !== null && gameInfo.metacritic_url !== "") {
        embed.addFields({ name: "Metacritic", value: `[${gameInfo.metacritic}](${gameInfo.metacritic_url})` });
      }
      if (gameInfo.reddit_url !== null && gameInfo.reddit_url !== "") {
        embed.addFields({ name: "Reddit", value: `[${gameInfo.reddit_name}](${gameInfo.reddit_url})` });
      }
      if (gameInfo.stores.length > 0) {
        let storeString = "";

        for (const store of gameInfo.stores) {
          storeString += `[${store.store.name}](https://www.google.com/search?q=${store.store.name.split(" ").join("+")}+${game.split(" ").join("+")})\n`;
        }
        embed.addFields({ name: "Stores", value: storeString });
      }
      embed.setFooter({ text: "Game info provided by RAWG API", iconURL: "https://rawg.io/assets/en/share-vk.png?v=4" });
      await interaction.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.log("error executing get-game-info command");
    console.error(error);
    await interaction.reply("Sorry, there was an error fetching game information");
  }
}

export { data as gameInfoCommandData, execute as gameInfoCommandExecute };
