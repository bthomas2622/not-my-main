import { readdirSync } from "fs";
import { readFile } from "fs/promises";
import { SlashCommandBuilder } from "@discordjs/builders";
import { fileURLToPath } from "url";
import path from "path";

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("List all available commands");

/**
 * Execute the command to list all available commands
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
export async function execute(interaction) {
  let str = "";
  const commandFiles = readdirSync(fileURLToPath(path.dirname(import.meta.url))).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = await readFile(`./${file}`);

    if (command.data.name) {
      str += `**/${command.data.name}** - ${command.data.description} \n`;
    }
  }

  return interaction.reply({
    content: str,
    ephemeral: true
  });
}
