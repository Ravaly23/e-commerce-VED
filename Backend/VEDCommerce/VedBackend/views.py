from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import (AjoutArticle, ArticleSerializer, AjoutCommentaire, 
                          CommentaireSerializer, AjoutCommande, AjoutFacture)
from .models import Article, Commentaire, Vendeur

#Article 
@api_view(['POST'])
@permission_classes([AllowAny])
def ajout_article(request):
    serializer = AjoutArticle(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Article ajouté avec succès',
            'article': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Erreur lors de l\'ajout de l\'article',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


#pour charger tout les articles de la bd
@api_view(['GET'])
@permission_classes([AllowAny])
def get_articles(request):
    articles = Article.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response({
        'message': 'Articles récupérés avec succès',
        'articles': serializer.data
    }, status=status.HTTP_200_OK)

#supprimer un article
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_article(request, pk):
    article = get_object_or_404(Article, pk=pk)
    article.delete()
    return Response({
        'message': 'Article supprimé avec succès',
    }, status=status.HTTP_200_OK)


    #modifier un article
@api_view(['PUT'])
@permission_classes([AllowAny])
def update_article(request, pk):
    article = get_object_or_404(Article, pk=pk)
    serializer = ArticleSerializer(article, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Article modifié avec succès',
            'article': serializer.data
        }, status=status.HTTP_200_OK)
    return Response({
        'message': 'Erreur lors de la modification de l\'article',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

#recherer un article par son nom 
@api_view(['GET'])
@permission_classes([AllowAny])
def search_article(request):
    nom_query = request.query_params.get('nom', None)
    
    if nom_query:
        # recherche insensible à la casse avec icontains
        articles = Article.objects.filter(nom__icontains=nom_query)
        if not articles.exists():
            return Response({
                'message': 'Aucun article trouvé avec ce nom',
                'articles': []
            }, status=status.HTTP_200_OK)
    else:
        # Si pas de paramètre 'nom', on renvoie une erreur ou tous les articles,
        # ici on renvoie une erreur demandant le paramètre.
        return Response({
            'message': 'Veuillez fournir un paramètre de recherche "nom" (ex: ?nom=t-shirt)',
        }, status=status.HTTP_400_BAD_REQUEST)

    serializer = ArticleSerializer(articles, many=True)
    return Response({
        'message': 'Articles trouvés avec succès',
        'articles': serializer.data
    }, status=status.HTTP_200_OK)


#CRUD pour  les commentaires

@api_view(['POST'])
@permission_classes([AllowAny])
def ajout_commentaire(request):
    serializer = AjoutCommentaire(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Commentaire ajouté avec succès',
            'commentaire': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Erreur lors de l\'ajout du commentaire',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

#affiche tout les commentaires sur l'article
@api_view(['GET'])
@permission_classes([AllowAny])
def get_commentaires(request):
    id_article = request.query_params.get('id_article', None)
    
    if not id_article:
        return Response({
            'message': 'Veuillez fournir un paramètre de recherche "id_article" (ex: ?id_article=Ar12345)',
        }, status=status.HTTP_400_BAD_REQUEST)
        
    commentaires = Commentaire.objects.filter(id_article=id_article)
    serializer = CommentaireSerializer(commentaires, many=True)
    return Response({
        'message': 'Commentaires récupérés avec succès',
        'commentaires': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_commentaire(request, pk):
    commentaire = get_object_or_404(Commentaire, pk=pk)
    commentaire.delete()
    return Response({
        'message': 'Commentaire supprimé avec succès',
    }, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([AllowAny])
def update_commentaire(request, pk):
    commentaire = get_object_or_404(Commentaire, pk=pk)
    serializer = CommentaireSerializer(commentaire, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Commentaire modifié avec succès',
            'commentaire': serializer.data
        }, status=status.HTTP_200_OK)
    return Response({
        'message': 'Erreur lors de la modification du commentaire',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


#commande
@api_view(['POST'])
@permission_classes([AllowAny])
def ajout_commande(request):
    serializer = AjoutCommande(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Commande ajoutée avec succès',
            'commande': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Erreur lors de l\'ajout de la commande',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

#facture
@api_view(['POST'])
@permission_classes([AllowAny])
def ajout_facture(request):
    serializer = AjoutFacture(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Facture ajoutée avec succès',
            'facture': serializer.data
        }, status=status.HTTP_201_CREATED)
    return Response({
        'message': 'Erreur lors de l\'ajout de la facture',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


#confirmer un vendeur
@api_view(['PUT'])
@permission_classes([AllowAny])
def confirmer_vendeur(request, pk):
    vendeur = get_object_or_404(Vendeur, pk=pk)
    vendeur.etat = 'Actif'
    vendeur.save()
    return Response({
        'message': 'Vendeur confirmé avec succès',
    }, status=status.HTTP_200_OK)

#refuser un vendeur
@api_view(['PUT'])
@permission_classes([AllowAny])
def refuser_vendeur(request, pk):
    vendeur = get_object_or_404(Vendeur, pk=pk)
    vendeur.etat = 'Bloqué'
    vendeur.save()
    return Response({
        'message': 'Vendeur refusé avec succès',
    }, status=status.HTTP_200_OK)
    