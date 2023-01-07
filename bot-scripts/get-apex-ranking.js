import { get } from "axios";

/**
 * Get the Apex Legends ranking for a given username
 * @param {string} username of the player to get the ranking for
 * @returns {Promise<string>} formatted string of the player's ranking
 */
async function getApexRanking(username) {
  try {
    const playerData = await get(`https://api.mozambiquehe.re/bridge?auth=${process.env.APEX_API_KEY}&player=${username}&platform=PC`, { headers: { "Accept-Encoding": "gzip,deflate,compress" } });

    return `${playerData.data.global.rank.rankName} ${playerData.data.global.rank.rankDiv}`;
  } catch (error) {
    console.log(`error retrieving apex rankings for ${username} in getApexRanking`);
    console.error(error);
    return null;
  }
}

export default { getApexRanking };
