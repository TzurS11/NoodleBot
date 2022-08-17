const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

async function getImg() {
  return await neko.kemonomimi();
}

getImg();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kemonomimi')
		.setDescription('Returns a random kemonomimi image.'),
	async execute(interaction) {
		const imag = (await getImg());
		let embed = new MessageEmbed()
			.setTitle("Catgirl")
			.setImage(imag.url)

		interaction.reply({embeds: [embed], ephemeral: true})
	},
};
