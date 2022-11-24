const fs = require('node:fs');
const path = require('node:path');
const cron = require('node-cron');
const { Client, Events, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { getFreeEPICGamesFormatted } = require('./bot-scripts/epic-free-games.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
//   let generalChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === "general");
//   generalChannel.send('test');
  //sendGames().then((message) => {generalChannel.send(message);});

  // send free games to general discord channel every minute
//   cron.schedule('* * * * *', () => {
// 		sendGames(client);
// 	}, {
// 	scheduled: true,
// 	timezone: "America/Los_Angeles"
// 	});
//   cron.schedule('0 8 * * 1', () => {
// 	sendGames(client);
//   	}, {
// 	scheduled: true,
// 	timezone: "America/Los_Angeles"
// 	});
});

// call function only once after client is ready
client.once(Events.ClientReady, async () => {
	try {
		let generalChannel = client.channels.cache.find(channel => channel.name.toLowerCase() === "general");
		await getFreeEPICGamesFormatted().then((message) => {generalChannel.send({ embed: new EmbedBuilder().setDescription(message)});});
	} catch (error) {
		console.error(error);
	}
});



client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
  	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

if (process.env.NODE_ENV === 'production') {
	client.login(process.env.DISCORD_TOKEN);
} else {
	client.login(process.env.DISCORD_DEV_TOKEN);
}