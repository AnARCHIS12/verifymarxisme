const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const codeStorage = require('../utils/codeStorage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifycode')
        .setDescription('✊ Vérifie un code reçu d\'un camarade!')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('⚡ Entre le code reçu')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers | PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    async execute(interaction) {
        // Vérifier les permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers) && 
            !interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            const embed = new EmbedBuilder()
                .setColor('#8B0000')
                .setTitle('❌ Accès Refusé')
                .setDescription('Vous n\'avez pas les permissions nécessaires!')
                .addFields(
                    { 
                        name: '⚡ Permissions Requises', 
                        value: '`Modérateur` ou `Administrateur`',
                        inline: true 
                    },
                    { 
                        name: '✊ Solution', 
                        value: 'Contactez un modérateur pour vérifier votre code',
                        inline: true 
                    }
                )
                .setFooter({ text: 'Seuls les responsables peuvent vérifier les codes! ✊' })
                .setTimestamp();

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        await interaction.deferReply();

        const code = interaction.options.getString('code').toUpperCase();
        const result = codeStorage.verifyCode(code, interaction.user.id, interaction.guildId);

        const embed = new EmbedBuilder()
            .setTitle('✊ Bureau de Vérification')
            .setTimestamp();

        if (result.valid) {
            const generator = await interaction.client.users.fetch(result.generatorId);
            embed.setColor(result.isSelfCode ? '#FFA500' : '#FF0000')
                .setDescription(result.isSelfCode ? '⚠️ Code auto-vérifié!' : '✊ Code approuvé!')
                .addFields(
                    { name: '💪 Camarade Source', value: `\`${generator.tag}\``, inline: true },
                    { name: '⚡ Statut', value: result.isSelfCode ? 
                        '`Test personnel`' : 
                        '`Validé par le collectif`', 
                        inline: true 
                    },
                    { 
                        name: '✊ Message', 
                        value: result.isSelfCode ? 
                            'Test autorisé, mais partagez avec vos camarades!' :
                            'La solidarité fait notre force!'
                    }
                )
                .setFooter({ text: result.isSelfCode ? 
                    'Le partage renforce notre cause! ✊' : 
                    'Pour la victoire du peuple! ✊' 
                });
        } else {
            embed.setColor('#8B0000')
                .setDescription('❌ Code rejeté!')
                .addFields(
                    { name: '📜 Rapport', value: `\`${result.message}\``, inline: true },
                    { name: '⚠️ Action', value: 'Vérifiez et réessayez, camarade!', inline: true },
                    { name: '⚡ Note', value: 'Les codes expirent après 2 heures pour la sécurité collective.' }
                )
                .setFooter({ text: 'La vigilance est notre force! ✊' });
        }

        await interaction.editReply({ embeds: [embed] });
    },
};
