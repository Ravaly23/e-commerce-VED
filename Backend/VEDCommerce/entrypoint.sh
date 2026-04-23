#!/bin/bash

# entrypoint.sh - Script d'entrÃ©e pour le conteneur Django
# Attend que MySQL soit prÃªt, puis exÃ©cute les migrations avant de lancer le serveur

set -e

echo " Attente de la base de donnÃ©es MySQL..."

# Attendre que MySQL soit prÃªt Ã  accepter des connexions
while ! python -c "
import MySQLdb
try:
    MySQLdb.connect(
        host='${DB_HOST}',
        user='${DB_USER}',
        passwd='${DB_PASSWORD}',
        db='${DB_NAME}',
        port=int('${DB_PORT}')
    )
    print(' MySQL est prêt!')
except Exception as e:
    print(f' MySQL pas encore prêt: {e}')
    exit(1)
" 2>/dev/null; do
  echo " MySQL n'est pas encore prêt, nouvelle tentative dans 2 secondes..."
  sleep 2
done

echo " Execution des migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo " Démarrage du serveur Django..."
exec "$@"
