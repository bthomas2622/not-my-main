const { getGames } = require("epic-free-games");

// send free games to general discord channel
const sendGames = async () => {
    let message = "";
    try {
        await getGames("US", true).then((games) => {
            const curentFreeGames = games.currentGames.map((game) => game.title).join("\n");
            const nextFreeGames = games.currentGames.map((game) => game.title).join("\n");
            message = `**Current Free Games**\n${curentFreeGames}\n\n**Next Free Games**\n${nextFreeGames}`;
          }).catch((err) => {
            message = 'Error fetching games.';
            console.log(err);
        });
        return message;
    }
    catch (error) {
        console.error(error);
    }
    return message;
};

module.exports = { sendGames };
