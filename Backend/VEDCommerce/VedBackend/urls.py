from django.urls import path

from . import views

urlpatterns = [
    path('ajout_article/',views.ajout_article, name='ajout_article'),
    path('get_articles/',views.get_articles, name='get_articles'),
    path('delete_article/<str:pk>/',views.delete_article, name='delete_article'),
    path('update_article/<str:pk>/',views.update_article, name='update_article'),
    path('search_article/',views.search_article, name='search_article'),
    
    # Commentaires
    path('ajout_commentaire/',views.ajout_commentaire, name='ajout_commentaire'),
    path('get_commentaires/',views.get_commentaires, name='get_commentaires'),
    path('delete_commentaire/<str:pk>/',views.delete_commentaire, name='delete_commentaire'),
    path('update_commentaire/<str:pk>/',views.update_commentaire, name='update_commentaire'),
    
    # Commande et Facture
    path('ajout_commande/',views.ajout_commande, name='ajout_commande'),
    path('ajout_facture/',views.ajout_facture, name='ajout_facture'),
    
    # Gestion vendeurs
    path('confirmer_vendeur/<str:pk>/',views.confirmer_vendeur, name='confirmer_vendeur'),
    path('refuser_vendeur/<str:pk>/',views.refuser_vendeur, name='refuser_vendeur'),
]
