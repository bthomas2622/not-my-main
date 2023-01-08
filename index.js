// eslint-disable-next-line node/no-missing-import
import { Low } from "lowdb";
// eslint-disable-next-line node/no-missing-import
import { JSONFile } from "lowdb/node";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";
import schedule from "node-schedule";
import { Client, Events, Collection, GatewayIntentBits, EmbedBuilder } from "discord.js";
import getFreeEPICGamesFormatted from "./bot-scripts/epic-free-games.js";
import { updateLocalRankingDb } from "./bot-utils/local-ranking-db.js";
import { fileURLToPath } from "url";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(fileURLToPath(path.dirname(import.meta.url)), "commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const db = new Low(new JSONFile("db.json"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await readFile(filePath);


  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// call function only once after client is ready
client.once(Events.ClientReady, async () => {
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
} else {
  client.login(process.env.DISCORD_DEV_TOKEN);
}

/**
 * Returns the database
 * @returns {Low<JSONFile>} the database
 */
function getDb() {
  return db;
}

export default {
  getDb
};
