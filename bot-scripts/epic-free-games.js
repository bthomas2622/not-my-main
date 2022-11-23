const { getGames } = require("epic-free-games");

// send free games to general discord channel
const sendGames = async (client) => {
    try {
        const games = await getGames();
        const channel = client.channels.cache.get('general');
        channel.send(games);
    }
    catch (error) {
        console.error(error);
    }
};

getGames("US", true).then((games) => {
  const curentFreeGames = games.currentGames.map((game) => game.title).join("\n");
  const nextFreeGames = games.currentGames.map((game) => game.title).join("\n");
  const message = `**Current Free Games**\n${curentFreeGames}\n\n**Next Free Games**\n${nextFreeGames}`;
  return message;
});