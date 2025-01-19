const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const codeStorage = require('../utils/codeStorage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gencode')
        .setDescription('✊ Génère un code pour nos camarades!')
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply({ flags: ['Ephemeral'] });

        // Génération automatique d'un code de 6 caractères
        const code = codeStorage.generateCode(interaction.user.id, 6);

        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('✊ Code Révolutionnaire Généré')
            .setDescription(`Voici votre code, camarade:\n\`${code}\``)
            .addFields(
                { name: '⚡ Validité', value: 'Ce code servira la cause pendant 2 heures', inline: true },
                { name: '✊ Usage', value: 'Pour le partage entre camarades', inline: true },
                { name: '💪 Note', value: 'Un pour tous, tous pour un!' }
            )
            .setFooter({ text: 'L\'union fait la force! ✊' })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed], flags: ['Ephemeral'] });
    },
};
