const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const client = require('nekos.life');
const neko = new client();

async function getImg() {
  console.log(await neko.neko());
  return await neko.neko();
}

getImg();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('neko')
		.setDescription('Returns a random neko image.'),
	async execute(interaction) {
		const imag = (await getImg());
		let embed = new MessageEmbed()
			.setTitle("Catgirl")
			.setImage(imag.url)

		interaction.reply({embeds: [embed], ephemeral: true})
	},
};
