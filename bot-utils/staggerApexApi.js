const { getApexRanking } = require('../bot-scripts/get-apex-ranking.js');

const staggerApexRankings = async (usernameArray) => {
    let awokenRankings = {};
    for (const username of usernameArray) {
        try {
            let playerRanking = await getApexRanking(username);
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
};

module.exports = { staggerApexRankings };