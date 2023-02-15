import axios from "axios";

/**
 * Get the game id for a game in the RAWG API
 * @param {string} gameName the name of the game to search for
 * @returns {Promise<string>} the game id
 */
async function getRAWGGameId(gameName) {

  try {
    const gameData = await axios.get(`https://rawg.io/api/games?search=${gameName}&key=${process.env.RAWG_API_KEY}&page_size=1`);

    if (gameData.data.count === 0) {
      return null;
    }
    return gameData.data.results[0].id;
  } catch (error) {
    console.log("error retrieving game id");
    console.error(error);
    return null;
  }

}

export default getRAWGGameId;
