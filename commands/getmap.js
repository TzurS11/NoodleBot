const { SlashCommandBuilder } = require('@discordjs/builders');
const BeatSaverAPI = require('beatsaver-api');
const { channel } = require('diagnostics_channel');
const { MessageEmbed } = require('discord.js');
const { getAverageColor } = require('fast-average-color-node');

const api = new BeatSaverAPI({
	AppName: 'Heck Bot',
	Version: '2.0.4'
});

function mapCol(link) {
	getAverageColor(link).then(color => {
		console.log("map cover color: ");
		return color;
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Get info about a map.')
		.addStringOption(option => option.setName('input').setDescription('Map key')),
	async execute(interaction) {
		const value = interaction.options.getString('input');
		const map = await api.getMapByID(value)
			.then(map => {
				return map;
			})
			.catch(err => {});

		color = (await getAverageColor(map.versions[0].coverURL).then(color => {return color})).hex;
		console.log(map);
		console.log(map.versions[0].diffs)
		let mapEmbed = new MessageEmbed()
			.setColor(color)
			.setTitle(map.metadata.songName)
			.setAuthor({
				name: map.uploader.name,
				iconURL: map.uploader.avatar
			})
			.addFields(
				{ name: 'Links', value: `[Beatsaver](https://beatsaver.com/maps/${value}/)\n[BeastSaber](https://bsaber.com/songs/${value}/)\n[Viewer](https://skystudioapps.com/bs-viewer/?id=${value})\n[Download](${map.versions[map.versions.length - 1].downloadURL})` }
			)
			.setDescription(map.description)
			.setThumbnail('https://i.imgur.com/1dBCcdI.png')
			.setImage(map.versions[0].coverURL)
		if (value) interaction.reply({ embeds: [mapEmbed] });
	},
};