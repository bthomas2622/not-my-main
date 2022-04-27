const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const apexLegendList = ['Ash', 'Bangalore', 'Bloodhound', "Caustic", "Crypto", "Fuse", "Gibraltar", "Horizon", "Lifeline", "Loba", "Mad Maggie", "Mirage", "Octane", "Pathfinder", "Rampart", "Revenant", "Seer", "Valkyrie", "Wattson", "Wraith"]

  if (interaction.commandName === 'nmm') {
    await interaction.reply(apexLegendList[Math.floor(Math.random() * apexLegendList.length)]);
  }
});

client.login("process.env.DISCORD_TOKEN");