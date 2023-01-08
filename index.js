import * as dotenv from "dotenv";
// eslint-disable-next-line node/no-missing-import
import { Low } from "lowdb";
// eslint-disable-next-line node/no-missing-import
import { JSONFile } from "lowdb/node";
import schedule from "node-schedule";
import { Client, Events, Collection, GatewayIntentBits, EmbedBuilder } from "discord.js";
import getFreeEPICGamesFormatted from "./bot-scripts/epic-free-games.js";
import { updateLocalRankingDb } from "./bot-utils/local-ranking-db.js";

// Command Data
import { apexCommandData, apexCommandExecute } from "./commands/apex-not-my-main.js";
import { coinFlipCommandData, coinFlipCommandExecute } from "./commands/coin-flip.js";
import { dNumCommandData, dNumCommandExecute } from "./commands/d-num.js";
import { d6CommandData, d6CommandExecute } from "./commands/d6.js";
import { d20CommandData, d20CommandExecute } from "./commands/d20.js";
import { getRankingsCommandData, getRankingsCommandExecute } from "./commands/get-rankings.js";
import { helpCommandData, helpCommandExecute } from "./commands/help.js";
import { pickOneCommandData, pickOneCommandExecute } from "./commands/pick-one.js";
import { testLocalRankingsDbCommandData, testLocalRankingsDbCommandExecute } from "./commands/test-local-rankings-db.js";


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const db = new Low(new JSONFile("db.json"));

const commandsData = [apexCommandData, coinFlipCommandData, dNumCommandData, d6CommandData, d20CommandData,
  getRankingsCommandData, helpCommandData, pickOneCommandData, testLocalRankingsDbCommandData];
const commandsExecute = [apexCommandExecute, coinFlipCommandExecute, dNumCommandExecute, d6CommandExecute,
  d20CommandExecute, getRankingsCommandExecute, helpCommandExecute, pickOneCommandExecute, testLocalRankingsDbCommandExecute];

client.commands = new Collection();

// loop through commandsData and commandsExecute and add to client.commands
commandsData.forEach((commandData, index) => {
  client.commands.set(commandData.name, { data: commandData, execute: commandsExecute[index] });
});

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
 * @returns {Array} commandData the command data
 */
function getCommandData() {
  const commandArray = [];

  commandsData.forEach((commandData, index) => {
    commandArray.push({ data: commandData, execute: commandsExecute[index] });
  });
  return commandArray;
}

export {
  getDb,
  getCommandData
};
