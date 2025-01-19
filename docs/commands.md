---
layout: default
title: Commandes
nav_order: 3
---

# Commandes
{: .no_toc }

## Table des matières
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Génération de codes

### /gencode
{: .d-inline-block }

TOUS
{: .label .label-green }

Génère un code unique pour le partage.

#### Utilisation
```
/gencode
```

#### Détails
- Génère un code de 6 caractères
- Le code expire après 2 heures
- Réponse visible uniquement par vous
- Utilisable une fois par serveur

#### Exemple de réponse
```
✊ Code Révolutionnaire Généré
Voici votre code, camarade:
ABC123

⚡ Validité: Ce code servira la cause pendant 2 heures
✊ Usage: Pour le partage entre camarades
💪 Note: Un pour tous, tous pour un!
```

---

## Vérification de codes

### /verifycode
{: .d-inline-block }

MODS & ADMINS
{: .label .label-purple }

Vérifie un code généré par un autre membre.

#### Utilisation
```
/verifycode [code]
```

#### Arguments
- `code` : Le code à vérifier (requis)

#### Permissions requises
- Modérateur ou Administrateur

#### Réponses possibles

##### Code valide
```
✊ Code approuvé!
💪 Camarade Source: user#1234
⚡ Statut: Validé par le collectif
✊ Message: La solidarité fait notre force!
```

##### Code invalide
```
❌ Code rejeté!
📜 Rapport: Code invalide ou expiré
⚠️ Action: Vérifiez et réessayez, camarade!
⚡ Note: Les codes expirent après 2 heures
```

##### Permissions manquantes
```
❌ Accès Refusé
⚡ Permissions Requises: Modérateur ou Administrateur
✊ Solution: Contactez un modérateur
```

## Notes importantes

- Les codes sont à usage unique par serveur
- Un code peut être utilisé sur plusieurs serveurs
- Les codes expirent automatiquement après 2 heures
- Les réponses de génération sont toujours privées
- Les vérifications sont visibles par tous
