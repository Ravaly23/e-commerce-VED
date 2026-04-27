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

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

from VedBackend.models import Client, Commentaire
from fonction_utiles.Identifiant import creationIdentifiantCommentaire

class AjoutCommentaire(serializers.Serializer):
    id_client = serializers.CharField(max_length=100)
    id_article = serializers.CharField(max_length=100)
    description = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        # Vérifie que le client existe
        if not Client.objects.filter(id=data.get('id_client')).exists():
            raise serializers.ValidationError({"id_client": "Ce client n'existe pas."})
        # Vérifie que l'article existe
        if not Article.objects.filter(id_article=data.get('id_article')).exists():
            raise serializers.ValidationError({"id_article": "Cet article n'existe pas."})
        return data

    def create(self, validated_data):
        client = Client.objects.get(id=validated_data.pop('id_client'))
        article = Article.objects.get(id_article=validated_data.pop('id_article'))
        
        id_commentaire = creationIdentifiantCommentaire()
        
        commentaire = Commentaire.objects.create(
            id_commentaire=id_commentaire,
            id_client=client,
            id_article=article,
            **validated_data
        )
        return commentaire

class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commentaire
        fields = '__all__'

class AjoutFacture(serializers.Serializer):
    id_facture = serializers.CharField(read_only=True)
    date_paiement = serializers.DateField()
    prix_total_commande = serializers.DecimalField(max_digits=10, decimal_places=2)

    def create(self, validated_data):
        from fonction_utiles.Identifiant import creationIdentifiantFacture
        from VedBackend.models import Facture
        id_facture = creationIdentifiantFacture()
        facture = Facture.objects.create(
            id_facture=id_facture,
            **validated_data
        )
        return facture

class AjoutCommande(serializers.Serializer):
    id_commande = serializers.CharField(read_only=True)
    date_commande = serializers.DateTimeField(read_only=True)
    id_client = serializers.CharField(max_length=100)
    id_article = serializers.CharField(max_length=100)
    id_facture = serializers.CharField(max_length=100)
    quantite = serializers.IntegerField(default=1)
    prix_total_article = serializers.DecimalField(max_digits=10, decimal_places=2)

    def validate(self, data):
        from VedBackend.models import Client, Article, Facture
        if not Client.objects.filter(id=data.get('id_client')).exists():
            raise serializers.ValidationError({"id_client": "Ce client n'existe pas."})
        if not Article.objects.filter(id_article=data.get('id_article')).exists():
            raise serializers.ValidationError({"id_article": "Cet article n'existe pas."})
        if not Facture.objects.filter(id_facture=data.get('id_facture')).exists():
            raise serializers.ValidationError({"id_facture": "Cette facture n'existe pas."})
        return data

    def create(self, validated_data):
        from fonction_utiles.Identifiant import creationIdentifiantCommande
        from VedBackend.models import Client, Article, Facture, Commande
        
        client = Client.objects.get(id=validated_data.pop('id_client'))
        article = Article.objects.get(id_article=validated_data.pop('id_article'))
        facture = Facture.objects.get(id_facture=validated_data.pop('id_facture'))
        
        id_commande = creationIdentifiantCommande()
        
        commande = Commande.objects.create(
            id_commande=id_commande,
            id_client=client,
            id_article=article,
            id_facture=facture,
            **validated_data
        )
        return commande