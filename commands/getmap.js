const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch"); // npm install node-fetch@2

module.exports = {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("Get info about a map.")
    .addStringOption((option) =>
      option.setName("input").setDescription("Map key").setRequired(true)
    ),
  async execute(interaction) {
    const code = interaction.options.getString("input");
    await fetch(`https://api.beatsaver.com/maps/id/${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error)
          return interaction.reply({
            content: "Map not found.",
            ephemeral: true,
          });
        let BsrEmbed = new MessageEmbed()
          .setTitle(data.name)
          .setAuthor({
            name: data.uploader.name,
            iconURL: data.uploader.avatar,
            url: `https://beatsaver.com/profile/${data.uploader.id}`,
          })
          .setThumbnail(data.versions[data.versions.length - 1].coverURL)
          .setURL(`https://beatsaver.com/maps/${code}`)
          .setDescription(data.description.replace(/\n\n/g, "\n"));
        let totalReviews = data.stats.upvotes + data.stats.downvotes;
        let reviewScore = data.stats.upvotes / totalReviews;
        let rating = Number(
          (
            (reviewScore -
              (reviewScore - 0.5) *
                Math.pow(2, -Math.log10(totalReviews + 1))) *
            100
          ).toFixed(1)
        );
        BsrEmbed.addFields({
          name: "Rating:",
          value: `${data.stats.upvotes} / ${data.stats.downvotes} (${rating}%)`,
          inline: true,
        });
        if (data.curator) BsrEmbed.setColor("#00BC8C");
        if (data.ranked == true) BsrEmbed.setColor("#F39C12");
        let row = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("Link")
            .setURL(`https://skystudioapps.com/bs-viewer/?id=${code}`)
            .setLabel("Preview"),
          new MessageButton()
            .setStyle("Link")
            .setURL(`https://stormpacer.me/beatsaver?id=${code}`)
            .setLabel("One-Click"),
          new MessageButton()
            .setStyle("Link")
            .setURL(data.versions[data.versions.length - 1].downloadURL)
            .setLabel("Zip")
        );
        return interaction.reply({ embeds: [BsrEmbed], components: [row] });
      });
  },
};
