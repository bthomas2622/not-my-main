import axios from "axios";

/**
 * Get the game info for a game in the RAWG API
 * @param {string} gameId the name of the game to retrieve information for
 * @returns {Promise<Object>} the game information
 */
async function getRAWGGameInfo(gameId) {

  try {
    const gameData = await axios.get(`https://rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`);

    return gameData.data;
  } catch (error) {
    console.log("error retrieving game information");
    console.error(error);
    return null;
  }

}

export default getRAWGGameInfo;
