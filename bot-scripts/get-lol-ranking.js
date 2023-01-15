import axios from "axios";

/**
 * Get the LoL rankings for a summoner
 * @param {string} summonerName of the player to get the ranking for
 * @returns {Promise<Array>} array of the player's tft rankings
 */
async function getLoLRankings(summonerName) {
  const rankings = [];

  try {
    const summonerData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_LOL_API_KEY}`);
    const summonerEncryptedId = summonerData.data.id;
    const summonerRankings = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerEncryptedId}?api_key=${process.env.RIOT_LOL_API_KEY}`);

    if (summonerRankings.data.length > 0) {
      for (const rank of summonerRankings.data) {
        if (rank.queueType === "RANKED_TFT_DOUBLE_UP") {
          rankings.push(rank);
        }

        // else if (rank.queueType === "RANKED_SOLO_5x5") {
        //   rankings.push(rank);
        // }
      }
    }
    return rankings;
  } catch (error) {
    console.log("error retrieving lol rankings");
    console.error(error);
    return rankings;
  }
}

export default getLoLRankings;
