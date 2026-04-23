from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import InscriptionClientSerializer, ConnexionClientSerializer, InscrptionVendeur,ConnexionVendeur


@api_view(['POST'])
@permission_classes([AllowAny])  # Pas besoin d'être connecté pour s'inscrire
def inscription_client(request):
    """
    Inscription d'un nouveau client.
    Crée un User Django + un Client lié.
    Retourne les tokens JWT pour connexion automatique après inscription.
    """
    serializer = InscriptionClientSerializer(data=request.data)

    if serializer.is_valid():
        client = serializer.save()

        # Générer les tokens JWT pour le nouveau client
        refresh = RefreshToken.for_user(client.user)

        return Response({
            'message': 'Inscription réussie',
            'client': {
                'id': client.id,
                'nom_prenom': client.nom_prenom,
                'username': client.user.username,
            },
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_201_CREATED)

    return Response({
        'message': 'Erreur lors de l\'inscription',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])  # Pas besoin d'être connecté pour se connecter
def connexion_client(request):
    """
    Connexion d'un client existant.
    Vérifie les credentials et retourne les tokens JWT.
    """
    serializer = ConnexionClientSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        # Vérifier les credentials
        user = authenticate(username=username, password=password)

        if user is not None:
            # Vérifier que c'est bien un Client (pas un Vendeur)
            if hasattr(user, 'client'):
                refresh = RefreshToken.for_user(user)

                return Response({
                    'message': 'Connexion réussie',
                    'client': {
                        'id': user.client.id,
                        'nom_prenom': user.client.nom_prenom,
                        'username': user.username,
                    },
                    'tokens': {
                        'access': str(refresh.access_token),
                        'refresh': str(refresh),
                    }
                })
            else:
                return Response({
                    'message': 'Ce compte n\'est pas un compte client.'
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                'message': 'Nom d\'utilisateur ou mot de passe incorrect.'
            }, status=status.HTTP_401_UNAUTHORIZED)

    return Response({
        'message': 'Données invalides',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def inscription_vendeur(request):
    """
    Inscription d'un nouveau vendeur.
    Crée un User Django + un Vendeur lié (etat='En attente' par défaut).
    """
    serializer = InscrptionVendeur(data=request.data)

    if serializer.is_valid():
        vendeur = serializer.save()

        return Response({
            'message': 'Inscription du vendeur réussie',
            'vendeur': {
                'id': vendeur.id,
                'nom_prenom': vendeur.nom_prenom,
                'username': vendeur.user.username,
                'etat': vendeur.etat,  # Doit être 'En attente' au début
            }
        }, status=status.HTTP_201_CREATED)

    return Response({
        'message': 'Erreur lors de l\'inscription du vendeur',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def connexion_vendeur(request):
    """
    Connexion d'un vendeur existant.
    Vérifie les credentials et retourne les tokens JWT.
    Vérifie aussi que l'état du vendeur n'est pas 'Bloqué'.
    """
    serializer = ConnexionVendeur(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        # Vérifier les credentials
        user = authenticate(username=username, password=password)

        if user is not None:
            # Vérifier que c'est bien un Vendeur
            if hasattr(user, 'vendeur'):
                vendeur = user.vendeur

                # Vérifier que le vendeur n'est pas bloqué
                if vendeur.etat == 'Bloqué':
                    return Response({
                        'message': 'Votre compte vendeur a été bloqué.'
                    }, status=status.HTTP_403_FORBIDDEN)

                # Vérifier que le vendeur est actif ou en attente
                if vendeur.etat in ['Actif', 'En attente']:
                    refresh = RefreshToken.for_user(user)

                    return Response({
                        'message': 'Connexion réussie',
                        'vendeur': {
                            'id': vendeur.id,
                            'nom_prenom': vendeur.nom_prenom,
                            'username': user.username,
                            'etat': vendeur.etat,
                        },
                        'tokens': {
                            'access': str(refresh.access_token),
                            'refresh': str(refresh),
                        }
                    })
                else:
                    return Response({
                        'message': 'Statut de compte vendeur invalide.'
                    }, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({
                    'message': 'Ce compte n\'est pas un compte vendeur.'
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                'message': 'Nom d\'utilisateur ou mot de passe incorrect.'
            }, status=status.HTTP_401_UNAUTHORIZED)

    return Response({
        'message': 'Données invalides',
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)
