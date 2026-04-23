# VEDCommerce Backend


## 📋 Pré-requis

Avant de lancer le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

1. **Docker** : [Télécharger Docker Desktop](https://www.docker.com/products/docker-desktop)
2. **Docker Compose** : (Généralement inclus avec Docker Desktop)
3. **Ports disponibles** : 
   - Le port **`8000`** doit être libre (utilisé par le serveur Django).
   - Le port **`3307`** doit être libre (utilisé par la base de données MySQL conteneurisée). *Note: Le port standard 3306 n'est pas utilisé pour éviter les conflits avec vos bases de données locales.*

## 🚀 Lancer le Backend (et la Base de Données)

L'avantage de cette configuration est que la base de données MySQL et le serveur Django se lancent ensemble avec une seule commande, et la base est déjà pré-remplie avec des données.

1. Ouvrez un terminal.
2. Placez-vous à la **racine globale du projet** (le dossier qui contient le fichier `docker-compose.yml`, c'est-à-dire le dossier parent de `Backend`).
3. Exécutez la commande suivante :

```bash
docker-compose up --build
```

*(L'option `--build` est recommandée au premier lancement ou lorsque le fichier `requirements.txt` est modifié pour forcer la reconstruction de l'image Python).*

### Que se passe-t-il lors de cette commande ?
- Docker va télécharger l'image My SQL et l'image Python.
- Il va créer un conteneur pour la base de données (`db`). Lors du tout premier lancement, MySQL va lire le fichier `init.sql` situé à la racine et importer toutes les données automatiquement !
- Il va installer toutes les dépendances Django (`requirements.txt`) et lancer le serveur sur le port `8000` (`web`).

### Accéder à l'API
Une fois que le terminal affiche que le serveur est lancé, l'API est accessible à l'adresse :
👉 **http://localhost:8000**

Pour arrêter les serveurs, faites `Ctrl+C` dans le terminal, ou lancez la commande `docker-compose down`.

---

## 💾 Accéder à la Base de Données (Optionnel)

Si vous avez besoin d'inspecter la base de données (par exemple avec MySQL Workbench, DBeaver ou phpMyAdmin), utilisez les informations de connexion suivantes :

- **Hôte (Host)** : `localhost`
- **Port** : `3307`
- **Utilisateur (User)** : `Eizrah` (ou `root`)
- **Mot de passe (Password)** : `Eizrah17mars2003!` (ou `rootpassword` pour root)
- **Base de données (Database)** : `vedcommerce`

---

## 🛠️ Pour ceux qui veulent continuer de lancer sans Docker (Local pur)

Si vous préférez lancer le backend manuellement via votre environnement virtuel Python local et votre propre base MySQL locale, c'est toujours possible. Le fichier `settings.py` a été conçu pour utiliser automatiquement votre configuration locale (port 3306, localhost) si Docker n'est pas utilisé. 

Il suffit d'activer votre environnement virtuel et de lancer :
```bash
python manage.py runserver
```


pour acceder au superAdmin 
lien : http://localhost:8000/admin/
username : VEDAdmin
password : VEDcommercepsw2003!
