/**
 * Formats the rankings into a string to be sent to the bot
 * @param {string} tftRankings array of tft rankings
 * @param {string} tftBool boolean to determine if tft rankings should be included
 * @param {string} apexRanking string of the apex ranking
 * @param {string} apexRankingBool boolean to determine if apex rankings should be included
 * @returns {string} string of the rankings
 */
function rankingsFormatter(tftRankings, tftBool, apexRanking, apexRankingBool) {
  let str = "";

  if (tftRankings && tftRankings.length > 0) {
    for (let i = 0; i < tftRankings.length; i++) {
      if (tftRankings[i].queueType === "RANKED_TFT") {
        str += `TFT Solo: ${tftRankings[i].tier} ${tftRankings[i].rank} - ${tftRankings[i].leaguePoints} LP\n`;
      } else if (tftRankings[i].queueType === "RANKED_TFT_DOUBLE_UP") {
        str += `TFT Duos: ${tftRankings[i].tier} ${tftRankings[i].rank} - ${tftRankings[i].leaguePoints} LP\n`;
      }
    }
  } else {
    if (tftBool) {
      str += "No TFT rankings found\n";
    }
  }
  if (apexRanking) {
    str += `Apex Legends: ${apexRanking}\n`;
  } else {
    if (apexRankingBool) {
      str += "No Apex rankings found";
    }
  }
  return str;
}

export default { rankingsFormatter };
