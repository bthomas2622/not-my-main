const axios = require("axios");

const callApi = async () => {
    const summonerData = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/freeBrunch?api_key=${process.env.RIOT_TFT_API_KEY}`);
    console.log(summonerData);
}

callApi();