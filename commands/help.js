import { SlashCommandBuilder } from "@discordjs/builders";
import { getCommandData } from "../index.js";

const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("List all available commands");

/**
 * Execute the command to list all available commands
 * @param {interaction} interaction the interaction object
 * @returns {Promise<void>} void
 */
async function execute(interaction) {
  let str = "";

  for (const commandData of getCommandData()) {
    str += `**/${commandData.data.name}** - ${commandData.data.description} \n`;
  }

  return interaction.reply({
    content: str,
    ephemeral: true
  });
}

export { data as helpCommandData, execute as helpCommandExecute };
