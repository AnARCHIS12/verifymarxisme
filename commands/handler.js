const fs = require('fs');
const path = require('path');

async function loadCommands(client) {
    const commandsPath = path.join(__dirname);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => 
        file.endsWith('.js') && file !== 'handler.js'
    );

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[ATTENTION] La commande ${filePath} manque de propriétés requises 'data' ou 'execute'.`);
        }
    }
}

module.exports = { loadCommands };
