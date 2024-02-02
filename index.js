import * as dotenv from "dotenv";
// eslint-disable-next-line node/no-missing-import
import { Low } from "lowdb";
// eslint-disable-next-line node/no-missing-import
import { JSONFile } from "lowdb/node";
import schedule from "node-schedule";
import { Client, Events, Collection, GatewayIntentBits, EmbedBuilder } from "discord.js";
import getFreeEPICGamesFormatted from "./bot-scripts/epic-free-games.js";
import dailyRanking from "./bot-scripts/daily-ranking.js";
import { updateLocalRankingDb } from "./bot-utils/localRankingDB.js";
import specialEmojis from "./bot-scripts/specialEmojis.js";
import { fetchMessageHistory, processMessageHistory } from "./bot-scripts/message-history.js";

// Command Data
import { apexCommandData, apexCommandExecute } from "./commands/apex-not-my-main.js";
import { coinFlipCommandData, coinFlipCommandExecute } from "./commands/coin-flip.js";
import { dNumCommandData, dNumCommandExecute } from "./commands/d-num.js";
import { d6CommandData, d6CommandExecute } from "./commands/d6.js";
import { d20CommandData, d20CommandExecute } from "./commands/d20.js";
import { getRankingsCommandData, getRankingsCommandExecute } from "./commands/get-rankings.js";
import { helpCommandData, helpCommandExecute } from "./commands/help.js";
import { pickOneCommandData, pickOneCommandExecute } from "./commands/pick-one.js";
import { gameInfoCommandData, gameInfoCommandExecute } from "./commands/get-game-info.js";
import { testLocalRankingsDbCommandData, testLocalRankingsDbCommandExecute } from "./commands/test-local-rankings-db.js";

// eslint-disable-next-line max-len
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });

const db = new Low(new JSONFile("db.json"));

const commandsData = [apexCommandData, coinFlipCommandData, dNumCommandData, d6CommandData, d20CommandData,
  getRankingsCommandData, helpCommandData, pickOneCommandData, gameInfoCommandData];
const commandsExecute = [apexCommandExecute, coinFlipCommandExecute, dNumCommandExecute, d6CommandExecute,
  d20CommandExecute, getRankingsCommandExecute, helpCommandExecute, pickOneCommandExecute, gameInfoCommandExecute];

const commandsDataLocal = [apexCommandData, coinFlipCommandData, dNumCommandData, d6CommandData, d20CommandData,
  getRankingsCommandData, helpCommandData, pickOneCommandData, gameInfoCommandData, testLocalRankingsDbCommandData];
const commandsExecuteLocal = [apexCommandExecute, coinFlipCommandExecute, dNumCommandExecute, d6CommandExecute,
  d20CommandExecute, getRankingsCommandExecute, helpCommandExecute, pickOneCommandExecute, gameInfoCommandExecute, testLocalRankingsDbCommandExecute];

client.commands = new Collection();

// loop through commandsData and commandsExecute and add to client.commands
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
  commandsData.forEach((commandData, index) => {
    client.commands.set(commandData.name, { data: commandData, execute: commandsExecute[index] });
  });
} else if (process.env.NODE_ENV === "local") {
  commandsDataLocal.forEach((commandData, index) => {
    client.commands.set(commandData.name, { data: commandData, execute: commandsExecuteLocal[index] });
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// call function only once after client is ready
client.once(Events.ClientReady, async () => {

  // setup cronjobs
  const freeEpicGamesDate = new schedule.RecurrenceRule();

  freeEpicGamesDate.dayOfWeek = 4;
  freeEpicGamesDate.second = 0;
  freeEpicGamesDate.minute = 0;
  freeEpicGamesDate.hour = 9;
  freeEpicGamesDate.tz = "America/Los_Angeles";

  const dailyRankingUpdate = new schedule.RecurrenceRule();

  dailyRankingUpdate.second = 0;
  dailyRankingUpdate.minute = 0;
  dailyRankingUpdate.hour = 6;
  dailyRankingUpdate.tz = "America/Los_Angeles";

  // schedule update message for free epic games
  schedule.scheduleJob(freeEpicGamesDate, async () => {
    try {
      const generalChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === "general");

      await getFreeEPICGamesFormatted().then(message => {
        generalChannel.send({ embeds: [new EmbedBuilder().setDescription(message).setTitle("EPIC Free Games")] });
      });
    } catch (error) {
      console.error(error);
    }
  });

  // schedule update message for daily ranking
  schedule.scheduleJob(dailyRankingUpdate, async () => {
    try {
      const generalChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === "general");

      await dailyRanking().then(message => {
        if (message) {
          generalChannel.send(message);
        }
      });
    } catch (error) {
      console.log("Error in daily ranking update");
      console.error(error);
    }
  });

  // schedule channel activity summary for the past month to run on first of every month
  schedule.scheduleJob("1 8 1 * *", async () => {
    try {
      const theFeedChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === "the-feed");
      const dateForHistory = new Date();

      dateForHistory.setMonth(dateForHistory.getMonth() - 1);
      const oneMonthAgoSnowflake = (dateForHistory.getTime() - 1420070400000) * 4194304;
      const messageHistory = await fetchMessageHistory(client, oneMonthAgoSnowflake);

      if (messageHistory.length > 0) {
        const channelMessageSummary = processMessageHistory(messageHistory);

        theFeedChannel.send(channelMessageSummary);
      }
    } catch (error) {
      console.log("Error sending monthly server message summary");
      console.error(error);
    }
  });

  // initialize the local ranking database
  updateLocalRankingDb();
});


client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
  }
});

client.on(Events.MessageCreate, async message => {
  const specialEmoji = specialEmojis(message.content);

  if (specialEmoji) {
    await message.react(specialEmoji);
  }
});

if (process.env.NODE_ENV === "production") {
  client.login(process.env.DISCORD_TOKEN);
} else if (process.env.NODE_ENV === "local") {
  dotenv.config();
  client.login(process.env.DISCORD_TOKEN);
} else if (process.env.NODE_ENV === "development") {
  client.login(process.env.DISCORD_DEV_TOKEN);
}

/**
 * Returns the database
 * @returns {Low<JSONFile>} the database
 */
function getDb() {
  return db;
}

/**
 * get the command data and execute functions
 * @param {boolean} isLocal is the environment local
 * @returns {Array} commandData the command data
 */
function getCommandData(isLocal) {
  const commandArray = [];

  if (isLocal) {
    commandsDataLocal.forEach((commandData, index) => {
      commandArray.push({ data: commandData, execute: commandsExecuteLocal[index] });
    });
  } else {
    commandsData.forEach((commandData, index) => {
      commandArray.push({ data: commandData, execute: commandsExecute[index] });
    });
  }
  return commandArray;

}

export {
  getDb,
  getCommandData
};
