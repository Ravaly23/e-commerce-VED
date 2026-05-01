from rest_framework import serializers
from django.contrib.auth.models import User
from VedBackend.models import Client, Vendeur, Authentification
from fonction_utiles.Identifiant import creationIdentifiantClient, creationIdentifiantVendeur
import jwt
from django.conf import settings


class InscriptionClientSerializer(serializers.Serializer):
    """Serializer pour l'inscription d'un client"""

    # Champs pour le User Django
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=True) # Rendu obligatoire car utilisé pour la connexion

    # Champs pour le Client (hérités de Personne)
    # L'ID est généré automatiquement, pas besoin de le demander
    nom_prenom = serializers.CharField(max_length=100)
    numero_telephone = serializers.CharField(max_length=20, required=False)
    adresse = serializers.CharField(required=False)
    # date_naissance est commenté dans models.py, il faut donc le retirer ici ou le décommenter dans models.py
    # date_naissance = serializers.DateField() 
    genre = serializers.ChoiceField(choices=[('M', 'Masculin'), ('F', 'Feminin')])

    def validate_username(self, value):
        """Vérifie que le username n'existe pas déjà"""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ce nom d'utilisateur existe déjà.")
        return value

    def create(self, validated_data):
        """Crée un User Django + un Client lié"""

        # 1. Extraire les données du User
        user_data = {
            'username': validated_data.pop('username'),
            'password': validated_data.pop('password'),
            'email': validated_data.pop('email', ''),
        }

        # 2. Créer le User (avec mot de passe hashé)
        user = User.objects.create_user(**user_data)

        # 3. Générer l'identifiant automatiquement
        identifiant = creationIdentifiantClient(validated_data.get('nom_prenom', 'Inconnu'))

        # 4. Créer le Client lié au User
        client = Client.objects.create(
            user=user,
            id=identifiant,
            **validated_data
        )

        # 5. Créer l'entité Authentification liée au client
        Authentification.objects.create(
            id_personne=client,
            email=user.email,
            password=user_data['password'] # Mot de passe non hashé comme dans ConnexionClientSerializer
        )

        return client


class ConnexionClientSerializer(serializers.Serializer):
    """Serializer pour la connexion d'un client"""
    email = serializers.EmailField(max_length=100)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """Vérifie que le client existe"""
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError("Veuillez fournir un email et un mot de passe.")

        client = Authentification.objects.filter(email=email, password=password).first()
        if not client:
            raise serializers.ValidationError("Email ou mot de passe incorrect.")

        return attrs

    def create(self, validated_data):
        """Crée un token JWT pour le client"""
        email = validated_data['email']
        password = validated_data['password']

        client = Authentification.objects.get(email=email, password=password)

        token = jwt.encode(
            {'user_id': client.id_personne_id}, # Utiliser l'ID du Client, pas l'ID auto-incrémenté d'Authentification
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return {
            'token': token
        }



class InscrptionVendeur(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=True) # Rendu obligatoire car utilisé pour la connexion

    # Champs pour le Vendeur (hérités de Personne)
    # L'ID est généré automatiquement, pas besoin de le demander
    nom_prenom = serializers.CharField(max_length=100)
    numero_telephone = serializers.CharField(max_length=20, required=False)
    adresse = serializers.CharField(required=False)
    # date_naissance = serializers.DateField()
    genre = serializers.ChoiceField(choices=[('M', 'Masculin'), ('F', 'Feminin')])

    def validate_username(self, value):
        """Vérifie que le username n'existe pas déjà"""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ce nom d'utilisateur existe déjà.")
        return value
    
    def create(self, validated_data):
        """Crée un User Django + un Vendeur lié"""

        # 1. Extraire les données du User
        user_data = {
            'username': validated_data.pop('username'),
            'password': validated_data.pop('password'),
            'email': validated_data.pop('email', ''),
        }

        # 2. Créer le User (avec mot de passe hashé)
        user = User.objects.create_user(**user_data)

        # 3. Générer l'identifiant automatiquement
        identifiant = creationIdentifiantVendeur(validated_data.get('nom_prenom', 'Inconnu'))

        # 4. Créer le Vendeur lié au User
        vendeur = Vendeur.objects.create(
            user=user,
            id=identifiant,
            **validated_data
        )

        # 5. Créer l'entité Authentification liée au vendeur
        Authentification.objects.create(
            id_personne=vendeur,
            email=user.email,
            password=user_data['password']
        )

        return vendeur


class ConnexionVendeur(serializers.Serializer):
    """Serializer pour la connexion d'un vendeur"""
    email = serializers.EmailField(max_length=100)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """Vérifie que le vendeur existe"""
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError("Veuillez fournir un email et un mot de passe.")

        vendeur = Authentification.objects.filter(email=email, password=password).first()
        if not vendeur:
            raise serializers.ValidationError("Email ou mot de passe incorrect.")

        return attrs

    def create(self, validated_data):
        """Crée un token JWT pour le vendeur"""
        email = validated_data['email']
        password = validated_data['password']

        vendeur = Authentification.objects.get(email=email, password=password)

        token = jwt.encode(
            {'user_id': vendeur.id_personne_id}, # Utiliser l'ID du Vendeur
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return {
            'token': token
        }
