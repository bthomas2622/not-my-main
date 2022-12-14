const axios = require("axios");

const getApexRanking = async (username) => {
    try {
        const playerData = await axios.get(`https://api.mozambiquehe.re/bridge?auth=${process.env.APEX_API_KEY}&player=${username}&platform=PC`, { headers: { "Accept-Encoding": "gzip,deflate,compress" }});
        return playerData.data.global.rank.rankName + " " + playerData.data.global.rank.rankDiv;
    } catch (error) {
        console.log("error retrieving apex rankings for " + username + " in getApexRanking");
        console.error(error);
        return null;
    }
};

module.exports = { getApexRanking };
