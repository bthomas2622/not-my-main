import { getApexRanking } from "../bot-scripts/get-apex-ranking.js";

/**
 * Get the Apex Legends rankings for a given usernames
 * @param {string[]} usernameArray array of usernames to get rankings for
 * @returns {Promise<string>} formatted string of the player rankings
 */
async function staggerApexRankings(usernameArray) {
  const awokenRankings = {};

  for (const username of usernameArray) {
    try {
      const playerRanking = await getApexRanking(username);

      if (playerRanking === null) {
        awokenRankings[username] = "Unable to retrieve ranking";
      } else {
        awokenRankings[username] = playerRanking;
      }
    } catch (error) {
      console.log(`error retrieving apex rankings for ${username} in staggerApexRankings`);
      console.error(error);
      awokenRankings[username] = "Unable to retrieve ranking";
    }
  }
  return awokenRankings;
}

export default { staggerApexRankings };
