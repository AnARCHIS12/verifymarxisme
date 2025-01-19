class CodeStorage {
    constructor() {
        this.codes = new Map();
        // Nettoyer les codes expirés toutes les 15 minutes
        setInterval(() => this.cleanExpiredCodes(), 15 * 60 * 1000);
    }

    generateCode(userId, length = 6) {
        // Génération d'un code unique
        let code;
        do {
            code = Math.random().toString(36).substring(2, 2 + length).toUpperCase();
        } while (this.codes.has(code));

        const expiration = Date.now() + 2 * 60 * 60 * 1000; // 2 heures d'expiration
        
        this.codes.set(code, {
            userId,
            expiration,
            usedInGuilds: new Set() // Pour suivre les serveurs où le code a été utilisé
        });
        
        return code;
    }

    verifyCode(code, userId, guildId) {
        const codeData = this.codes.get(code);
        
        if (!codeData) {
            return { valid: false, message: "Code invalide ou expiré." };
        }

        if (codeData.expiration < Date.now()) {
            this.codes.delete(code);
            return { valid: false, message: "Code expiré." };
        }

        // Vérifier si le code a déjà été utilisé dans ce serveur
        if (codeData.usedInGuilds.has(guildId)) {
            return { valid: false, message: "Ce code a déjà été utilisé sur ce serveur." };
        }

        // Permettre l'utilisation de son propre code mais avec un avertissement
        const isSelfCode = codeData.userId === userId;

        // Marquer le code comme utilisé dans ce serveur
        codeData.usedInGuilds.add(guildId);
        this.codes.set(code, codeData);

        return { 
            valid: true, 
            message: isSelfCode ? "Code valide, mais c'est votre propre code!" : "Code valide!", 
            generatorId: codeData.userId,
            isSelfCode
        };
    }

    cleanExpiredCodes() {
        const now = Date.now();
        for (const [code, data] of this.codes.entries()) {
            if (data.expiration < now) {
                this.codes.delete(code);
            }
        }
    }
}

module.exports = new CodeStorage();
