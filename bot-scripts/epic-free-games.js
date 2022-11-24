const { getGames } = require("epic-free-games");

const getFreeEPICGamesFormatted = async () => {
    const message = await getGames("US", true).then((games) => {
        const curentFreeGames = games.currentGames.map((game) => `[${game.title}](https://store.epicgames.com/en-US/p/${game.productSlug})`).join("\n");
        const nextFreeGames = games.nextGames.map((game) => `[${game.title}](https://store.epicgames.com/en-US/p/${game.productSlug})`).join("\n");
        
        console.log(games.currentGames);
        // loop through games.currentGames
        games.currentGames.forEach((game) => {
            console.log(game.title);
            console.log(game.urlSlug);
            console.log(game.url);
            console.log(game.productSlug);
            console.log(game.expiryDate);
        });

        return `**EPIC Free Games**\n**Now**\n${curentFreeGames}\n**Coming Soon**\n${nextFreeGames}`;
        }).catch((err) => {
        console.log(err);
        return 'Error fetching games.';
    });
    return message;
};

module.exports = { getFreeEPICGamesFormatted };
