from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Authentification(models.Model):
    id_personne = models.ForeignKey('Personne', on_delete=models.CASCADE)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

    class Meta:
        unique_together = ('id_personne', 'email')
    


class Personne(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id = models.CharField(max_length=100, primary_key=True)
    nom_prenom = models.CharField(max_length=100)
    numero_telephone = models.CharField(max_length=20, blank=True, null=True)
    adresse = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to='photos_personnes/', blank=True, null=True)
    # num_cin = models.CharField(max_length=20, blank=True, null=True)
    # date_naissance = models.DateField()
    genre = models.CharField(max_length=10, choices=[('M', 'Masculin'), ('F', 'Feminin')])

    # class Meta:
    #     abstract = True # Commenté car Authentification y fait référence (Django n'autorise pas de ForeignKey vers une classe abstraite)

    def __str__(self):
        return self.nom_prenom


class Client(Personne):
    pass


class Vendeur(Personne):
    etat = models.CharField(max_length=50, choices=[('En attente', 'En attente'), ('Actif', 'Actif'), ('Bloqué', 'Bloqué')], default='En attente')

    class Meta:
        verbose_name_plural = "Vendeurs"


class Article(models.Model):
    id_article = models.CharField(max_length=100, primary_key=True)
    id_vendeur = models.ForeignKey(
        Vendeur,
        on_delete=models.CASCADE,
        related_name='articles'
    )
    nom = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.FloatField()
    date_ajout = models.DateTimeField(auto_now_add=True) #le kara tam php durée
    taille = models.CharField(max_length=50)
    marque = models.CharField(max_length=50)
    
    
    def __str__(self):
        return self.nom


class Commande(models.Model):
    id_commande = models.CharField(max_length=100, primary_key=True)
    id_client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='commandes'
    )
    id_article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name='commandes'
    )
    date_commande = models.DateTimeField(auto_now_add=True)
    quantite = models.PositiveIntegerField(default=1)
    prix_total_article = models.DecimalField(max_digits=10, decimal_places=2)
    id_facture = models.ForeignKey(
        'Facture',
        on_delete=models.CASCADE,
        related_name='commandes'
    )


class Facture(models.Model): #à revoir²
    id_facture = models.CharField(max_length=100, primary_key=True)
    date_paiement = models.DateField()
    prix_total_commande = models.DecimalField(max_digits=10, decimal_places=2)

    

class Commentaire(models.Model):
    id_commentaire = models.CharField(max_length=100, primary_key=True)
    id_article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name='commentaires'
    )
    id_client = models.ForeignKey(
        Client,
        on_delete=models.CASCADE,
        related_name='commentaires'
    )
    description = models.TextField(blank=True, null=True)
    

class Fichier(models.Model):
    id_fichier = models.CharField(max_length=100, primary_key=True)
    id_article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name='fichiers'
    )
    url = models.CharField(max_length=200)
    type = models.CharField(max_length=50, choices=[('image', 'Image'), ('video', 'Video')]) 
    taille = models.DecimalField(max_digits=10, decimal_places=2)
