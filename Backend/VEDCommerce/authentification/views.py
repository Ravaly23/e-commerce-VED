from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import InscriptionClientSerializer, ConnexionClientSerializer


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
