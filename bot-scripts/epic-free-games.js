const { getGames } = require("epic-free-games");

const getFreeEPICGamesFormatted = async () => {
    const message = await getGames("US", true).then((games) => {
        const curentFreeGames = games.currentGames.map((game) => game.title).join("\n");
        const nextFreeGames = games.nextGames.map((game) => game.title).join("\n");
        return `**---This Week---**\n${curentFreeGames}\n**---Next Week---**\n${nextFreeGames}`;
        }).catch((err) => {
        console.log(err);
        return 'Error fetching games.';
    });
    return message;
};

module.exports = { getFreeEPICGamesFormatted };
