const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('☭ Vérifie l\'état du Parti Camarade!'),
    
    async execute(interaction) {
        await interaction.deferReply();
        
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('☭ État du Parti')
            .addFields(
                { name: '⚒️ Force du Prolétariat', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
                { name: '⭐ Puissance Soviétique', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true }
            )
            .setFooter({ text: 'Pour la gloire du Parti! ☭' })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },
};
