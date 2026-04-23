from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('inscription/', views.inscription_client, name='inscription_client'),
    path('connexion/', views.connexion_client, name='connexion_client'),
    path('inscription_vendeur/', views.inscription_vendeur, name='inscription_vendeur'),
    path('connexion_vendeur/', views.connexion_vendeur, name='connexion_vendeur'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
