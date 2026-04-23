from rest_framework import serializers
from VedBackend.models import Article, Vendeur
from fonction_utiles.Identifiant import creationIdentifiantArticle


class AjoutArticle(serializers.Serializer):
    nom = serializers.CharField(max_length=200)
    description = serializers.CharField(required=False)
    prix = serializers.DecimalField(max_digits=10, decimal_places=2)
    note = serializers.FloatField(required=False)
    id_vendeur = serializers.CharField(max_length=100)

    def validate_id_vendeur(self, value):
        """Vérifie que le vendeur existe"""
        if not Vendeur.objects.filter(id=value).exists():
            raise serializers.ValidationError("Ce vendeur n'existe pas.")
        return value

    def create(self, validated_data):
        """Crée un Article lié à un Vendeur"""

        # 1. Récupérer le vendeur
        vendeur = Vendeur.objects.get(id=validated_data.pop('id_vendeur'))

        # 2. Générer l'identifiant automatiquement
        id_article = creationIdentifiantArticle(validated_data.get('nom', 'Inconnu'))

        # 3. Créer l'article
        article = Article.objects.create(
            id_article=id_article,
            id_vendeur=vendeur,
            **validated_data
        )

        return article