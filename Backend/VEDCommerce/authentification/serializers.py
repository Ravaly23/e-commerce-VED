from rest_framework import serializers
from django.contrib.auth.models import User
from VedBackend.models import Client
from fonction_utiles.Identifiant import creationIdentifiantClient


class InscriptionClientSerializer(serializers.Serializer):
    """Serializer pour l'inscription d'un client"""

    # Champs pour le User Django
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=8)
    email = serializers.EmailField(required=False, allow_blank=True)

    # Champs pour le Client (hérités de Personne)
    # L'ID est généré automatiquement, pas besoin de le demander
    nom_prenom = serializers.CharField(max_length=100)
    numero_telephone = serializers.CharField(max_length=20, required=False)
    adresse = serializers.CharField(required=False)
    date_naissance = serializers.DateField()
    genre = serializers.ChoiceField(choices=[('homme', 'Homme'), ('femme', 'Femme')])

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

        return client


class ConnexionClientSerializer(serializers.Serializer):
    """Serializer pour la connexion d'un client"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
