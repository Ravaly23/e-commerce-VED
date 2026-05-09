# VEDCommerce Backend


## 📋 Pré-requis

Avant de lancer le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

1. **Python 3.12+** : [Télécharger Python](https://www.python.org/downloads/)
2. **MySQL 8.0+** : [Télécharger MySQL](https://dev.mysql.com/downloads/)
3. **Port disponible** :
   - Le port **`8000`** doit être libre (utilisé par le serveur Django).
   - Le port **`3306`** doit être libre (utilisé par MySQL).

## 🗄️ Configuration de la Base de Données

1. Assurez-vous que MySQL est installé et en cours d'exécution.
2. Créez la base de données et l'utilisateur (si ce n'est pas déjà fait) :

```sql
CREATE DATABASE IF NOT EXISTS vedcommerce;
CREATE USER IF NOT EXISTS 'Eizrah'@'localhost' IDENTIFIED BY 'Eizrah17mars2003!';
GRANT ALL PRIVILEGES ON vedcommerce.* TO 'Eizrah'@'localhost';
FLUSH PRIVILEGES;
```

3. **(Optionnel)** Pour charger les données initiales, importez le fichier `init.sql` situé à la racine du projet :

```bash
mysql -u Eizrah -p vedcommerce < ../../init.sql
```

4. Les informations de connexion se trouvent dans le fichier `.env` :
   - **Hôte** : `localhost`
   - **Port** : `3306`
   - **Utilisateur** : `Eizrah`
   - **Mot de passe** : `Eizrah17mars2003!`
   - **Base de données** : `vedcommerce`

## 🚀 Lancer le Backend

> **Note :** Un environnement virtuel Python est déjà configuré dans le dossier `Backend/environnment/backendVed/` avec toutes les dépendances nécessaires.

### Étape 1 — Activer l'environnement virtuel

Ouvrez un terminal à la racine du projet, puis activez l'environnement :

```bash
# Windows (PowerShell)
.\Backend\environnment\backendVed\Scripts\Activate.ps1

# Windows (CMD)
Backend\environnment\backendVed\Scripts\activate.bat

# macOS / Linux
source Backend/environnment/backendVed/bin/activate
```

### Étape 2 — Se placer dans le dossier du backend

```bash
cd Backend/VEDCommerce
```

### Étape 3 — Installer / mettre à jour les dépendances (si nécessaire)

Si c'est la première utilisation ou si de nouvelles dépendances ont été ajoutées :

```bash
pip install -r requirements.txt
```

### Étape 4 — Exécuter les migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Étape 5 — Lancer le serveur

```bash
python manage.py runserver
```


### Accéder à l'API
L'API est accessible à l'adresse :
👉 **http://localhost:8000**

---

## 🔑 Super Admin

Pour accéder au panneau d'administration :
- **Lien** : http://localhost:8000/admin/
- **Username** : `VEDAdmin`
- **Password** : `VEDcommercepsw2003!`
