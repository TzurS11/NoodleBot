const fs = require('fs');
const { Client, Collection, Intents, Channel, TextChannel } = require('discord.js');
const { token } = require('./config.json');
const { channel } = require('diagnostics_channel');
const BeatSaverAPI = require('beatsaver-api');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

const general = '963794385890332683';

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on("guildMemberAdd", function(member){
    console.log(`a user joins a guild: ${member.tag}`);
	client.channels.cache.get(general).send(`Hello, <@${member.id}>`);
});

/* client.on('ready', client => {
	client.channels.cache.get(general).send({
		content: 'This is an embed',
		embeds: [
		  {
			thumbnail: {
			  url: 'https://eu.cdn.beaCtsaver.com/2e48b2a2a03d2967dcb1d95a46a4d3a03c95f41b.jpg'
			}
		  }
		]
	  });
}); */



client.login(token);
