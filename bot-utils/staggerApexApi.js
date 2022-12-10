const { getApexRanking } = require('../bot-scripts/get-apex-ranking.js');

const staggerApexRankings = async (usernameObject) => {
    let awokenRankings = {};
    let i = 0;
    for (const username of usernameObject) {
        try {
            let playerRanking = await getApexRanking(username);
            awokenRankings[username] = playerRanking;
            if (i === usernameObject.length - 1) break;
            await delay(1000);
            i += 1;
        } catch (error) {
            console.log(`error retrieving apex rankings for ${username}`);
            console.error(error);
            awokenRankings[username] = "Unable to retrieve ranking";
        }
    }
    return awokenRankings;
};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = { staggerApexRankings };