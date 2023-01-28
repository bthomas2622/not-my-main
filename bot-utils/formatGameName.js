/**
 * takes in db game name like "tftSolo" and formats it to "TFT Solo"
 * @param { string } gameName the name of the game to format
 * @returns {string} the formatted game name
 */
function formatGameName(gameName) {
  if (gameName === "tftSolo") {
    return "TFT Solo";
  }
  if (gameName === "tftDuo") {
    return "TFT Duo";
  }
  if (gameName === "apex") {
    return "Apex Legends";
  }

  return gameName;
}

export default formatGameName;
