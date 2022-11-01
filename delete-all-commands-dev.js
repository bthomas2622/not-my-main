const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_DEV_TOKEN);

// for global commands
rest.put(Routes.applicationCommands(process.env.DISCORD_DEV_CLIENT_ID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);