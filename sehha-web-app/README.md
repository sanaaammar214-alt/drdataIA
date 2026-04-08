# SEHHA DATA - Plateforme Analytique de Santé Publique

SEHHA DATA est un prototype de tableau de bord SaaS (Software-as-a-Service) et Système de Surveillance Épidémiologique. Ce projet utilise l'Intelligence Artificielle pour structurer, croiser et analyser les données publiques marocaines (Ministère de la Santé, OMS, GCP) afin de faciliter la prise de décision.

## 🚀 Fonctionnalités Principales

1. **Cockpit Analytique** : Une vue dynamique interactive des KPI, avec des alertes sur le dépassement des seuils critiques recommandés par l'OMS. 
2. **Cartographie Régionale** : Analyse des disparités géographiques marocaines pour identifier les zones à risque prioritaire.
3. **Dr. Sehha (Botpress IA)** : Un assistant virtuel intelligent (RAG/LLM) intégré pour répondre en langage naturel à toute question sur les données médicales.
4. **Moteur de Rapports** : Système de génération de rapports automatisés basés sur la méthode Chain-of-Thought.

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router), React 18
- **Langage** : TypeScript
- **Style** : Tailwind CSS (Design System "Dark Navy" / Glassmorphism)
- **Data Visualisation** : Recharts
- **IA & Chatbot** : Botpress Core v2

## ⚙️ Instructions d'Installation & Démarrage

### Prérequis
- [Node.js](https://nodejs.org/fr/) (version 18+ recommandée)
- npm (ou yarn)

### Lancement en mode développement

1. **Installer les dépendances** :
   \`\`\`bash
   npm install
   \`\`\`

2. **Lancer le serveur de développement** :
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Accéder à l'application** :
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Compilation pour la production (Optionnel)
Si vous souhaitez tester la version optimisée :
\`\`\`bash
npm run build
npm run start
\`\`\`

---

*Ce projet a été développé dans un cadre académique pour démontrer l'impact de la data structurée et de l'IA sur l'optimisation des politiques de santé publique.*
