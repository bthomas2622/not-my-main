const legends = require('./apex_legends.json');
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
  
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const apexLegendList = Object.keys(legends);
  // const apexLegendList = ['Ash', 'Bangalore', 'Bloodhound', "Caustic", "Crypto", "Fuse", "Gibraltar", "Horizon", "Lifeline", "Loba", "Mad Maggie", "Mirage", "Octane", "Pathfinder", "Rampart", "Revenant", "Seer", "Valkyrie", "Wattson", "Wraith"]

  if (interaction.commandName === 'commands') {
    await interaction.reply("/nmm" + "\n" + "/coinflip" + "\n" + "/d6" + "\n" + "/d20" + "\n" + "/dad");
  }
  else if (interaction.commandName === 'nmm') {
    let chosenLegend = apexLegendList[Math.floor(Math.random() * apexLegendList.length)];
    let chosenLegendVoiceLines = legends[chosenLegend];
    await interaction.reply("**" + chosenLegend + "**" + " - " + '"' + chosenLegendVoiceLines[Math.floor(Math.random() * chosenLegendVoiceLines.length)] + '"');
  }
  else if (interaction.commandName === 'coinflip') {
    let num = Math.random();
    let coin;
    if (num < 0.5) { coin = "HEADS";} else { coin = "TAILS";}
    await interaction.reply("test")
  }
  else if (interaction.commandName === 'd6') {
    await interaction.reply(String(Math.floor(Math.random() * 6) + 1))
  }
  else if (interaction.commandName === 'd20') {
    await interaction.reply(String(Math.floor(Math.random() * 20) + 1))
  }
  else if (interaction.commandName === 'dad') {
    await interaction.reply("son?")
  }
  

});

client.login(process.env.DISCORD_TOKEN);