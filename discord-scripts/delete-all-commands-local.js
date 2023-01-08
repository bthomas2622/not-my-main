import { REST, Routes } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// for global commands
rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
