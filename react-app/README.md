# AppEvent

Une application web de gestion d’événements : listing, détail, inscription et newsletter.

---

## 📝 Description

AppEvent se compose de deux parties :
1. **Front React/Vite** (`/react-app`)  
   - Affiche la liste des événements provenant d’une API PHP/MySQL.
   - Permet de filtrer par date, nom et localisation.
   - Propose un formulaire d’inscription à chaque événement.
   - Intègre un composant newsletter.
2. **API PHP/MySQL** (`/api`)  
   - Points d’entrée :  
     - `GET /events` → liste JSON des événements  
     - `GET /events/detail?id=<ID>` → détail JSON d’un événement  
     - `POST /events/register` → enregistrement d’une inscription  
     - `POST /newsletter/subscribe` → enregistrement d’un abonné à la newsletter  
   - Utilise PDO pour se connecter à MySQL (local ou InfinityFree).

---

## 🚀 Installation et exécution en local

### Prérequis

- PHP ≥ 7.4 (avec extension PDO/MySQL)
- MySQL (ou MariaDB)
- Node.js ≥ 14  (et npm ou pnpm)
- Vite (installé via `npm install`)

### Base de données

1. Crée une base locale :
   ```sql
   CREATE DATABASE multi_event CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   ```
2. Exécute le script SQL (dans api/schema.sql) pour créer les tables 

3. Vérifie via ```phpMyAdmin``` ou ``` mysql -u root -p multi_event   ``` que les tables existent.

### Lance l’API en local :
```
cd api
php -S localhost:8000 -t .
```

### Dans un navigateur ou Postman, teste :

``` http://localhost:8000/events.php ```

### Configuration du front (React/Vite)
Ouvre un terminal à la racine react-app :
```
cd react-app
npm install
``` 

### Lance le front :
```
npm run dev
```

### Dans un navigateur ou Postman, teste :
```
http://localhost:5173 
```
## Liens utiles
Lien de l'application : ```https://app-event.netlify.app/```

Documentation Vite + React : ```https://vitejs.dev```

PDO/MySQL PHP : ```https://www.php.net/manual/fr/book.pdo.php```
