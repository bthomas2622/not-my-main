const { getGames } = require("epic-free-games");

const getFreeEPICGamesFormatted = async () => {
    let message = "";
    await getGames("US", true).then((games) => {
        const curentFreeGames = games.currentGames.map((game) => `[${game.title}](https://store.epicgames.com/en-US/p/${game.productSlug})`).join("\n");
        const nextFreeGames = games.nextGames.map((game) => `[${game.title}](https://store.epicgames.com/en-US/p/${game.productSlug})`).join("\n");
        message = `**EPIC Free Games**\n**Now**\n${curentFreeGames}\n**Coming Soon**\n${nextFreeGames}`;
        return message;
        }).catch((err) => {
        message = 'Error fetching games.';
        console.log(err);
        return message;
    });
};

module.exports = { getFreeEPICGamesFormatted };
