const { Client, GatewayIntentBits, Collection, ActivityType, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration des intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Collection pour stocker les commandes
client.commands = new Collection();

// Importer les commandes
const { loadCommands } = require('./commands/handler');

// Fonction pour mettre à jour le statut du bot
function updateBotStatus() {
    const activityType = process.env.BOT_ACTIVITY_TYPE || 'COMPETING';
    const status = process.env.BOT_STATUS || '☭ Au service du Parti';
    
    client.user.setActivity(status, { 
        type: ActivityType[activityType] 
    });
}

// Fonction pour logger les événements si DEBUG est activé
function debugLog(message) {
    if (process.env.DEBUG === 'true') {
        console.log(`[DEBUG] ${message}`);
    }
}

// Fonction pour déployer les commandes
async function deployCommands() {
    try {
        const commands = [];
        const commandsPath = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => 
            file.endsWith('.js') && file !== 'handler.js'
        );

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
        console.log('☭ Déploiement des commandes du Parti...');
        
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('⭐ Les commandes ont été déployées avec succès!');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors du déploiement des commandes:', error);
        return false;
    }
}

// Événement ready
client.once('ready', async () => {
    console.log(`☭ Bot connecté en tant que ${client.user.tag}!`);
    
    // Charger et déployer les commandes
    try {
        await loadCommands(client);
        await deployCommands();
        console.log('✅ Le Parti est prêt à servir!');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
    }

    // Mettre à jour le statut du bot
    updateBotStatus();

    // Logger dans le canal spécifié si configuré
    const logChannelId = process.env.LOG_CHANNEL;
    if (logChannelId) {
        try {
            const logChannel = await client.channels.fetch(logChannelId);
            await logChannel.send("☭ Le Parti est en ligne et prêt à servir!");
        } catch (error) {
            console.error("Erreur lors de l'envoi du message de log:", error);
        }
    }
});

// Gestion des interactions (commandes slash)
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    debugLog(`Commande reçue: ${interaction.commandName}`);

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        // Si la commande n'existe pas, on redéploie automatiquement
        console.log('⚠️ Commande non trouvée, redéploiement automatique...');
        await deployCommands();
        return interaction.reply({ 
            content: "⚙️ Les commandes du Parti sont en cours de mise à jour. Veuillez réessayer dans quelques secondes.", 
            ephemeral: true 
        });
    }

    try {
        await command.execute(interaction);
        debugLog(`Commande ${interaction.commandName} exécutée avec succès`);
    } catch (error) {
        console.error(error);
        debugLog(`Erreur lors de l'exécution de la commande ${interaction.commandName}`);
        
        const errorMessage = process.env.DEBUG === 'true' 
            ? `Une erreur est survenue: ${error.message}`
            : "Une erreur est survenue lors de l'exécution de la commande!";
            
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ 
                content: errorMessage, 
                ephemeral: true 
            });
        } else {
            await interaction.reply({ 
                content: errorMessage, 
                ephemeral: true 
            });
        }
    }
});

// Gestion des erreurs non gérées
process.on('unhandledRejection', error => {
    console.error('Erreur non gérée:', error);
    debugLog(`Erreur non gérée: ${error.message}`);
});

// Connexion du bot
client.login(process.env.TOKEN);
