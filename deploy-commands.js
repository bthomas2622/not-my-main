const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
	new SlashCommandBuilder().setName('commands').setDescription("Awoken Bot command list"),
	new SlashCommandBuilder().setName('nmm').setDescription('Generate a random Apex Legends champion, if you lose it\'s ok! It\'s not your main!'),
	new SlashCommandBuilder().setName('coinflip').setDescription("Flip a coin"),
	new SlashCommandBuilder().setName('d6').setDescription("Roll a d6"),
	new SlashCommandBuilder().setName('d20').setDescription("Roll a d20"),
	new SlashCommandBuilder().setName('dad').setDescription("..."),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken("token");

rest.put(Routes.applicationGuildCommands("client_id", "guild_id"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
