const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const client = require(`catboys`);
const catboy = new client();

async function getImg() {
	let img = await catboy.image();
    console.log(img);
	return img;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('catboy')
		.setDescription('Returns a random catboy image.'),
	async execute(interaction) {
		const imag = (await getImg());
		let embed = new MessageEmbed()
			.setTitle("Catboy")
			.setImage(imag.url)

		interaction.reply({embeds: [embed], ephemeral: true})
	},
};
