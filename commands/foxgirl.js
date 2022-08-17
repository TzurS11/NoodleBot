const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

async function getImg() {
  return await neko.foxGirl();
}

getImg();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('foxgirl')
		.setDescription('Returns a random foxgirl image.'),
	async execute(interaction) {
		const imag = (await getImg());
		let embed = new MessageEmbed()
			.setTitle("Foxgirl")
			.setImage(imag.url)

		interaction.reply({embeds: [embed], ephemeral: true})
	},
};
