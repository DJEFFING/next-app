
# TaskFlow : Documentation du projet

**TaskFlow** est une application web de gestion des tâches, développée avec **Next.js** dans un cadre éducatif.  
L'objectif de ce projet est d'approfondir les connaissances sur les technologies suivantes :

- Création d'une application **Next.js** associée à une base de données **Neon**.
- Ajout d'une interface graphique avec **React** pour les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer).
- Approfondissement des composants **React** (`useState`, `useEffect`).
- Intégration de **Swagger** pour la documentation de l'API.
- Conteneurisation de l'application avec **Docker** pour un déploiement local et en production.
- Mise en place d'un pipeline **CI/CD** avec **GitHub Actions** pour un déploiement automatique sur **Google Cloud Run**.

---

## ✨ Fonctionnalités principales
- **Gestion des tâches** : Créez, modifiez, et supprimez des tâches facilement.
- **Interface utilisateur réactive** : Conçue avec **React** pour une expérience fluide et rapide.
- **Performance optimisée** : Utilisation de **Next.js** pour un temps de compilation réduit et une meilleure productivité.
- **Qualité du code** : Intégration d'**ESLint** pour maintenir un code propre et cohérent.

---

## 🛠️ Technologies utilisées

### Backend
- TypeScript  
- Neon Database  
- Prisma  
- Node.js (v22.17.0)  
- Next.js (v15.5.0)  

### Frontend
- React.js  
- Tailwind CSS  

### Autres outils
- Docker  
- GitHub Actions  
- Google Cloud Run  

---

## 🚀 Installation et démarrage

Pour installer et démarrer l'application en local, suivez ces étapes :

```bash
# Clonez le dépôt GitHub
git clone https://github.com/DJEFFING/next-app.git

# Déplacez-vous dans le répertoire du projet
cd next-app

# Installez les dépendances
npm install --legacy-peer-deps --unsafe-perm
````

### ⚙️ Configuration de l'environnement

* Créez le fichier **.env**
* Ajoutez votre lien de base de données dans ce fichier.

```bash
# Générez le client Prisma
npx prisma generate
```

### ▶️ Lancement de l'application

```bash
# Lancez l'application en mode développement
npm run dev
```

---

## 📡 Utilisation de l'API

Une fois le projet démarré, vous pouvez consulter la documentation **Swagger** :

* Local : [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
* Production : [https://custom-nextapp-service-828991456458.us-central1.run.app/api-docs](https://custom-nextapp-service-828991456458.us-central1.run.app/api-docs)

Vous y trouverez des exemples de requêtes et de réponses pour chaque endpoint.

---

## 🎯 Résultat final

Le résultat final de l'application est accessible aux adresses suivantes :

* Local : [http://localhost:3000/tasks](http://localhost:3000/tasks)
* Production : [https://custom-nextapp-service-828991456458.us-central1.run.app/tasks](https://custom-nextapp-service-828991456458.us-central1.run.app/tasks)
