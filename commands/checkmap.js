const { SlashCommandBuilder } = require('@discordjs/builders');
const BeatSaverAPI = require('beatsaver-api');
const fetch = require('node-fetch')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkmap')
		.setDescription('Checks the desired map for Noodle.')
		.addStringOption(option => option.setName('id').setDescription('The map id.')),
	async execute(interaction) {

	},
};
