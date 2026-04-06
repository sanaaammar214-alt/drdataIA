# SEHHA DATA صحة داتا 🇲🇦🤖

**L'intelligence artificielle au service de la santé publique marocaine.**

SEHHA DATA est une plateforme SaaS logicielle complète qui transforme les données épidémiologiques brutes (bulletins du Ministère de la Santé marocain, alertes de l'OMS, données HCP/ENPS) en informations accessibles. Créée pour les décideurs, les journalistes de santé et les citoyens, elle intègre un tableau de bord analytique avancé de niveau professionnel, un assistant IA ("Dr. Sehha") et un système automatisé de génération de rapports.

---

## 🚀 Fonctionnalités Principales

- **Landing Page SaaS Marketing** : Vitrine moderne premium présentant la solution globale, le fonctionnement du pipeline de données et l'assistant "Dr. Sehha", avec la charte graphique officielle (Bleu Marine & Cyan).
- **Dashboard Épidémiologique Interactif** : Un composant d'analyse massif similaire à un rapport "Power BI", propulsé par Recharts, et divisé en 4 vues expertes :
  1. *Vue Nationale* : Évolution 5 ans (2019-2023) des 5 maladies prioritaires (Diabète, Hypertension, Tuberculose, Cancer, Cardiovasculaires).
  2. *Disparités Régionales* : Étude croisée de l'incidence sur les 12 régions administratives marocaines.
  3. *Alertes OMS* : Détection automatique des dépassements de criticité (OK / DEPASSE / CRITIQUE) et recommandations.
  4. *Pipeline Data* : Transparence sur le flux d'informations et documentation des biais éthiques (déclaration, disponibilité, causalité).
- **Assistant IA (Botpress)** : Une interface conversationnelle débloquée en accès total pour interroger les données épidémiologiques marocaines en langage simple.
- **Rapports Citoyens** : Base d'une interface connectable aux webhooks *n8n* pour générer des synthèses épidémiologiques.

## 🛠️ Stack Technique

- **Framework Front-end** : Next.js 14 (Architecture App Router)
- **Langage Base** : TypeScript / React.js
- **UI & Styling** : Tailwind CSS 
- **Graphiques & Data Viz** : Recharts
- **Icônes** : Lucide React
- **Écosystème Backend / IA** : Botpress (Agent Assistant), n8n (ETL automations)

## 📦 Installation & Déploiement Local

Pour faire tourner ce projet sur votre machine :

1. Ouvrez un terminal dans le dossier racine :
```bash
cd sehha-web-app
```

2. Installez toutes les dépendances Node.js :
```bash
npm install
```

3. Lancez le serveur de développement ultra-rapide de Next :
```bash
npm run dev
```

4. Ouvrez votre navigateur internet sur : [http://localhost:3000](http://localhost:3000)

## 📂 Structure Pédagogique du Code

- `src/app/page.tsx` : La logique et le design complexe de la page d'accueil.
- `src/app/dashboard/page.tsx` : Cœur de la data-visualisation (Les 4 onglets, l'état conditionnel et les graphiques React).
- `src/app/assistant/page.tsx` : Point d'ancrage de la bulle / du bot conversationnel Botpress.
- `src/app/rapport/page.tsx` : Module de connexion API au backend d'automatisation.
- `src/components/` : Éléments modulaires (La barre de navigation, le pied de page légal).
- `public/` : Logement des images statiques hébergées localement (la mascotte `mascotte.png`).

## ⚖️ Mentions Légales & Éthique Obligatoires

Les calculs de criticité affichés dans l'application proviennent des cas d'usage exigés par le périmètre académique. **Ces données ont une vocation de démonstration technologique et ne constituent en aucun cas un avis médical ou un diagnostic absolu**. 

S'il s'agit d'une préoccupation de santé réelle, merci de prendre contact via les canaux officiels :
- **Ministère de la Santé et de la Protection Sociale du Maroc** : www.sante.gov.ma
- **Allô Yakada / Numéro vert** : 080 100 47 47

---
*Projet réalisé dans le cadre du catalogue de projets IA de l'Université Hassan 2 · FST Mohammedia (Sanaa).*
