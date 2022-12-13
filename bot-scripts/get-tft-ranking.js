const axios = require("axios");

const getTFTRankings = async (summonerName) => {
    let rankings = [];
    try {
        const summonerData = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_TFT_API_KEY}`);
        const summonerEncryptedId = summonerData.data.id;
        const summonerRankings = await axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerEncryptedId}?api_key=${process.env.RIOT_TFT_API_KEY}`);
        if (summonerRankings.data.length > 0) {
            for (const rank of summonerRankings.data) {
                if (rank.queueType === "RANKED_TFT_DOUBLE_UP") {
                    rankings.push(rank);
                } else if (rank.queueType === "RANKED_TFT") {
                    rankings.push(rank);
                }
            }
        } 
        return rankings;
    } catch (error) {
        console.log("error retrieving tft rankings");
        console.error(error);
        return rankings;
    }
};

module.exports = { getTFTRankings };
