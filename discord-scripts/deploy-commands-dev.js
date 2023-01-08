import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const commands = [];

// Grab all the command files from the commands directory you created earlier
const commandFiles = readdirSync(`${fileURLToPath(path.dirname(import.meta.url))}/../commands`).filter(file => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const command = await readFile(`${fileURLToPath(path.dirname(import.meta.url))}/../commands/${file}`, "utf8");

  commands.push(JSON.parse(command));
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_DEV_TOKEN);

// and deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(process.env.DISCORD_DEV_CLIENT_ID),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {

    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
