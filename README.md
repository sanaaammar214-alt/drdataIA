# 🩺 SEHHA DATA · صحة داتا
### Dashboard épidémiologique interactif — Maroc

> **Ces données ne constituent pas un avis médical. Pour toute question personnelle, consultez un professionnel de santé.**
> Ministère de la Santé : [www.sante.gov.ma](https://www.sante.gov.ma) · Numéro vert : **080 100 47 47**

---

## 📌 Le problème résolu

Les bulletins épidémiologiques du Ministère de la Santé marocain sont publiés en PDF, peu accessibles et non interactifs. Aucun outil ne permet à un non-spécialiste de comprendre les tendances de maladies dans sa région. Les données existent (DELM, OMS Maroc, HCP) mais nécessitent des compétences data pour être exploitées.

**SEHHA DATA** résout ce problème en centralisant, analysant et rendant accessibles ces données via un pipeline IA automatisé et un assistant conversationnel : **Dr. Sehha** 🤖.

---

## 💡 La solution

Un pipeline data complet qui :
1. **Collecte** automatiquement les données épidémiologiques publiques dans Google Sheets
2. **Calcule** les indicateurs clés et détecte les dépassements des seuils OMS
3. **Génère** des rapports citoyens en langage naturel via un LLM (GPT-4o-mini)
4. **Expose** tout cela via un chatbot Botpress (Dr. Sehha) et une application Next.js

---

## 🏗️ Architecture de la solution

```
┌─────────────────────────────────────────────────────────────────┐
│                        SEHHA DATA Pipeline                       │
│                                                                   │
│  Sources officielles                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ DELM/Min.    │  │ OMS Bureau   │  │  HCP / ENPS  │           │
│  │ Santé Maroc  │  │    Maroc     │  │   Enquêtes   │           │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘           │
│         └─────────────────┼─────────────────┘                    │
│                           ▼                                       │
│              ┌────────────────────────┐                          │
│              │     Google Sheets      │                          │
│              │  • Données_brutes      │                          │
│              │  • Indicateurs         │                          │
│              │  • Alertes             │                          │
│              │  • Vue_Régionale       │                          │
│              │  • Log_mises_à_jour    │                          │
│              └────────────┬───────────┘                          │
│                           │                                       │
│              ┌────────────▼───────────┐                          │
│              │      n8n Workflows      │                          │
│              │  WF1 · WF2 · WF3       │                          │
│              └────────────┬───────────┘                          │
│                           │                                       │
│         ┌─────────────────┼─────────────────┐                   │
│         ▼                 ▼                 ▼                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Email      │  │ GPT-4o-mini │  │  Botpress   │             │
│  │  Alertes    │  │     LLM     │  │  Dr. Sehha  │             │
│  └─────────────┘  └─────────────┘  └──────┬──────┘             │
│                                            │                      │
│                                    ┌───────▼──────┐              │
│                                    │  Next.js App │              │
│                                    │  Dashboard   │              │
│                                    │  Power BI    │              │
│                                    └──────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

### Composants principaux

| Composant | Rôle | Technologie |
|-----------|------|-------------|
| **WF1** | Vérification mensuelle site Ministère Santé | n8n · Cron · Gmail |
| **WF2** | Calcul indicateurs + alertes OMS | n8n · Webhook · JavaScript |
| **WF3** | Génération rapport citoyen LLM | n8n · OpenAI · Botpress |
| **Google Sheets** | Base de données centrale | Sheets API |
| **Dr. Sehha** | Chatbot conversationnel IA | Botpress |
| **Dashboard** | Visualisation données | Next.js · Power BI |

---

## 📊 Structure Google Sheets

| Onglet | Contenu |
|--------|---------|
| `Données_brutes` | source · région · maladie · année · valeur |
| `Indicateurs` | taux incidence · mortalité · couverture vaccinale |
| `Alertes` | seuils épidémiques OMS dépassés · niveau criticité |
| `Vue_Régionale` | données par région administrative (12 régions) |
| `Log_mises_à_jour` | historique des opérations automatisées |

---

## ⚙️ Workflows n8n

### WF1 — Mise à jour mensuelle
- **Déclencheur** : Cron le 1er de chaque mois à 08h00
- **Actions** :
  - Vérifie la disponibilité du site du Ministère de la Santé
  - Envoie un email de rappel si le site est accessible
  - Envoie une alerte si le site est inaccessible
  - Logue l'opération dans Google Sheets

### WF2 — Calcul des indicateurs
- **Déclencheur** : Webhook POST `/sehha-calcul-indicateurs`
- **Actions** :
  - Lit les données brutes depuis Google Sheets
  - Calcule les évolutions 1 an et 5 ans
  - Compare aux seuils OMS (OK / DÉPASSÉ / CRITIQUE)
  - Envoie des alertes email si seuil dépassé
  - Logue les résultats

### WF3 — Rapport citoyen LLM
- **Déclencheur** : Webhook POST `/sehha-rapport-citoyen`
- **Actions** :
  - Reçoit la question du citoyen depuis Botpress
  - Charge les snapshots Indicateurs + Alertes + Vue Régionale
  - Envoie au LLM (GPT-4o-mini) avec Chain-of-Thought en 4 étapes
  - Retourne la réponse au format JSON vers Botpress ou email

---

## 🤖 Flows Botpress — Dr. Sehha

| Flow | Description |
|------|-------------|
| **Flow 1** | Vue nationale — top 5 maladies prioritaires, tendances |
| **Flow 2** | Vue régionale — l'utilisateur choisit une région |
| **Flow 3** | Question libre — réponse avec données + contexte |
| **Flow 4** | Alerte santé publique — dépassement seuil OMS détecté |

---

## 💬 Prompt principal — Chain-of-Thought

```
Tu es SEHHA DATA, assistant épidémiologique expert en santé publique au Maroc.

DONNÉES INDICATEURS : {{ snapshot_indicateurs }}
ALERTES OMS : {{ snapshot_alertes }}
VUE RÉGIONALE : {{ snapshot_regional }}
RÉGION : {{ region }} | PÉRIODE : 2019-2023

RAISONNE EN 4 ÉTAPES :
Étape 1 - Lecture : quelles données sont pertinentes ?
Étape 2 - Tendance : Hausse / Baisse / Stable ?
Étape 3 - Interprétation : facteurs explicatifs
Étape 4 - Limites : source, date, biais de déclaration

DISCLAIMER OBLIGATOIRE EN FIN :
"Ces données sont issues de sources officielles et ne constituent pas 
un avis médical. Pour toute question personnelle, consultez un 
professionnel de santé."
```

---

## 📈 Données — Indicateurs nationaux 2023

| Maladie | Indicateur | Valeur 2023 | Seuil OMS | Statut |
|---------|-----------|-------------|-----------|--------|
| Diabète | Prévalence (%) | 10.6% | 10% | ⚠️ DÉPASSÉ |
| Hypertension | Prévalence (%) | 29% | 25% | 🔴 CRITIQUE |
| Tuberculose | Incidence (/100k) | 96/100k | 20/100k | 🔴 CRITIQUE |
| Cancer | Survie à 5 ans (%) | 42% | 60% | ⚠️ DÉPASSÉ |
| Maladies cardiovasc. | Mortalité (/100k) | 118/100k | 100/100k | 🔴 CRITIQUE |

---

## 🗺️ Couverture régionale

| Région | Diabète (%) | Tuberculose (/100k) |
|--------|-------------|---------------------|
| Casablanca-Settat | 12.1% | 89/100k |
| Rabat-Salé-Kénitra | 10.8% | 76/100k |
| Marrakech-Safi | 9.4% | 112/100k |
| Fès-Meknès | 11.2% | 98/100k |
| Tanger-Tétouan-Al Hoceïma | 8.9% | 105/100k |
| Souss-Massa | 9.1% | 134/100k |

---

## 🚀 Guide d'utilisation

### Prérequis
- Compte n8n (cloud ou self-hosted)
- Compte Botpress
- Compte Google (pour Google Sheets)
- Clé API OpenAI
- Node.js 18+ (pour l'application Next.js)

### Installation

#### 1. Google Sheets
```
1. Créer un Google Sheets avec l'ID : 1qW4_4h6kcwDWxUmWMH3LNhv_gedQmngn
2. Créer les onglets : Données_brutes · Indicateurs · Alertes · 
   Vue_Régionale · Log_mises_à_jour
3. Renseigner les données selon la structure définie
```

#### 2. n8n — Import des workflows
```
1. Ouvrir n8n
2. Cliquer sur "Import workflow"
3. Importer les 3 fichiers JSON :
   - WF1_SEHHA_MAJ_MENSUELLE.json
   - WF2_SEHHA_CALCUL_INDICATEURS.json
   - WF3_SEHHA_RAPPORT_CITOYEN.json
4. Configurer les credentials :
   - Google Sheets API
   - Gmail / SMTP
   - OpenAI API Key
5. Activer les workflows
```

#### 3. Botpress — Import du bot
```
1. Ouvrir Botpress Studio
2. Cliquer sur l'icône Botpress (3 traits) → Import/Export → Import
3. Importer le fichier : SEHHA_DATA_Bot_Export.bpz
4. Configurer l'URL webhook n8n dans les variables d'environnement
5. Publier le bot
```

#### 4. Application Next.js
```bash
git clone [repo-url]
cd sehha-data
npm install
cp .env.example .env.local
# Renseigner les variables :
# NEXT_PUBLIC_N8N_WEBHOOK_WF2=https://[n8n-url]/webhook/sehha-calcul-indicateurs
# NEXT_PUBLIC_N8N_WEBHOOK_WF3=https://[n8n-url]/webhook/sehha-rapport-citoyen
# NEXT_PUBLIC_BOTPRESS_BOT_ID=[bot-id]
npm run dev
```

### Utilisation quotidienne

**Mise à jour des données :**
1. Le 1er de chaque mois, WF1 envoie un email de rappel
2. Consulter le bulletin épidémio du Ministère
3. Saisir les nouvelles données dans l'onglet `Données_brutes`
4. Déclencher WF2 manuellement via le bouton "Recalculer" du dashboard

**Interroger Dr. Sehha :**
- Via le chatbot Botpress intégré dans l'application
- Via l'API webhook WF3 avec une requête POST :
```json
{
  "question": "Comment évolue le diabète au Maroc ?",
  "region": "National",
  "type_rapport": "botpress",
  "user_id": "citoyen-123"
}
```

---

## ⚠️ Éthique & Biais

| Biais | Description | Mitigation |
|-------|-------------|------------|
| **Biais de déclaration** | Sous-déclaration dans les zones rurales | Mentionné dans chaque réponse LLM |
| **Biais de disponibilité** | Certaines régions publient moins de données | Disclaimer sur l'absence de données |
| **Biais de causalité** | Hausse du taux de détection ≠ hausse réelle | Étape 4 du Chain-of-Thought |

**Règle absolue :** Aucune donnée individuelle n'est collectée ou affichée — uniquement des données agrégées régionales publiques.

---

## 🧗 Difficultés rencontrées

- **Accès aux données** : Les bulletins du Ministère sont en PDF non structurés — saisie manuelle nécessaire dans Google Sheets
- **Fiabilité des données** : Certaines régions ont des données incomplètes sur la période 2019-2023
- **Limite du LLM** : GPT-4o-mini peut parfois halluciner des chiffres — le snapshot Sheets injecté dans le contexte corrige ce problème
- **Intégration Botpress ↔ n8n** : La gestion des webhooks bidirectionnels a nécessité plusieurs itérations de configuration
- **Biais linguistique** : Les réponses sont moins précises en darija — le bot est configuré en français uniquement pour garantir la qualité

---

## 📦 Livrables du projet

```
sehha-data/
├── WF1_SEHHA_MAJ_MENSUELLE.json       # Workflow n8n WF1
├── WF2_SEHHA_CALCUL_INDICATEURS.json  # Workflow n8n WF2
├── WF3_SEHHA_RAPPORT_CITOYEN.json     # Workflow n8n WF3
├── SEHHA_DATA_Bot_Export.bpz          # Export bot Botpress
├── README.md                           # Ce fichier
└── app/                               # Application Next.js
    ├── page.tsx                       # Landing page Dr. Sehha
    ├── dashboard/page.tsx             # Dashboard + Power BI
    ├── assistant/page.tsx             # Bot Dr. Sehha
    └── rapport/page.tsx               # Rapport citoyen LLM
```

---

## 👤 Auteur

**Sanaa Ammar**
sanaaammar214@gmail.com
FST Mohammedia · Université Hassan 2
Module Intelligence Artificielle · Licence 2025-2026
Encadrant : Prof. Youssef FAKIR

---

## 📚 Sources

- [Ministère de la Santé Maroc](https://www.sante.gov.ma) — DELM · Bulletins épidémiologiques
- [OMS Bureau Maroc](https://www.emro.who.int/mor/) — Données maladies prioritaires
- [HCP](https://www.hcp.ma) — Enquête Nationale sur la Population et la Santé (ENPS)

---

*© 2025 SEHHA DATA · Ces données ne constituent pas un avis médical.*
