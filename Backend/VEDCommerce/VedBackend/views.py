from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import AjoutArticle


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