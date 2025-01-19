---
layout: default
title: Installation
nav_order: 2
---

# Installation
{: .no_toc }

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Prérequis

Avant d'installer VerifyMarxisme, assurez-vous d'avoir :

- Node.js v16.9.0 ou supérieur
- npm (inclus avec Node.js)
- Un compte Discord
- Les permissions administrateur sur votre serveur

## Création du bot Discord

1. Allez sur le [Portail Développeur Discord](https://discord.com/developers/applications)
2. Créez une nouvelle application
3. Dans la section "Bot", créez un bot
4. Copiez le token du bot
5. Activez les "Privileged Gateway Intents"

## Installation du bot

```bash
# Cloner le repository
git clone https://github.com/USERNAME/verifymarxisme
cd verifymarxisme

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
```

## Configuration

Éditez le fichier `.env` avec vos informations :

```env
# Configuration essentielle
TOKEN=votre_token_discord    # Token du bot
CLIENT_ID=votre_client_id   # ID de l'application

# Configuration optionnelle
DEBUG=false                 # Mode debug
LOG_CHANNEL=                # Canal des logs
```

## Démarrage

```bash
# Démarrer le bot
npm run setup

# Mode développement
npm run dev
```

## Vérification

Pour vérifier que tout fonctionne :

1. Le bot doit apparaître en ligne
2. Tapez `/gencode` dans Discord
3. Vous devriez recevoir un code unique

## Dépannage

### Le bot ne se connecte pas

- Vérifiez le token dans `.env`
- Vérifiez votre connexion internet
- Regardez les logs pour plus de détails

### Les commandes ne fonctionnent pas

- Redéployez les commandes : `npm run deploy`
- Vérifiez les permissions du bot
- Assurez-vous que le bot a accès au canal

## Support

Si vous rencontrez des problèmes :

1. Consultez les [Issues GitHub](https://github.com/USERNAME/verifymarxisme/issues)
2. Rejoignez notre [serveur Discord](https://discord.gg/INVITE)
3. Ouvrez une nouvelle issue si nécessaire
